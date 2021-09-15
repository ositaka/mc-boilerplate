import EventEmitter from 'events'

import each from 'lodash/each'

export default class Component extends EventEmitter {
  constructor({
    element,
    elements,
    langs
  }) {
    super()

    this.selector = element
    this.selectorChildren = {
      ...elements
    }
    this.selectorLangs = {
      ...langs
    }

    this.create()

    this.addEventListeners()
  }

  create() {
    if (this.selector instanceof window.HTMLElement) {
      this.element = this.selector
    } else {
      this.element = document.querySelector(this.selector)
    }

    this.elements = {}

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

    this.langs = {}

    each(this.selectorLangs, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.langs[key] = entry
      } else {
        this.langs[key] = document.querySelectorAll(entry)

        if (this.langs[key].length === 0) {
          this.langs[key] = null
        } else if (this.langs[key].length === 1) {
          this.langs[key] = document.querySelector(entry)
        }
      }
    })
  }

  addEventListeners() {

  }

  removeEventListeners() {

  }
}
