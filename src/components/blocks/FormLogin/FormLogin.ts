import Block from '../../../modules/Block';
import tmpl from './FormLogin.hbs';
import Button from '../Button/Button';
import Input from '../Input/Input';
import RegistrationPage from '../../../pages/registration/RegistrationPage';
import {render} from '../../../index';
import compile from '../../../modules/compile';
import validate from '../../../utils/validation';
import './FormLogin.less'


export default class FormLogin extends Block {
    constructor() {
        super('div', {
            value: '',
            login: '',
            password: '',
        });
    }

    onSubmit(e: Event): void {
        e.preventDefault()
        const formElement = this.element.getElementsByTagName('input')
        const formData: any = {}
        for (const element of formElement) {
            formData[element.name] = element.value
        }
        console.log('Input Value', formData);
    }

    onSignUp(e: Event): void {
        e.preventDefault()
        render('#app', new RegistrationPage())
    }

    onBlur(e: Event): void {
        this.onValidate(e)
    }

    onFocus(e: Event): void {
        this.onValidate(e)
    }

    onValidate(e: Event): void {
        const target = e.target as HTMLInputElement;
        validate(target)
        const errorField = document.getElementById('login-error')
        if (errorField) {
            errorField.textContent = validate(target)
        }
    }

    protected render(): DocumentFragment {

        const buttonSubmit = new Button({
            text: 'Вход',
            class: 'btn-submit',
            type: 'submit',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        })

        const buttonSignUp = new Button({
            text: 'Зарегистрироваться',
            class: 'btn-option',
            type: 'button',
            events: {
                click: (e: Event) => this.onSignUp(e),
            },
        })

        const inputLogin = new Input({
            id: 'login',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Логин',
            name: 'login',
            type: 'text',
            value: this.props.login,
            autocomplete: 'username',
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputPassword = new Input({
            id: 'password',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Пароль',
            name: 'password',
            type: 'password',
            value: this.props.password,
            autocomplete: 'new-password',
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        return compile(tmpl, {
            buttonSubmit,
            buttonSignUp,
            inputLogin,
            inputPassword,
        })
    }
}