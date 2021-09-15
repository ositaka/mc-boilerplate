import Button from 'classes/Button'
import Page from 'classes/Page'

export default class Intro extends Page {
  constructor() {
    super({
      id: 'intro',

      element: '.intro',
      elements: {
        navigation: '.navigation',
        link: '.intro__link'
      },
      langs: {
        en: '#en',
        pt: '#pt',
      }
    })
  }

  create() {
    super.create()

    this.link = new Button({
      element: this.elements.link
    })
  }

  destroy() {
    super.destroy()

    this.link.removeEventListeners()
  }
}
