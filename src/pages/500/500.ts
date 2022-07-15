import tmpl from './500.hbs';
import Block from '../../modules/Block'
import compile from '../../modules/compile';

export default class ServerErrorPage extends Block {
    constructor() {
        super('div');
    }

    protected render(): DocumentFragment {
        return compile(tmpl,{})
    }
}
