import WP from 'wp-cli';
import commandExists from 'command-exists';

import { Base } from './abstracts/class-base';
import { Info } from './wp-cli/class-info';
import { Config } from './wp-cli/class-config';
import { PostTypes } from './wp-cli/class-posttypes';
import { Taxonomies } from './wp-cli/class-taxonomies';
import { Roles } from './wp-cli/class-roles';
import { Users } from './wp-cli/class-users';
import { Plugins } from './wp-cli/class-plugins';
import { Themes } from './wp-cli/class-themes';

export class WP_CLI extends Base{
    private options: any;

    sections: any;

    constructor(site){
        super();

        this.options = { path: site.getRoot() };
        this.sections = false;

        this.setup();
    }

    async setup() {
        this.exists()
            .then(() => {
                return this.discover();
            })
            .then((wp) => {
                this.sections = {
                    'Site': new Info(wp)
                };

                this.sections['Site'].onDidChange(this.modules, this, this._disposable);
            })
            .then(() => { this.changed() })
            .catch(() => { this.changed() });
    }

    exists(){
        return new Promise<string>((resolve, reject) => {
            commandExists('wp', (err, exists) => {
                if (err) return reject();

                if (!exists) return reject();

                return resolve(exists);
            });
        });
    }

    discover(){
        return new Promise<string>((resolve, reject) => {
            WP.discover(this.options, (wp) => {
                this.wp = wp;

                return resolve(wp);
            })
        });
    }

    modules(){
        let sections = {
            'Config': new Config(this.wp),
            'Post Types': new PostTypes(this.wp),
            'Taxonomies': new Taxonomies(this.wp),
            'Roles': new Roles(this.wp),
            'Users': new Users(this.wp),
            'Themes': new Themes(this.wp),
            'Plugins': new Plugins(this.wp)
        };

        for (const section in sections) {
            sections[section].onDidChange(this.changed, this, this._disposable);
        }

        this.sections = { ...this.sections, ...sections };

        this.changed();
    }

    add(element){
        console.log( element );
    }

    update(element){

    }

    items(element){
        if (!this.sections) return [{ uri: this.uri('Loading...') }];
        
        if ( !element ) {
            let items = [];
            for (const section in this.sections) {
                items.push({
                    uri: this.uri(section),
                    expandable: true,
                    context: 'section'
                });
            }
            return items;
        }

        let section = this.section(element.uri);
        let args    = this.path(element.uri);

        return this.sections[section].items(args);
    }

    refresh(element){
        if (!element){
            for (const section in this.sections) {
                this.sections[section].refresh()
            }
            return
        }

        let section = this.section(element.uri);
        let args = this.path(element.uri);

        return this.sections[section].refresh(args);
    }
}