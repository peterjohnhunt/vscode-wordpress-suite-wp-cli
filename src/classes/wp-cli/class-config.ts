import { Simple } from "../abstracts/class-simple";

export class Config extends Simple {
    _config;

    _items() {
        return new Promise<any>((resolve, reject) => {
            if (this._config) return resolve(this._config);

            this.wp.config.list((err, config) => {
                if (err && !config) return reject();

                this._config = config;

                return resolve(config);
            });
        });
    }
}