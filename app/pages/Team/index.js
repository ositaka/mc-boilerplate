import Page from 'classes/Page'

export default class Team extends Page {
    constructor() {
        super({
            id: 'team',

            element: '.team',
            elements: {
                wrapper: '.team__wrapper',
                navigation: '.navigation',
                title: '.team__title',
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

    destroy() {
        super.destroy()
    }
}
