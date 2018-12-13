import { TreeView, ExtensionContext, TreeDataProvider, TreeItemCollapsibleState, TreeItem, Uri, EventEmitter, Event, window } from 'vscode';
import * as path from 'path';

interface Item {
    uri: Uri,
    expandable: Boolean
}

export class Provider implements TreeDataProvider<Item> {

    private _onDidChangeTreeData: EventEmitter<Item | undefined> = new EventEmitter<Item | undefined>();
    readonly onDidChangeTreeData: Event<Item | undefined> = this._onDidChangeTreeData.event;

    constructor(private api: any) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    async getChildren(element?: Item): Promise<Item[]> {
        if (element) {
            return [];
        }

        const site = this.api.sites.getActive();

        if (site) {
            return [{ uri: Uri.parse(path.join('wp://wpcli', 'Version: ' + site.wpcli.getVersion())), expandable: false }];
        }

        return [];
    }

    getTreeItem(element: Item): TreeItem {
        const treeItem = new TreeItem(element.uri, element.expandable ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None);
        return treeItem;
    }
}

export class Explorer {

    provider: Provider;
    treeView: TreeView<Item>;

    constructor(api: any, context: ExtensionContext) {
        const treeDataProvider = new Provider(api);
        this.provider = treeDataProvider;
        this.treeView = window.createTreeView('wp-cli', { treeDataProvider });
    }


    refresh(){
        this.provider.refresh();
    }
}