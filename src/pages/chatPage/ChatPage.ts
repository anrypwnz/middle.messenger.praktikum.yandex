import './chatPage.less'
import '../../styles/styles.less'

import Block from '../../modules/Block'
import compile from '../../modules/compile';
import tmpl from './chatPage.hbs';
import chatCell from './chatCell.hbs'
import chatMsg from './chatMsg.hbs'
import modalAddFile from './modalAddFile.hbs'

export default class ChatPage extends Block {
    constructor() {
        super('div');
    }

    protected render(): DocumentFragment {

        return compile(tmpl, {
            chatCell,
            chatMsg,
            modalAddFile
        })
    }
}