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
        const formElements = this.element.getElementsByTagName('input')
        let errors: string[] = []
        const formData: string[] = []

        for (const element of formElements) {
            formData[element.name] = element.value
            this.onValidate(element)
            errors = errors.concat(validate(element))
        }

        if (!errors.length) {
            console.log('####### formData ', formData)
        }
    }

    onSignUp(e: Event): void {
        e.preventDefault()
        render('#app', new RegistrationPage())
    }

    onBlur(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.onValidate(target)
    }

    onFocus(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.onValidate(target)
    }

    onValidate(e: HTMLInputElement): void {
        const formErrors = document.querySelectorAll<HTMLElement>('.form-error')
        const errors = validate(e)
        formErrors.forEach(i => {
            i.style.display = 'none'
        })
        errors.forEach((i: string) => {
            const errorField = document.getElementById(`error-${i}`)
            errorField && (errorField.style.display = 'block')
        })
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