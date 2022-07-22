const showErrors = (errorsArray: string[]): void => {

    const formErrors = document.querySelectorAll<HTMLElement>('.form-error')

    formErrors.forEach(element => {
        errorsArray.forEach(name => {
            if (name !== element.dataset.name) {
                element.classList.remove('show')
            }
        })
    })

    errorsArray.forEach(name => {
        const errorField = document.querySelector(`[data-name=${name}]`)
        errorField && (errorField.classList.add('show'))
    })
}

export default showErrors
