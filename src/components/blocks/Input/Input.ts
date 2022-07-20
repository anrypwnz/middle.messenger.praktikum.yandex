import Block from '../../../modules/Block'
import compile from '../../../modules/Compile'
import tmpl from './Input.hbs'

import './Input.less'

type InputProps = {
    id?: string,
    type?: string,
    placeholder?: string,
    value?: string,
    name?: string,
    label?: string,
    autocomplete?: string,
    inputClass?: string,
    labelClass?: string,
    error?: boolean,
    errorText?: string,
    events?: {
        input?: (e?: Event) => void,
        change?: (e?: Event) => void,
        click?: (e?: Event) => void,
    }
}

export default class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super('div', props)
    }

    componentDidUpdate(): boolean {
        return true
    }

    render(): DocumentFragment {
        this.props.error && console.log('####### RENDER this.props.error ', this.props.error)
        return compile(tmpl, {...this.props})
    }
}
