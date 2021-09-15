import Page from 'classes/Page'
import Detection from 'classes/Detection'

import Prefix from 'prefix'
import Swiper from 'swiper'

import { getOffset } from 'utils/dom'
import { mapEach } from 'utils/dom'
export default class MediaPage extends Page {
    constructor() {
        super({
            id: 'media_page',

            element: '.media_page',
            elements: {
                wrapper: '.media_page__wrapper',
                navigation: '.navigation',
                title: '.media_page__title',
                fixed: '.is-fixed',
                slider: '.packs__slider',
                parallax: '.media__page__slice-image__media > *',
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

        if (this.elements.slider) {

            const swiper = new Swiper('.swiper-container', {
                loop: false,
                slidesPerView: 'auto',
                freeMode: false,
                centeredSlides: false,
                freeModeMomentumVelocityRatio: .8,
            })
        }
    }


    update() {
        super.update()

        if (this.elements.parallax) {
            const parallax = this.elements.parallax

            mapEach(parallax, item => {
                item.style[this.transformPrefix] = `translate3d(0, ${(-item.offsetTop + this.scroll.current) * 0.1}px, 0)`
            })
        }

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
