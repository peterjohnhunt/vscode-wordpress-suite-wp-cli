import { Section } from "./class-section";

export abstract class List extends Section{

    _key: string = 'name';

    _context: string;

    _expandable: boolean = true;

    _details: any = {};

    _list: any;

    _sub(details, subargs) {
        if (!subargs.length) return details;

        let args = [...subargs];
        let prop = args.shift();
        return this._sub(details[prop], args);
    }

    _item(subargs): Promise<any> { return Promise.reject(); }
    
    _items(): Promise<any> { return Promise.reject(); }

    items(args) {
        if ( !args || args.length <= 1 ) {
            return this._items()
                .then((items) => {
                    return items.map((i) => { return {
                        uri: this.uri(i[this._key], args),
                        expandable: this._expandable,
                        context: this._context
                    } });
                });
        }

        let subargs = args.slice(1);
        return this._item(subargs)
            .then((details) => {
                details = this._sub(details, subargs);
                let items = [];
                for (let key in details) {
                    let uri;
                    let value = details[key];
                    let expandable = typeof value === 'object';

                    if (expandable && value.length === 0) {
                        value = 'empty';
                        expandable = false;
                    }

                    if (!expandable) {
                        value = value.toString();
                        value = value.replace(/(<([^>]+)>)/ig, "");
                        if (!value) {
                            value = 'false';
                        }
                        uri = key + ': ' + value;
                    } else {
                        uri = this.uri(key, args);
                    }

                    items.push({ uri: uri, expandable: expandable });
                }
                return items;
            });
    };

    refresh(args){
        // this._list = false;
        // this._details = false;
        // this.items(args)
        //     .then(() => { this.changed() })
        //     .catch(() => { this.changed() });
    }
}