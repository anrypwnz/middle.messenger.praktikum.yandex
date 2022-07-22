import Block from '../../../modules/Block'
import compile from '../../../modules/Compile'
import tmpl from './Button.hbs'
import './Button.less'

type ButtonProps = {
    text: string,
    type?: string,
    class?: string,
    events?: {
        click?: (e: Event) => void,
        submit?: (e: Event) => void,
    }
    primary?: boolean,
};

export default class Button extends Block<ButtonProps> {
    public constructor(props: ButtonProps) {
        super('div', props)
    }

    render(): DocumentFragment {
        return compile(tmpl, {...this.props})
    }
}
