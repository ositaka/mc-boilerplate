import GSAP from 'gsap'
import Prefix from 'prefix'

import each from 'lodash/each'
import map from 'lodash/map'
import { mapEach } from 'utils/dom'

import Highlight from 'animations/Highlight'
import Label from 'animations/Label'
import Paragraph from 'animations/Paragraph'
import Title from 'animations/Title'

import AsyncLoad from 'classes/AsyncLoad'
import { ColorsManager } from 'classes/Colors'
import Detection from 'classes/Detection'

import { clamp, lerp } from 'utils/math'

export default class Page {
  constructor({
    element,
    elements,
    id,
  }) {
    this.selector = element
    this.selectorChildren = {
      ...elements,

      animationsHighlights: '[data-animation="highlight"]',
      animationsLabels: '[data-animation="label"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsTitles: '[data-animation="title"]',

      preloaders: '[data-src]'
    }

    this.id = id

    this.transformPrefix = Prefix('transform')
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })

    this.createAnimations()
    this.createPrealoder()
  }

  createAnimations() {
    this.animations = []

    // Highlights.
    this.animationsHighlights = map(this.elements.animationsHighlights, element => {
      return new Highlight({
        element
      })
    })

    this.animations.push(...this.animationsHighlights)

    // Titles.
    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({
        element
      })
    })

    this.animations.push(...this.animationsTitles)

    // Paragraphs.
    this.animationsParagraphs = map(this.elements.animationsParagraphs, element => {
      return new Paragraph({
        element
      })
    })

    this.animations.push(...this.animationsParagraphs)

    // Labels.
    this.animationsLabels = map(this.elements.animationsLabels, element => {
      return new Label({
        element
      })
    })

    this.animations.push(...this.animationsLabels)

  }

  createPrealoder() {
    this.preloaders = mapEach(this.elements.preloaders, element => {
      return new AsyncLoad({ element })
    })
  }

  /**
   * Animations.
   */
  show(animation) {
    return new Promise(resolve => {
      ColorsManager.change({
        backgroundColor: this.element.getAttribute('data-background'),
        color: this.element.getAttribute('data-color')
      })

      if (animation) {
        this.animationIn = animation
      } else {
        this.animationIn = GSAP.timeline()

        this.animationIn.fromTo(this.element, {
          autoAlpha: 0
        }, {
          autoAlpha: 1,
          duration: 0.3,
        })
      }

      this.animationIn.call(_ => {
        this.addEventListeners()

        resolve()
      })
    })
  }

  hide() {
    return new Promise(resolve => {
      this.destroy()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'expo.out',
        transform: 'translateY(10%)',
        onComplete: resolve
      })
    })
  }

  /**
   * Events.
   */
  onResize() {
    if (!this.elements.wrapper) return

    window.requestAnimationFrame(_ => {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight

      each(this.animations, animation => {
        animation.onResize && animation.onResize()
      })
    })
  }

  onTouchDown(event) {
    if (!Detection.isPhone()) return

    this.isDown = true

    this.scroll.position = this.scroll.current
    this.start = event.touches ? event.touches[0].clientY : event.clientY
  }

  onTouchMove(event) {
    if (!Detection.isPhone() || !this.isDown) return

    const y = event.touches ? event.touches[0].clientY : event.clientY
    const distance = (this.start - y) * 3

    this.scroll.target = this.scroll.position + distance
  }

  onTouchUp(event) {
    if (!Detection.isPhone()) return

    this.isDown = false
  }

  onWheel(normalized) {
    const speed = normalized.pixelY

    this.scroll.target += speed

    if (!this.elements.wrapper) return
    window.requestAnimationFrame(_ => {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    })

    return speed
  }


  /**
   * Loop.
   */
  update() {
    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)

    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] = `translate3d(0, -${this.scroll.current}px, 0)`
    }

    if (this.elements.fixed) {
      if (this.elements.fixed.length > 1) {
        each(this.elements.fixed, (element) => {
          element.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current}px, 0)`
        })
      } else {
        this.elements.fixed.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current}px, 0)`
      }
    }
  }

  /**
   * Listeners.
   */
  addEventListeners() {

  }

  removeEventListeners() {

  }

  /**
   * Destroy.
   */
  destroy() {
    this.removeEventListeners()
  }
}
