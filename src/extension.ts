'use strict';
import { ExtensionContext, extensions } from 'vscode';
import { WP_CLI_Controller } from './classes/class-controller';
import { WP_CLI_TreeView } from './classes/class-treeview';
import { WP_CLI_ContentView } from './classes/class-contentview';

export function activate(context: ExtensionContext) {
    let api         = extensions.getExtension('peterjohnhunt.wordpress-suite').exports;
    let treeview    = new WP_CLI_TreeView(api);
    let contentview = new WP_CLI_ContentView(api, context);
    let controller  = new WP_CLI_Controller(api, treeview);

    context.subscriptions.push(controller);
}

export function deactivate() {
}