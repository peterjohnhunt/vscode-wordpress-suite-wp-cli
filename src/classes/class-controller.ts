import { Disposable, commands } from 'vscode';

import { WP_CLI } from './class-wp-cli';

export class WP_CLI_Controller {
    private treeview;
    private api;
    private _disposable: Disposable;
    private subscriptions: Disposable[] = [];

    constructor(api, treeview){
        this.api = api;
        this.treeview = treeview;
        this.api.onDidChangeSite(this.refreshTreeView, this, this.subscriptions);
        this.api.onDidAddSite(this.addSite, this, this.subscriptions);

        this.subscriptions.push(commands.registerCommand('wpcli.sections.refresh', this.refreshSite, this));
        // this.subscriptions.push(commands.registerCommand('wpcli.plugins.add', this.add, this));
        // this.subscriptions.push(commands.registerCommand('wpcli.plugins.update', this.update, this));
        
        const sites = api.sites.getSites();
        if (sites.length) {
            for (let site of sites) {
                site.wpcli = new WP_CLI(site);
                site.wpcli.onDidChange(this.refreshTreeView, this, this.subscriptions);
            }
        }

        this._disposable = Disposable.from(...this.subscriptions);
    }

    public refreshSite(element){
        const site = this.api.sites.getActive();

        if (!site) return;

        site.wpcli.refresh(element);
    }

    // public add(element){
    //     const site = this.api.sites.getActive();

    //     if (!site) return;

    //     site.wpcli.add(element);
    // }

    // public update(element) {
    //     const site = this.api.sites.getActive();

    //     if (!site) return;

    //     site.wpcli.update(element);
    // }

    public addSite(site){
        site.wpcli = new WP_CLI(site);
        site.wpcli.onDidChange(this.refreshTreeView, this, this.subscriptions);
        this._disposable = Disposable.from(...this.subscriptions);
    }

    public refreshTreeView(site){
        this.treeview.refresh();
    }

    public dispose() {
        this._disposable.dispose();
    }
}