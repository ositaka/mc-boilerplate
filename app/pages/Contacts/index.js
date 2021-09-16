import Page from 'classes/Page'
import Detection from 'classes/Detection'

import { getOffset } from 'utils/dom'
export default class Contacts extends Page {
    constructor() {
        super({
            id: 'contacts',

            element: '.contacts',
            elements: {
                wrapper: '.contacts__wrapper',
                navigation: '.navigation',
                fixed: '.is-fixed',
                title: '.contacts__title'
            },
            langs: {
                en: '#en',
                pt: '#pt',
            }
        })
    }

    update() {
        super.update()

        if (this.elements.fixed) {
            const fixed = this.elements.fixed
            const center = -(window.innerHeight / 4)
            const wrapper = getOffset(this.elements.wrapper).top

            if (Detection.is60fps()) {
                if (wrapper > center) {
                    fixed.style.filter = `blur(0rem)`
                    fixed.style.pointerEvents = `all`
                }
                else {
                    fixed.style.filter = `blur(.2rem) blur(.6rem)`
                    fixed.style.pointerEvents = `none`
                }
            }
        }
    }
}
