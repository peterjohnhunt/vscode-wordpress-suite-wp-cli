import { TreeDataProvider, TreeItemCollapsibleState, TreeItem, EventEmitter, Event, ExtensionContext, commands } from 'vscode';

import { WP_CLI_Item } from "../interfaces/interface-item";

export class WP_CLI_TreeView_Provider implements TreeDataProvider<WP_CLI_Item> {

    private _onDidChangeTreeData: EventEmitter<WP_CLI_Item | undefined> = new EventEmitter<WP_CLI_Item | undefined>();
    readonly onDidChangeTreeData: Event<WP_CLI_Item | undefined> = this._onDidChangeTreeData.event;

    constructor(private api: any) {}

    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    async getChildren(element): Promise<WP_CLI_Item[]> {
        const site = this.api.sites.getActive();

        if (!site) return [];

        return site.wpcli.items(element);
    }

    public getTreeItem(element): TreeItem {
        const treeItem = new TreeItem(element.uri, element.expandable ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None);
        if (element.command) {
            treeItem.command = element.command;
        }
        if (element.context) {
            treeItem.contextValue = element.context
        }
        return treeItem;
    }
}