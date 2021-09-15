import Page from 'classes/Page'

import Swiper from 'swiper';
export default class Pack extends Page {
    constructor() {
        super({
            id: 'pack',

            element: '.pack',
            elements: {
                wrapper: '.pack__wrapper',
                navigation: '.navigation',
                title: '.pack__title',
                slider: '.packs__slider'
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

        if (this.elements.slider) {

            const swiper = new Swiper('.swiper-container', {
                loop: true,
                slidesPerView: 'auto',
                freeMode: true,
                centeredSlides: true,
                freeModeMomentumVelocityRatio: .8,
            })

            swiper.loopDestroy();
            swiper.loopCreate();
        }


        // pack-page accordion - mobile only
        const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            const features = document.querySelectorAll(".pack__overview .pack__feature");

            [].forEach.call(features, function (element) {
                element.classList.add('inactive')

                element.onclick = function (e) {
                    this.classList.toggle('active')
                    this.classList.toggle('inactive')
                }
            })
        }
    }

    destroy() {
        super.destroy()
    }

}
