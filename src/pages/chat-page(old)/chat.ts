import './chat-page.less'
import '../../styles/styles.less'
import '../../styles/general.less'

const infoPanelButton: HTMLElement = document.querySelector('.info-panel__menu-btn')!

infoPanelButton.addEventListener('mousedown', () => {
    document.querySelector('.info-panel__menu')!.classList.toggle('modal-options_show')
})

document.querySelector('.msg-panel__add-file')!.addEventListener('mousedown', () => {
    document.querySelector('.modal-options')!.classList.toggle('modal-options_show')
})