import Block from '../../modules/Block';
import compile from '../../modules/compile';
import tmpl from './index.hbs';
import {render} from '../../index'
import Button from '../../components/blocks/Button/Button';
import LoginPage from '../login/LoginPage';
import RegistrationPage from '../registration/RegistrationPage';
import ChatPage from '../chatPage/ChatPage';
import ErrorPage from '../404/404';
import serverErrorPage from '../500/500';
import ProfilePage from '../profile/ProfilePage';
import '../../styles/general.less';

export class IndexPage extends Block {
    constructor() {
        super('div');
    }

    protected render(): DocumentFragment {
        const loginButton = new Button({
            text: 'Login Page',
            class: 'btn-pages',
            events: {
                click: () => render('#app', new LoginPage())
            }
        })
        const registrationButton = new Button({
            text: 'Registration Page',
            class: 'btn-pages',
            events: {
                click: () => render('#app', new RegistrationPage())
            }
        })
        const chatPageButton = new Button({
            text: 'Chat Page',
            class: 'btn-pages',
            events: {
                click: () => render('#app', new ChatPage())
            }
        })
        const profilePageButton = new Button({
            text: 'Profile Page',
            class: 'btn-pages',
            events: {
                click: () => render('#app', new ProfilePage())
            }
        })
        const errorPageButton = new Button({
            text: '404 error Page',
            class: 'btn-pages',
            events: {
                click: () => render('#app', new ErrorPage())
            }
        })
        const serverErrorPageButton = new Button({
            text: '500 error Page',
            class: 'btn-pages',
            events: {
                click: () => render('#app', new serverErrorPage())
            }
        })

        return compile(tmpl, {
            loginButton,
            registrationButton,
            chatPageButton,
            profilePageButton,
            errorPageButton,
            serverErrorPageButton
        })
    }
}
