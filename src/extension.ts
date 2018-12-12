'use strict';
import { ExtensionContext, extensions } from 'vscode';
import { WP_CLI } from './classes/class-wp-cli';

export function activate(context: ExtensionContext) {
    let api = extensions.getExtension('peterjohnhunt.wordpress-suite').exports;

    const sites = api.getSites();
    if (sites.length) {
        for (let site of sites){
            site.wp_cli = new WP_CLI(site);
            context.subscriptions.push(site.watcher);
        }
    }
}

export function deactivate() {
}