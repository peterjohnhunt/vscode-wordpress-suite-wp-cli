import { Uri } from 'vscode';

import { Group } from "../abstracts/class-group";

import * as path from 'path';

export class Info extends Group{
    version: string;
    installed: boolean;
    name: string;
    url: string;

    async setup(){
        return this.setVersion()
            .then(() => {
                return this.setInstalled();
            })
            .then(() => {
                return Promise.all([
                    this.setName(),
                    this.setURL()
                ]);
            })
            .then(() => { this.changed() })
            .catch(() => { this.changed() });
    }

    setVersion() {
        return new Promise<string>((resolve, reject) => {
            this.wp.core.version((err, version) => {
                if (err && !version) return reject();

                this.version = version;

                return resolve(version);
            });
        });
    }

    getVersion() {
        return this.version;
    }

    setInstalled() {
        return new Promise<boolean>((resolve, reject) => {
            this.wp.core.is_installed((err) => {
                if (err && err.code === 0) return reject();

                this.installed = true;

                return resolve(true);
            });
        });
    }

    getInstalled() {
        return this.installed;
    }

    getName() {
        return this.name;
    }

    setName() {
        return new Promise((resolve, reject) => {
            this.wp.option.get('blogname', (err, name) => {
                if (err && !name) return reject();

                this.name = name;

                return resolve(name);
            });
        });
    }

    getURL() {
        return this.url;
    }

    setURL() {
        return new Promise((resolve, reject) => {
            this.wp.option.get('siteurl', (err, url) => {
                if (err && !url) return reject();

                this.url = url.replace(/(^\w+:|^)\/\//, '');

                return resolve(url);
            });
        });
    }

    items(){
        let items = [];

        let version = this.getVersion() || 'Not Installed';
        items.push({ uri: this.uri('WordPress: ' + version) });

        let name = this.getName();
        if (name) {
            items.push({ uri: this.uri('Name: ' + name) });
        }

        let url = this.getURL();
        if (url) {
            items.push({ uri: this.uri('URL: ' + url) });
        }

        return items;
    }
}