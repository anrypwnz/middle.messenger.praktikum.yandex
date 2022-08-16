import Block from '../../modules/Block';
import compile from '../../modules/compile';
import tmpl from './index.hbs';
import {render} from '../../index'
import Button from '../../components/blocks/Button/Button';
import LoginPage from '../login/LoginPage';
import RegistrationPage from '../registration/RegistrationPage';
import ChatPage from '../chatPage/ChatPage';
import ErrorPage from '../404/404';
import ServerErrorPage from '../500/500';
import ProfilePage from '../profile/ProfilePage';
import '../../styles/general.less';
import {router} from '../../utils'

// const router = new Router({
//     mode: 'history',
//     root: '/',
// })

router
    // .add('/', () => {
    //     render('#app', new IndexPage())
    // })
    .add(/sign-in/, () => {
        render('#app', new LoginPage())
    })
    .add(/sign-up/, () => {
        render('#app', new RegistrationPage())
    })
    .add(/settings/, () => {
        render('#app', new ProfilePage())
    })
    .add(/messenger/, () => {
        render('#app', new ChatPage())
    })
    .add(/404/, () => {
        render('#app', new ErrorPage())
    })
    .add(/500/, () => {
        render('#app', new ServerErrorPage)
    })

export class IndexPage extends Block {
    constructor() {
        super('div');
    }

    protected render(): DocumentFragment {
        const loginButton = new Button({
            text: 'Login Page',
            class: 'btn-pages',
            events: {
                click: () => router.navigate('/sign-in/')
            }
        })
        const registrationButton = new Button({
            text: 'Registration Page',
            class: 'btn-pages',
            events: {
                click: () => router.navigate('/sign-up/')
            }
        })
        const chatPageButton = new Button({
            text: 'Chat Page',
            class: 'btn-pages',
            events: {
                click: () => router.navigate('/messenger/')
            }
        })
        const profilePageButton = new Button({
            text: 'Profile Page',
            class: 'btn-pages',
            events: {
                click: () => router.navigate('/settings/')
            }
        })
        const errorPageButton = new Button({
            text: '404 error Page',
            class: 'btn-pages',
            events: {
                click: () => router.navigate('/404/')
            }
        })
        const serverErrorPageButton = new Button({
            text: '500 error Page',
            class: 'btn-pages',
            events: {
                click: () => router.navigate('/500/')
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
