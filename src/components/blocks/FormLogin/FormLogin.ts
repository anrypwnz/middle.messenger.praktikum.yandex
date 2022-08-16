import Block from '../../../modules/Block'
import tmpl from './FormLogin.hbs'
import Button from '../Button/Button'
import Input from '../Input/Input'
import RegistrationPage from '../../../pages/registration/RegistrationPage'
import {render} from '../../../index'
import compile from '../../../modules/compile'
import validate from '../../../utils/validation'
import showErrors from '../../../utils/showErrors'
import {router} from '../../../utils'

import auth from '../../../api/AuthApi'
import './FormLogin.less'

type FormLoginProps = {
    formName?: any,
    value?: string,
    login: string,
    password: string,
    errors: string[],
}

export default class FormLogin extends Block<FormLoginProps> {
    constructor() {
        super('div', {
            formName: 'login',
            value: '',
            login: '',
            password: '',
            errors: [],
        });
    }

    onSubmit(e: Event): void {
        e.preventDefault()
        const formElements = document.forms[this.props.formName].elements
        const formData: { [key: string]: string } = {}
        for (const inputElement of formElements) {
            if(inputElement.tagName === 'INPUT') {
                formData[(inputElement as HTMLInputElement).name] = (inputElement as HTMLInputElement).value
                this.props.errors = validate(inputElement as HTMLInputElement)
            }
        }
        showErrors(this.props.errors)

        auth.signIn(formData)
            .then(res => {
                console.log('####### res ', res)
            })
            .catch(e => console.error(e))
        console.log('####### formData ', formData)
    }

    onSignUp(e: Event): void {
        e.preventDefault()
        render('#app', new RegistrationPage())
    }

    onBlur(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.props.errors = validate(target)
        showErrors(this.props.errors)
    }

    onFocus(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.props.errors = validate(target)
        showErrors(this.props.errors)
    }


    protected render(): DocumentFragment {
        auth.checkAuth()
            .then(res => {
                if(res) {
                    router.navigate('/messenger')
                }
            })
            .catch(e => console.error(e))
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
                submit:(e: Event) => this.onSignUp(e),
                // click: (e: Event) => this.onSignUp(e),
            },
        })

        const inputLogin = new Input({
            id: 'login',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Логин',
            name: 'login',
            type: 'text',
            errorText: 'Не верный формат логина',
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
            errorText: 'Не верный формат пароля',
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
            formName: this.props.formName,
        })
    }
}
