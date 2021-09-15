import Page from 'classes/Page'

import Prefix from 'prefix'
import { getOffset } from 'utils/dom'

export default class Approach extends Page {
    constructor() {
        super({
            id: 'approach',

            element: '.approach',
            elements: {
                wrapper: '.approach__wrapper',
                navigation: '.navigation',
                title: '.approach__title',
                sticky: '.is-fixed'
            },
            langs: {
                en: '#en',
                nl: '#nl',
                pt: '#pt',
            }
        })

        this.transformPrefix = Prefix('transform')
    }

    create() {
        super.create()
    }

    update() {
        super.update()

        if (this.elements.sticky && this.elements.sticky.offsetTop) {
            const sticky = this.elements.sticky
            const center = -(window.innerHeight / 2)
            const wrapper = getOffset(this.elements.wrapper).top
            const workflow = getOffset(this.element.querySelector('.approach__workflow')).bottom
            const titleHeight = this.element.querySelector('.approach__workflow__title h2').clientHeight

            if (wrapper > center) {
                sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + wrapper}px, 0)`
            }
            else if (workflow < -(center - titleHeight)) {
                sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + workflow - (window.innerHeight + titleHeight)}px, 0)`
            }
            else {
                sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + center}px, 0)`
            }
        }
    }

    onResize() {
        super.onResize()

        if (this.elements.sticky && this.elements.sticky.offsetTop) {
            const sticky = this.elements.sticky
            const center = -(window.innerHeight / 2)
            const wrapper = getOffset(this.elements.wrapper).top
            const workflow = getOffset(this.element.querySelector('.approach__workflow')).bottom
            const titleHeight = this.element.querySelector('.approach__workflow__title h2').clientHeight

            if (wrapper > center) {
                sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + wrapper}px, 0)`
            }
            else if (workflow < -(center - titleHeight)) {
                sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + workflow - (window.innerHeight + titleHeight)}px, 0)`
            }
            else {
                sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + center}px, 0)`
            }
        }
    }

    destroy() {
        super.destroy()
    }

}
