'use strict';
import { ExtensionContext, extensions } from 'vscode';
import { Controller } from './classes/class-controller';
import { Explorer } from './classes/class-explorer';

export function activate(context: ExtensionContext) {
    let api        = extensions.getExtension('peterjohnhunt.wordpress-suite').exports;
    let explorer   = new Explorer(api, context);
    let controller = new Controller(api, explorer);

    context.subscriptions.push(controller);
}

export function deactivate() {
}