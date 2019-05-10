import { List } from "../abstracts/class-list";

export class Roles extends List{
    _expandable = false;

    _items(){
        return new Promise<Array<any>>((resolve, reject) => {
            if (this._list) return resolve(this._list);

            this.wp.role.list((err, roles) => {
                if (err && !roles) return reject();

                this._list = roles;

                return resolve(roles);
            });
        });
    }
}