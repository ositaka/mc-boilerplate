import GSAP from 'gsap'

import Component from 'classes/Component'

import { split } from 'utils/text'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        numberText: '.preloader__number__text'
      }
    })

    window.TEXTURES = {}

    split({
      element: this.elements.title,
      expression: '<br>'
    })

    split({
      element: this.elements.title,
      expression: '<br>'
    })

    this.elements.titleSpans = this.elements.title.querySelectorAll('span span')

    this.length = 0

    this.createLoader()
  }

  createLoader() {
    window.ASSETS.forEach(image => {
      const media = new window.Image()

      media.crossOrigin = 'anonymous'
      media.src = image

      media.onload = _ => {
        this.onAssetLoaded()
      }
    })
  }

  onAssetLoaded(image) {
    this.length += 1

    const percent = this.length / window.ASSETS.length

    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`

    if (percent === 1) {
      this.onLoaded()
    }
  }

  onLoaded() {
    return new Promise(resolve => {
      this.emit('completed')

      this.animateOut = GSAP.timeline({
        delay: 1
      })

      this.animateOut.to(this.elements.titleSpans, {
        // duration: 1.5,
        duration: .5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%'
      })

      this.animateOut.to(this.elements.numberText, {
        // duration: 1.5,
        duration: .5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%'
      }, '-=1.4')

      this.animateOut.to(this.element, {
        duration: 1.5,
        ease: 'expo.out',
        transform: 'translateY(-100%)',
      }, '-=1')

      // this.animateOut.to(this.element, {
      //   autoAlpha: 0,
      //   duration: 1
      // })

      this.animateOut.call(_ => {
        this.destroy()
      })
    })
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}
