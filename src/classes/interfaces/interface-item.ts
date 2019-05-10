import { Uri } from 'vscode';

export interface WP_CLI_Item {
    uri: Uri;
    expandable: Boolean;
    cb: any;
    args: Array<any>;
    context: string;
}