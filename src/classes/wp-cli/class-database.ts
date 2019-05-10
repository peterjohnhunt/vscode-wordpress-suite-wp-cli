import { Simple } from "../abstracts/class-simple";

export class Database extends Simple {

    _database;

    _items() {
        return new Promise<any>((resolve, reject) => {
            if (this._database) return resolve(this._database);

            this.wp.db.size((err, database) => {
                if (err && !database) return reject();

                this._database = database;

                return resolve(database);
            });
        });
    }
}