import Block from '../../../modules/Block';
import tmpl from './FormRegistration.hbs';
import Button from '../Button/Button';
import Input from '../Input/Input';
import compile from '../../../modules/compile';
import {render} from '../../../index';
import LoginPage from '../../../pages/login/LoginPage';
import '../FormLogin/FormLogin.less'
import validate from '../../../utils/validation';

export default class FormRegistration extends Block {
    constructor() {
        super('div', {
            value: '',
            email: '',
            login: '',
            firstName: '',
            secondName: '',
            phone: '',
            password: '',
            repeatPassword: '',
        });
    }

    onSubmit(e: Event): void {
        e.preventDefault()
        const formElements = this.element.getElementsByTagName('input')
        const formData: string[] = []
        let errors: string[] = []

        for (const element of formElements) {
            formData[element.name] = element.value
            this.onValidate(element)
            errors = errors.concat(validate(element))
        }

        if (!errors.length) {
            console.log('####### formData ', formData)
        }
    }

    onSignIn(e: Event): void {
        e.preventDefault()
        render('#app', new LoginPage())
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

        const errors = validate(e)
        const formErrors = document.querySelectorAll<HTMLElement>('.form-error')
        formErrors.forEach(i => {
            i.style.display = 'none'
        })
        errors.forEach(i => {
            const errorField = document.getElementById(`error-${i}`)
            errorField && (errorField.style.display = 'block')
        })
    }

    protected render(): DocumentFragment {

        const buttonSignIn = new Button({
            text: 'Войти',
            class: 'btn-option',
            type: 'button',
            events: {
                click: (e: Event) => this.onSignIn(e),
            },
        })

        const buttonSubmit = new Button({
            text: 'Зарегистрироваться',
            class: 'btn-submit',
            type: 'submit',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        })

        const inputEmail = new Input({
            id: 'email',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Почта',
            name: 'email',
            type: 'email',
            value: this.props.login,
            autocomplete: 'email',
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
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

        const inputFirstName = new Input({
            id: 'first-name',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Имя',
            name: 'first-name',
            type: 'text',
            value: this.props.firstName,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputSecondName = new Input({
            id: 'second-name',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Фамилия',
            name: 'second-name',
            type: 'text',
            value: this.props.secondName,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputPhone = new Input({
            id: 'phone',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            autocomplete: 'tel',
            value: this.props.phone,
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

        const inputRepeatPassword = new Input({
            id: 'password-repeat',
            inputClass: 'form-input',
            labelClass: 'form-label',
            label: 'Пароль (еще раз)',
            name: 'password-repeat',
            type: 'password',
            value: this.props.repeatPassword,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        return compile(tmpl, {
            buttonSubmit,
            buttonSignIn,
            inputEmail,
            inputLogin,
            inputFirstName,
            inputSecondName,
            inputPhone,
            inputPassword,
            inputRepeatPassword,
        })
    }
}