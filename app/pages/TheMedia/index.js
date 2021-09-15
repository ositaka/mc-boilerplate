import Page from 'classes/Page'
import Detection from 'classes/Detection'

import Prefix from 'prefix'
import { getOffset, mapEach } from 'utils/dom'

export default class TheMedia extends Page {
    constructor() {
        super({
            id: 'the_media',

            element: '.the_media',
            elements: {
                wrapper: '.the_media__wrapper',
                navigation: '.navigation',
                title: '.the_media__title',
                fixed: '.is-fixed',
                preview: '.the_media__marquee__preview',
                lists: '.the_media__marquee__list',
                items: '.the_media__marquee__link',
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

        setTimeout(() => {
            document.querySelector('.navigation__list').firstChild.classList.add('active')
        }, 0);


        // Preview
        const lists = this.elements.lists
        const preview = this.elements.preview

        var mouseX = 0, mouseY = 0
        var xp = 0, yp = 0

        window.addEventListener('mousemove', e => {
            mouseX = e.pageX - (preview.offsetWidth / 2)
            mouseY = e.pageY - (preview.offsetHeight / 2)
        })

        /**
         * Events
         */
        mapEach(lists, item => {
            item.addEventListener('mouseenter', _ => {
                preview.style.opacity = '1'
                lists.forEach((list) => list.style.zIndex = -1)
                item.style.zIndex = 0
            })

            item.addEventListener('mousemove', _ => {
                xp += ((mouseX - xp) / 6)
                yp += ((mouseY - yp) / 6)
                preview.style[this.transformPrefix] = `translate3d(${xp}px, ${yp}px, 0)`
                preview.firstChild.style[this.transformPrefix] = `scale(1)`
            })

            item.addEventListener('mouseleave', _ => {
                xp += ((mouseX - xp) / 6)
                yp += ((mouseY - yp) / 6)
                preview.style.opacity = '0'
                preview.style[this.transformPrefix] = `translate3d(${xp}px, ${yp}px, 0)`
                preview.firstChild.style[this.transformPrefix] = ` scale(0.5)`
                lists.forEach((list) => list.style.zIndex = 0)
            })
        })

    }

    update() {
        super.update()

        if (this.elements.fixed) {
            const fixed = this.elements.fixed
            const center = -(window.innerHeight / 4)
            const wrapper = getOffset(this.elements.wrapper).top

            if (wrapper > center) {
                if (Detection.is60fps()) { fixed.style.filter = `blur(0rem)` }
                fixed.style.pointerEvents = `all`
            }
            else {
                if (Detection.is60fps()) { fixed.style.filter = `blur(.2rem) blur(.6rem)` }
                fixed.style.pointerEvents = `none`
            }
        }
    }


    destroy() {
        super.destroy()
    }
}
