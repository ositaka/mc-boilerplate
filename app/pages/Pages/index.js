import Page from 'classes/Page'
import Detection from 'classes/Detection'

import { getOffset } from 'utils/dom'

export default class Pages extends Page {
    constructor() {
        super({
            id: 'page',

            element: '.page',
            elements: {
                wrapper: '.page__wrapper',
                navigation: '.navigation',
                title: '.page__title',
                fixed: '.is-fixed',
            },
            langs: {
                en: '#en',
                pt: '#pt',
            }
        })

    }

    create() {
        super.create()

    }

    update() {
        super.update()

        if (this.elements.fixed) {
            const fixed = this.elements.fixed
            const video = this.elements.video
            const center = -(window.innerHeight / 4)
            const wrapper = getOffset(this.elements.wrapper).top

            if (wrapper > center) {
                if (Detection.is60fps()) { fixed.style.filter = `blur(0rem)` }
                fixed.style.pointerEvents = `all`
                video.play()
            }
            else if (wrapper > wrapper) {
                setTimeout(() => video.pause(), 400);
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
