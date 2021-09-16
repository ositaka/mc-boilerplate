import Page from 'classes/Page'

export default class ServicePage extends Page {
    constructor() {
        super({
            id: 'service_page',

            element: '.service_page',
            elements: {
                wrapper: '.service_page__wrapper',
                navigation: '.navigation',
                title: '.service_page__title',
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
