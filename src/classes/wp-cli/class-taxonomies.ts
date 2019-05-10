import { List } from "../abstracts/class-list";

export class Taxonomies extends List {

    _item(subargs) {
        return new Promise<any>((resolve, reject) => {
            let taxonomy = subargs.shift();

            if (!taxonomy) return reject();

            if (this._details[taxonomy]) return resolve(this._details[taxonomy]);

            this.wp.taxonomy.get(taxonomy, (err, details) => {
                if (err && !details) return reject();

                this._details[taxonomy] = details;

                return resolve(details);
            });
        });
    }

    _items() {
        return new Promise<any>((resolve, reject) => {
            if (this._list) return resolve(this._list);

            this.wp.taxonomy.list((err, taxonomies) => {
                if (err && !taxonomies) return reject();

                this._list = taxonomies;

                return resolve(taxonomies);
            });
        });
    }
}