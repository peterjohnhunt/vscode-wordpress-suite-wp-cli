import { Disposable } from 'vscode';

import { WP_CLI } from './class-wp-cli';

export class Controller {
    private _disposable: Disposable;

    constructor(private api, private explorer){
        let subscriptions: Disposable[] = [];
        this.api.onDidChangeSite(this.refreshTreeView, this, subscriptions);

        const sites = api.sites.getSites();
        if (sites.length) {
            for (let site of sites) {
                site.wpcli = new WP_CLI(site);
                site.wpcli.onDidChangeData(this.refreshTreeView, this, subscriptions);
            }
        }
    }

    public refreshTreeView(site){
        this.explorer.refresh();
    }

    public dispose() {
        this._disposable.dispose();
    }
}