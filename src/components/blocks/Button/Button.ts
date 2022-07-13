import Block from '../../../modules/Block'
import compile from '../../../modules/Compile'
import tmpl from './Button.hbs'
import './Button.less'

export default class Button extends Block {
    constructor(props: {
        text: string,
        type?: string,
        class?: string,
        events?: {
            click?: (e: Event) => void,
            submit?: (e: Event) => void,
        }
        primary?: boolean,
    }) {
        super('div', props);
    }

    componentDidUpdate(): boolean {
        return true
    }

    render(): DocumentFragment {
        return compile(tmpl, {...this.props})
    }
}