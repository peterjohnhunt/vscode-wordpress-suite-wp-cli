import { TreeView, ExtensionContext, window } from 'vscode';

import { WP_CLI_TreeView_Provider } from "./treeview/class-provider";
import { WP_CLI_Item } from "./interfaces/interface-item";

export class WP_CLI_TreeView {

    provider: WP_CLI_TreeView_Provider;
    treeView: TreeView<WP_CLI_Item>;

    constructor(api: any) {
        const treeDataProvider = new WP_CLI_TreeView_Provider(api);
        this.provider = treeDataProvider;
        this.treeView = window.createTreeView('wp-cli', { treeDataProvider });
    }

    refresh(){
        this.provider.refresh();
    }
}