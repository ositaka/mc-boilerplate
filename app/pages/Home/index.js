import Page from 'classes/Page'
import Detection from 'classes/Detection'

import { getOffset } from 'utils/dom'
import { LottieInteractive } from 'lottie-interactive'
export default class Home extends Page {
    constructor() {
        super({
            id: 'home',

            element: '.home',
            elements: {
                wrapper: '.home__wrapper',
                navigation: '.navigation',
                title: '.home__title',
                fixed: '.is-fixed',
                video: '.home__hero video',
                workflow: '.home__workflow'
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

        const packs = document.querySelectorAll(".home__packs__pack");
        const firstPack = document.querySelector(".home__packs__pack");

        [].forEach.call(packs, function (element) {
            element.classList.add('inactive')
            firstPack.parentNode.firstChild.classList.remove('inactive')

            element.onclick = function (e) {
                if (element.classList.contains('inactive')) {
                    packs.forEach((pack) => {
                        pack.classList.add('inactive')
                        this.classList.remove('inactive')
                    })
                }
            }
        })
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
