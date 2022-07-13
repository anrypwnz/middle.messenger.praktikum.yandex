import Block from './modules/Block';
import {IndexPage} from './pages/IndexPage/IndexPage';

export function render(query: string, block: Block): Element {
    const root = document.querySelector(query)

    if (!root) {
        throw new Error('Root not found')
    }

    root.innerHTML = ''
    root.appendChild(block.getContent())

    return root
}

render('#app', new IndexPage())