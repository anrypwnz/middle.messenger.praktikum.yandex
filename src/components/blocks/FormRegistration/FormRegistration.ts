import Block from '../../../modules/Block';
import tmpl from './FormRegistration.hbs';
import Button from '../Button/Button';
import Input from '../Input/Input';
import compile from '../../../modules/compile';
import {render} from '../../../index';
import LoginPage from '../../../pages/login/LoginPage';
import '../FormLogin/FormLogin.less'
import validate from '../../../utils/validation';
import showErrors from '../../../utils/showErrors';

type FormRegistrationProps = {
    formName?: any,
    value?: string,
    email: string,
    login: string,
    firstName: string,
    secondName: string,
    phone: string,
    password: string,
    repeatPassword: string,
    errors: string[],
}

export default class FormRegistration extends Block<FormRegistrationProps> {
    constructor() {
        super('div', {
            formName: 'registration',
            value: '',
            email: '',
            login: '',
            firstName: '',
            secondName: '',
            phone: '',
            password: '',
            repeatPassword: '',
            errors: [],
        });
    }

    onSubmit(e: Event): void {
        e.preventDefault()
        const formElements = document.forms[this.props.formName].elements
        const formData: { [key: string]: string } = {}
        for (const inputElement of formElements) {
            formData[(inputElement as HTMLInputElement).name] = (inputElement as HTMLInputElement).value
            this.props.errors = validate(inputElement as HTMLInputElement)
        }
        showErrors(this.props.errors)
        console.log('####### formData ', formData)
    }

    onSignIn(e: Event): void {
        e.preventDefault()
        render('#app', new LoginPage())
    }

    onBlur(e: Event): void {
        const target = e.target as HTMLInputElement
        this.props.errors = validate(target)
        showErrors(this.props.errors)
    }

    onFocus(e: Event): void {
        const target = e.target as HTMLInputElement
        this.props.errors = validate(target)
        showErrors(this.props.errors)
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
            errorText: 'Не правильный формат почты',
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
            errorText: 'Логин должен состоять из латинских букв и цифр',
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
            errorText: 'Имя может состоять из букв',
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
            errorText: 'Фамилия может состоять из букв',
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
            errorText: 'Не правильный формат телефона',
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
            errorText: 'Слишком простой пароль',
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
            errorText: 'Пароли не совпадают',
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
            formName: this.props.formName,
        })


    }
}
