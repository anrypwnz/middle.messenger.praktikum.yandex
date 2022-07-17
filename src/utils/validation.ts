const isEmail = (email: string): boolean => {
    const reg = /^(?!.*(\.\.))[a-zA-Z0-9]+[-_\.\dA-Za-z]*@[a-zA-Z\d]+[-_\da-z]*\.[a-z]+$/;
    return reg.test(email)
};

const isPhone = (phone: string): boolean => {
    const reg = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return reg.test(phone)
}

const isPassword = (password: string): boolean => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    return reg.test(password)
}
const isPasswordSame = (repeatedPassword: string): boolean => {
    const pass = (<HTMLInputElement>(document.querySelector('input[name="password"]'))).value;
    console.log('####### pass ', pass)
    console.log('####### repeatedPassword ', repeatedPassword)
    return repeatedPassword === pass
}

const isValidName = (name: string): boolean => {
    const reg = /^[0-9А-Яа-яa-zA-Z_.-]+$/
    return reg.test(name)
}

const isValidLogin = (login: string): boolean => {
    const reg = /^[0-9a-zA-Z_.-]+$/
    return reg.test(login)
}
let errors: string[] = [];
const validate = (target: HTMLInputElement): string[] => {
    const {id, value} = target
    switch (id) {
        case 'email':
            if (!isEmail(value)) {
                errors.find(i => i == id) || errors.push(id)
            } else {
                errors = errors.filter(i => i !== id)
            }
            return errors;
        case 'phone':
            if (!isPhone(value)) {
                errors.find(i => i == id) || errors.push(id)
            } else {
                errors = errors.filter(i => i !== id)
            }
            return errors;
        case 'password':
            if (!isPassword(value)) {
                errors.find(i => i == id) || errors.push(id)
            } else {
                errors = errors.filter(i => i !== id)
            }
            return errors;
        case 'password-repeat':
            if (!isPasswordSame(value)) {
                errors.find(i => i == id) || errors.push(id)
            } else {
                errors = errors.filter(i => i !== id)
            }
            return errors;
        case 'first-name':
        case 'second-name':
        case 'nickname':
            if (!isValidName(value)) {
                errors.find(i => i == id) || errors.push(id)
            } else {
                errors = errors.filter(i => i !== id)
            }
            return errors;
        case 'login':
            if (!isValidLogin(value)) {
                errors.find(i => i == id) || errors.push(id)
            } else {
                errors = errors.filter(i => i !== id)
            }
            return errors;
        default:
            return errors;
    }
}
export default validate