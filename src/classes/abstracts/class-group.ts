import { Section } from "./class-section";

export abstract class Group extends Section{

    constructor(wp) {
        super(wp);

        this.setup();
    }

    async setup() { }
}