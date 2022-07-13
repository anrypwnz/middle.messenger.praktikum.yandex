import tmpl from './404.hbs';
import Block from '../../modules/Block'
import compile from '../../modules/compile';

export default class ErrorPage extends Block {
    constructor() {
        super('div');
    }

    protected render(): DocumentFragment {
        return compile(tmpl, {})
    }
}
