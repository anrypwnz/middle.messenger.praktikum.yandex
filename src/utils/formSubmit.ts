export default function handleFormSubmit(e: Event): Record<string, string> {
    console.log('####### e.target ', e.target)
    if (!(e?.target as HTMLFormElement)?.elements) {
        throw new Error('Необходимо передать событие submit с формы');
    }
    e.preventDefault();
    const { elements } = e.target as HTMLFormElement;
    const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
    return fields.reduce((acc: Record<string, string>, field: HTMLInputElement) => {
        acc[field.name] = field.value;
        return acc;
    }, {});
}
