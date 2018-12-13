import { Disposable, EventEmitter, Event } from 'vscode';
import WP from 'wp-cli';
import commandExists from 'command-exists';

import { Config } from './class-config';

export class WP_CLI{
    private _disposable: Disposable;
    private _config: Config;

    private wp;

    private _onDidChangeData: EventEmitter<undefined> = new EventEmitter<undefined>();
    readonly onDidChangeData: Event<undefined> = this._onDidChangeData.event;

    version: string;

    constructor(site){
        this._config = new Config();

        commandExists('wp', (err, exists) => {
            if (err) return;

            if (exists){
                WP.discover({ path: site.getRoot() }, (wp) => {
                    this.wp = wp;

                    this.setVersion();
                })
            }
        });
    }

    private setVersion(){
        this.wp.core.version((err,version) => {
            if ( err ) return;

            this.version = version;
            
            this._onDidChangeData.fire();
        });
    }

    public getVersion(){
        return this.version || 'loading';
    }

    public dispose() {
        this._disposable.dispose();
    }
}