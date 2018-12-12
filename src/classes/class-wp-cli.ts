import { Disposable } from 'vscode';
import WP from 'wp-cli';
import commandExists from 'command-exists';

import { Config } from './class-config';

export class WP_CLI{
    private _disposable: Disposable;
    private _config: Config;

    private wp;
    private initialized: boolean = false;

    constructor(site){
        this._config = new Config();

        commandExists('wp', (err, exists) => {
            if (err) return;

            if (exists){
                WP.discover({ path: site.getRoot() }, (wp) => {
                    this.wp = wp;

                    this.initialize();
                })
            }
        });
    }

    public initialize(){
        this.wp.core.version((err,version) => {
            if ( err ) return;
        });
    }

    public dispose() {
        this._disposable.dispose();
    }
}