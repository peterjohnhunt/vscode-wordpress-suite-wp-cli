import { List } from "../abstracts/class-list";

export class Plugins extends List {
    _context = 'plugin';

    _item(subargs) {
        return new Promise<any>((resolve, reject) => {
            let plugin = subargs.shift();

            if (!plugin) return reject();

            if (this._details[plugin]) return resolve(this._details[plugin]);

            this.wp.plugin.get(plugin, (err, details) => {
                if (err && !details) return reject();

                this._details[plugin] = details;

                return resolve(details);
            });
        });
    }

    _items() {
        return new Promise<any>((resolve, reject) => {
            if (this._list) return resolve(this._list);

            this.wp.plugin.list((err, plugins) => {
                if (err && !plugins) return reject();

                this._list = plugins;

                return resolve(plugins);
            });
        });
    }
}