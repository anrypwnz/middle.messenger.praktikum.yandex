const isEmail = (email: string): string => {
    const reg = /^(?!.*(\.\.))[a-zA-Z0-9]+[-_\.\dA-Za-z]*@[a-zA-Z\d]+[-_\da-z]*\.[a-z]+$/;
    return reg.test(email) ? '' : 'Некорректный email.'
};

const isPhone = (phone: string): string => {
    const reg = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return reg.test(phone) ? '' : 'Некорректный номер телефона'
}

const isPassword = (password: string): string => {
    const reg = /(?=.*\d)(?=.*[a-z/а-я])(?=.*[A-Z/А-Я]).{8,}/;
    return reg.test(password) ? '' : 'Некорректный пароль'
}

const isValidName = (name: string): string => {
    const reg = /^[0-9А-Яа-яa-zA-Z_.-]+$/
    return reg.test(name) ? '' : 'Некорректное имя'
}

const isValidLogin = (login: string): string => {
    const reg = /^[0-9a-zA-Z_.-]+$/
    return reg.test(login) ? '' : 'Некорректный логин'
}

const validate = (target: HTMLInputElement): string => {
    switch (target.id) {
        case 'email':
            return isEmail(target.value)
        case 'phone':
            return isPhone(target.value)
        case 'password':
        case 'password-repeat':
            return isPassword(target.value);
        case 'first_name':
        case 'second_name':
        case 'nickname':
            return isValidName(target.value)
        case 'login':
            return isValidLogin(target.value)
        default:
            return 'No such ID';
    }
}
export default validate