import { TextDocumentContentProvider, EventEmitter, Uri } from "vscode";

export class WP_CLI_ContentView_Provider implements TextDocumentContentProvider{

    onDidChangeEmitter = new EventEmitter<Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    constructor(api){ }

    provideTextDocumentContent(uri: Uri): string {
        return;
    }
}