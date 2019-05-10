import { Section } from "./class-section";

export abstract class Simple extends Section {
    _key = 'name';
    _value = 'value';
    
    _items(): Promise<any> { return Promise.reject(); }

    items(){
        return this._items().then((data) => {
            let items = [];
            for (const row of data) {
                let key = row[this._key];
                let value = row[this._value];
                value = value.toString();
                value = value.replace(/(<([^>]+)>)/ig, "");
                if (!value) {
                    value = 'false';
                }
                key = key + ': ' + value;
                items.push({ uri: key });
            }
            return items;
        });
    }
}