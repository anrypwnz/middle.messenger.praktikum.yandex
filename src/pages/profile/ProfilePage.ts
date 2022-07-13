import '../../styles/styles.less'
import Block from '../../modules/Block';
import Button from '../../components/blocks/Button/Button';
import Input from '../../components/blocks/Input/Input';
import compile from '../../modules/compile';
import tmpl from './profile.hbs'
import validate from '../../utils/validation';

export default class ProfilePage extends Block {
    constructor() {
        super('div', {
            titleName: 'Иван',
            email: 'ivan@mail.com',
            login: 'ivanich',
            firstName: 'Иван',
            secondName: 'Иванов',
            nickname: 'Иваныч',
            phone: '89996661313',
        });
    }

    onBlur(e: Event): void {
        this.onValidate(e)
    }

    onFocus(e: Event): void {
        this.onValidate(e)
    }

    onValidate(e: Event): void {
        const target = e.target as HTMLInputElement;
        const errorField = document.getElementById('profile-error')
        if (errorField) {
            errorField.textContent = validate(target)
        }
    }

    onSubmit(e: Event): void {
        e.preventDefault()
        const formElement = this.element.getElementsByTagName('input')
        const formData: any = {}
        for (const element of formElement) {
            formData[element.name] = element.value
        }
        console.log('onSubmit', formData);
    }


    protected render(): DocumentFragment {

        const inputEmail = new Input({
            id: 'email',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Почта',
            name: 'email',
            type: 'email',
            value: this.props.email,
            autocomplete: 'email',
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputLogin = new Input({
            id: 'login',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Логин',
            name: 'login',
            type: 'login',
            value: this.props.login,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputFirstName = new Input({
            id: 'first_name',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Имя',
            name: 'first_name',
            type: 'first_name',
            value: this.props.firstName,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputSecondName = new Input({
            id: 'second_name',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Фамилия',
            name: 'second_name',
            type: 'second_name',
            value: this.props.secondName,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputNickname = new Input({
            id: 'nickname',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Имя в чате',
            name: 'nickname',
            type: 'nickname',
            value: this.props.nickname,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputPhone = new Input({
            id: 'phone',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Телефон',
            name: 'phone',
            type: 'phone',
            value: this.props.phone,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const submitButton = new Button({
            text: 'Сохранить',
            class: 'form-btn-submit profile-btn',
            type: 'button',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        })

        const changePasswordButton = new Button({
            text: 'Изменить пароль',
            class: 'form-btn-cancel profile-btn',
            type: 'button',
            events: {
                click: (e: Event) => this.onSubmit(e),
            },
        })

        return compile(tmpl, {
            title: this.props.firstName,
            inputEmail,
            inputLogin,
            inputFirstName,
            inputSecondName,
            inputNickname,
            inputPhone,
            submitButton,
            changePasswordButton
        })
    }
}
