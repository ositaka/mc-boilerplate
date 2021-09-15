import Component from 'classes/Component'

export default class Footer extends Component {
  constructor({ lang }) {
    super({
      element: '.footer',
      // elements: {
      //   items: '.footer__list__item',
      //   links: '.footer__list__link'
      // }
    })

    this.onChange(lang)
  }

  onChange(lang) {

  }
}
