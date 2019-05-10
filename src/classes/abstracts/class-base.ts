import { Disposable, EventEmitter, Event, Uri } from 'vscode';

import * as path from 'path';

export abstract class Base {

    protected readonly _disposable: Disposable;

    private _onDidChange = new EventEmitter<void>();
    get onDidChange(): Event<void> {
        return this._onDidChange.event;
    }

    protected wp;

    changed() {
        this._onDidChange.fire();
    }

    refresh(element?) { }

    items(element?) { }

    uri(label, args=[]){
        let pieces = [...args];
        pieces.unshift('wpcli://view');
        pieces.push(label);
        return Uri.parse(path.join(...pieces));
    }

    split(uri){
        return uri.path.split(path.sep).filter(Boolean);
    }

    section(uri){
        return this.path(uri).shift();
    }

    path(uri){
        return this.split(uri).slice(1);
    }

    dispose() {
        this._disposable && this._disposable.dispose();
    }
}