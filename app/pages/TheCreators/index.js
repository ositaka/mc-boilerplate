import Page from 'classes/Page'

import Typewritter from 'animations/Typewritter'

export default class TheCreators extends Page {
    constructor() {
        super({
            id: 'the_creators',

            element: '.the_creators',
            elements: {
                wrapper: '.the_creators__wrapper',
                navigation: '.navigation',
                title: '.the_creators__title',
                typewritter: '.the_creators__words__list'
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

        console.log(this.elements.typewritter)

        if (this.elements.typewritter) {
            console.log("hit")
            new Typewritter({
                text: this.elements.typewritter.textContent,
                time: 90
            })
        }
    }

    destroy() {
        super.destroy()
    }
}
