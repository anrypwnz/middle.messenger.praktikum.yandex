import Block from '../../modules/Block'
import compile from '../../modules/compile';
import tmpl from './login.hbs';
import FormLogin from '../../components/blocks/FormLogin/FormLogin'

import './login.less'

export default class LoginPage extends Block {
    constructor() {
        super('div');
    }

    protected render(): DocumentFragment {

        const formLogin = new FormLogin()

        return compile(tmpl, {
            formLogin
        })
    }
}
