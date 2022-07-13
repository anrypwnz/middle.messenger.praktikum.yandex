import Block from '../../modules/Block'
import compile from '../../modules/compile';
import tmpl from './registration.hbs';
import FormRegistration from '../../components/blocks/FormRegistration/FormRegistration'

import './registration.less'

export default class RegistrationPage  extends Block {
  constructor() {
    super('div');
  }

  protected render(): DocumentFragment {

    const formRegistration = new FormRegistration()

    return compile(tmpl, {
      formRegistration
    })
  }
}
