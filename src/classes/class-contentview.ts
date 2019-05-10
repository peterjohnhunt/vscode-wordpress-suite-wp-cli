import { ExtensionContext, workspace } from "vscode";

import { WP_CLI_ContentView_Provider } from "./contentview/class-provider";

export class WP_CLI_ContentView{

    provider: WP_CLI_ContentView_Provider;

    constructor(api: any, context: ExtensionContext) {
        const contentDataProvider = new WP_CLI_ContentView_Provider(api);
        this.provider = contentDataProvider;
        context.subscriptions.push(workspace.registerTextDocumentContentProvider('wpcli', contentDataProvider));
    }
}