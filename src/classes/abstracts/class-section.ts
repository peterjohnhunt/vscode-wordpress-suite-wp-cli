import { Base } from './class-base';

export abstract class Section extends Base {
    constructor(wp) {
        super();

        this.wp = wp;
    }
}