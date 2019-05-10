import { List } from "../abstracts/class-list";

export class Themes extends List {
    _item(subargs) {
        return new Promise<any>((resolve, reject) => {
            let theme = subargs.shift();

            if (!theme) return reject();

            if (this._details[theme]) return resolve(this._details[theme]);

            this.wp.theme.get(theme, (err, details) => {
                if (err && !details) return reject();

                this._details[theme] = details;

                return resolve(details);
            });
        });
    }

    _items() {
        return new Promise<any>((resolve, reject) => {
            if (this._list) return resolve(this._list);

            this.wp.theme.list((err, themes) => {
                if (err && !themes) return reject();

                this._list = themes;

                return resolve(themes);
            });
        });
    }
}