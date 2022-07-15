import validate from './validation';

const onValidate = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const errors = validate(target)
    const formErrors = document.querySelectorAll<HTMLElement>('.form-error')
    formErrors.forEach(i => {
        i.style.display = 'none'
    })
    errors.forEach(i => {
        const errorField = document.getElementById(`error-${i}`)
        errorField && (errorField.style.display = 'block')
    })
}

export default onValidate
