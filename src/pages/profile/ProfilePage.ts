import '../../styles/styles.less'
import Block from '../../modules/Block';
import Button from '../../components/blocks/Button/Button';
import Input from '../../components/blocks/Input/Input';
import compile from '../../modules/compile';
import tmpl from './profile.hbs'
import onValidate from '../../utils/showErrors';
import auth from '../../api/AuthApi';
import {router} from '../../utils';
import validate from '../../utils/validation';
import showErrors from '../../utils/showErrors';

type FormProfileProps = {
    displayName: string | null,
    email: string,
    login: string,
    firstName: string,
    secondName: string,
    nickname: string,
    phone: string,
    avatar: string,
    errors: string[],
}

export default class ProfilePage extends Block<FormProfileProps> {
    constructor() {
        super('div' );
    }

    onBlur(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.props.errors = validate(target)
        showErrors(this.props.errors)
    }

    onFocus(e: Event): void {
        onValidate(e)
    }
    changeAvatar(){
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

    init() {
        console.log('####### init ', )
        super.init()
        auth.checkAuth()
            .then((res: Response) => {
                console.log('####### res ', res)
                // @ts-ignore
                const {id, displayName, email, firstName, secondName, login, phone, avatar} = res
                
                this.props.displayName = displayName
                this.props.email = email
                this.props.firstName = firstName
                this.props.secondName = secondName
                this.props.login = login
                this.props.phone = phone
                this.props.avatar = avatar
                debugger
                this.render()
            })
            .catch(e => console.error(e))
    }

    protected render(): DocumentFragment {
        console.log('####### render ', this.props)

        const  inputEmail = new Input({
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
            id: 'first-name',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Имя',
            name: 'first-name',
            type: 'first-name',
            value: this.props.firstName,
            events: {
                change: (e: Event) => this.onBlur(e),
                click: (e: Event) => this.onFocus(e),
            }
        })

        const inputSecondName = new Input({
            id: 'second-name',
            inputClass: 'form-input profile-form-input',
            labelClass: 'form-label profile-form-label',
            label: 'Фамилия',
            name: 'second-name',
            type: 'second-name',
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
            title: this.props.displayName || this.props.firstName,
            inputEmail,
            inputLogin,
            inputFirstName,
            inputSecondName,
            inputNickname,
            inputPhone,
            submitButton,
            changePasswordButton,
            changeAvatar: this.changeAvatar,
        })
    }
}
