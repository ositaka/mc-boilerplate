import Page from 'classes/Page'


import Prefix from 'prefix'
import { mapEach } from 'utils/dom'

// import { getOffset } from 'utils/dom'

export default class WorkPage extends Page {
    constructor() {
        super({
            id: 'work_page',

            element: '.work_page',
            elements: {
                wrapper: '.work_page__wrapper',
                navigation: '.navigation',
                title: '.work_page__title',
                parallax: '.work_page__parallax__media > *',
                gallery: '.work_page__gallery__media > *',
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

    onResize() {
        super.onResize()
    }

    update() {
        super.update()

        if (this.elements.parallax || this.elements.gallery) {
            const parallax = this.elements.parallax
            const gallery = this.elements.gallery

            mapEach(parallax, item => {
                item.style[this.transformPrefix] = `translate3d(0, ${(-item.offsetTop + this.scroll.current) * 0.4}px, 0)`
            })

            mapEach(gallery, item => {
                item.style[this.transformPrefix] = `translate3d(0, ${(-item.offsetTop + this.scroll.current) * 0.2}px, 0)`
                // item.style[this.transformPrefix] = `translate3d(0, ${(-(item.offsetTop - (item.offsetHeight / 4)) + this.scroll.current) * 0.15}px, 0)`
            })
        }
    }


    destroy() {
        super.destroy()

    }

}

