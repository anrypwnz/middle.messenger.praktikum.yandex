import Block from '../../../modules/Block'
import compile from '../../../modules/Compile';
import tmpl from './Input.hbs'

import './Input.less'

export default class Input extends Block {
    constructor(props: {
        id?: string,
        type?: string,
        placeholder?: string,
        value?: string,
        name?: string,
        label?: string,
        autocomplete?: string,
        inputClass?: string,
        labelClass?: string,
        events?: {
            input?: (e?: any) => void,
            change?: (e?: any) => void,
            click?: (e?: any) => void,
        }
    }) {
        super('div', props);
    }

    componentDidUpdate(): boolean {
        return true
    }

    render(): DocumentFragment {
        return compile(tmpl, { ...this.props })
    }
}