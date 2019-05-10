import { List } from "../abstracts/class-list";

export class Users extends List {
    _key = 'user_email';

    _item(subargs) {
        return new Promise<any>((resolve, reject) => {
            let user = subargs.shift();

            if (!user) return reject();

            if (this._details[user]) return resolve(this._details[user]);

            this.wp.user.get(user, (err, details) => {
                if (err && !details) return reject();

                this._details[user] = details;

                return resolve(details);
            });
        });
    }

    _items() {
        return new Promise<any>((resolve, reject) => {
            if (this._list) return resolve(this._list);

            this.wp.user.list((err, users) => {
                if (err && !users) return reject();

                this._list = users;

                return resolve(users);
            });
        });
    }
}