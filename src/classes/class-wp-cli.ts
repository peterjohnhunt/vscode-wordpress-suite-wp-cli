import { Disposable, EventEmitter, Event } from 'vscode';
import { exec } from 'child_process';
import async from 'async';

import WP from 'wp-cli';
import commandExists from 'command-exists';

import * as path from 'path';
import * as fs from 'fs';

import { Config } from './class-config';

export class WP_CLI{
    private _disposable: Disposable;
    private config: Config;
    private options: any;

    private wp;

    private _onDidChangeData: EventEmitter<undefined> = new EventEmitter<undefined>();
    readonly onDidChangeData: Event<undefined> = this._onDidChangeData.event;

    version: string;
    installed: boolean;
    name: string;
    url: string;
    posttypes: Array<any>;
    taxonomies: Array<any>;
    roles: Array<any>;

    constructor(site){
        this.config = new Config();
        this.options = { path: site.getRoot() };

        this.initialize(this.options);
    }

    private initialize(options) {
        commandExists('wp', (err, exists) => {
            if (err) return;

            if (exists) {
                WP.discover(options, (wp) => {
                    this.wp = wp;

                    this.setVersion();
                })
            }
        });
    }

    private setVersion() {
        this.wp.core.version((err, version) => {
            if (err && !version) return;

            this.version = version;

            this._onDidChangeData.fire();

            if (version) {
                this.setInstalled();
            }
        });
    }

    public getVersion() {
        return this.version;
    }

    private setInstalled() {
        this.wp.core.is_installed((err) => {
            if (err) return;

            this.installed = true;

            this._onDidChangeData.fire();

            this.setName();
            this.setURL();
            this.setPostTypes();
            this.setTaxonomies();
            this.setRoles();
        });
    }

    public getInstalled() {
        return this.installed;
    }

    public getName(){
        return this.name;
    }

    private setName() {
        this.wp.option.get('blogname', (err, name) => {
            if (err && !name) return;

            this.name = name;

            this._onDidChangeData.fire();
        });
    }

    public getURL() {
        return this.url;
    }

    private setURL() {
        this.wp.option.get('siteurl', (err, url) => {
            if (err && !url) return;

            this.url = url.replace(/(^\w+:|^)\/\//, '');

            this._onDidChangeData.fire();
        });
    }

    public hasPostTypes(){
        return this.posttypes && this.posttypes.length;
    }

    public getPostTypes(){
        return this.posttypes;
    }

    private setPostTypes(){
        this.wp.post_type.list((err,posttypes) => {
            if (err && !posttypes) return;

            this.posttypes = posttypes;
        });
    }

    public hasTaxonomies() {
        return this.taxonomies && this.taxonomies.length;
    }

    public getTaxonomies() {
        return this.taxonomies;
    }

    private setTaxonomies() {
        this.wp.taxonomy.list((err, taxonomies) => {
            if (err && !taxonomies) return;

            this.taxonomies = taxonomies;
        });
    }

    public hasRoles() {
        return this.roles && this.roles.length;
    }

    public getRoles() {
        return this.roles;
    }

    private setRoles() {
        this.wp.role.list((err, roles) => {
            if (err && !roles) return;

            this.roles = roles;
        });
    }

    public hasInfo(){
        let info = this.getInfo();

        for (let key in info) {
            if (info[key]) return true;
        }
    }

    public getInfo(){
        return {
            version: this.getVersion(),
            name: this.getName(),
            url: this.getURL()
        };
    }

    public dispose() {
        this._disposable.dispose();
    }
}