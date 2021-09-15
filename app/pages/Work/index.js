import Page from 'classes/Page'
import Detection from 'classes/Detection'

import { getOffset } from 'utils/dom'
import { mapEach } from 'utils/dom'

export default class Work extends Page {
    constructor() {
        super({
            id: 'work',

            element: '.work',
            elements: {
                wrapper: '.work__wrapper',
                navigation: '.navigation',
                works: '.work__list a',
                fixed: '.is-fixed',
                footer: '.footer',
            },
            langs: {
                en: '#en',
                nl: '#nl',
                pt: '#pt',
            }
        })
    }

    create() {
        super.create()
    }

    show() {
        super.show()

        const scroll = this.scroll
        const wrapper = this.elements.wrapper
        const height = wrapper.clientHeight - (window.innerHeight)
        const defaultTransition = wrapper.style.transition

        scroll.current = height
        scroll.last = height
        scroll.target = height

        wrapper.style.opacity = 0
        this.element.style.transform = 'scale(0.03)'
        this.element.style.transformOrigin = 'bottom center'
        this.elements.footer.style.visibility = 'visible'

        mapEach(this.elements.works, element => element.style.pointerEvents = 'none')

        setTimeout(() => {
            this.elements.footer.style.visibility = 'hidden'
            wrapper.style.opacity = 1
            wrapper.style.transition = 'transform 3.2s cubic-bezier(0.23, 0.3, 0.17, 1.0), opacity 4s'

            this.scroll.target = 0

            setTimeout(() => {
                wrapper.style.transition = defaultTransition
                this.elements.footer.style.visibility = 'visible'
                mapEach(this.elements.works, element => element.style.pointerEvents = 'all')
            }, 6000);

        }, 0);

        setTimeout(() => {
            this.element.style.transform = 'scale(1)'
            this.element.style.transformOrigin = 'top center'
            this.element.style.transition = 'transform 6.8s cubic-bezier(0.4, 0, 0.17, 1)'
        }, 0);
    }

    update() {
        super.update()

        if (this.elements.fixed) {
            const fixed = this.elements.fixed
            const center = -(window.innerHeight / 4)
            const wrapper = getOffset(this.elements.wrapper).top

            if (wrapper > center) {
                if (Detection.is60fps()) { fixed.style.filter = `blur(0rem)` }
                fixed.style.color = `white`
                fixed.style.webkitTextStroke = `.1rem transparent`
            }
            else {
                if (Detection.is60fps()) { fixed.style.filter = `blur(0.2rem)` }
                fixed.style.color = `transparent`
                fixed.style.webkitTextStroke = `.1rem white`
            }
        }
    }

    // onResize() {
    //     super.onResize()

    //     if (this.elements.sticky && this.elements.sticky.offsetTop) {
    //         const sticky = this.elements.sticky
    //         const center = -(window.innerHeight / 2)
    //         const wrapper = getOffset(this.elements.wrapper).top
    //         const workflow = getOffset(this.element.querySelector('.approach__workflow')).bottom
    //         const titleHeight = this.element.querySelector('.approach__workflow__title h2').clientHeight

    //         if (wrapper > center) {
    //             sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + wrapper}px, 0)`
    //         }
    //         else if (workflow < -(center - titleHeight)) {
    //             sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + workflow - (window.innerHeight + titleHeight)}px, 0)`
    //         }
    //         else {
    //             sticky.style[this.transformPrefix] = `translate3d(0, ${this.scroll.current + center}px, 0)`
    //         }
    //     }
    // }

    destroy() {
        super.destroy()
    }
}
