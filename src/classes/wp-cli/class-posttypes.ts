import { List } from "../abstracts/class-list";

export class PostTypes extends List {
    _item(subargs) {
        return new Promise<any>((resolve, reject) => {
            let posttype = subargs.shift();

            if ( !posttype ) return reject();

            if (this._details[posttype]) return resolve(this._details[posttype]);

            this.wp.post_type.get(posttype, (err, details) => {
                if (err && !details) return reject();

                this._details[posttype] = details;

                return resolve(details);
            });
        });
    }

    _items() {
        return new Promise<any>((resolve, reject) => {
            if (this._list) return resolve(this._list);

            this.wp.post_type.list((err, posttypes) => {
                if (err && !posttypes) return reject();

                this._list = posttypes;

                return resolve(posttypes);
            });
        });
    }
}