import Page from 'classes/Page'

export default class Services extends Page {
    constructor() {
        super({
            id: 'services',

            element: '.services',
            elements: {
                wrapper: '.services__wrapper',
                navigation: '.navigation',
                title: '.services__title'
            },
            langs: {
                en: '#en',
                pt: '#pt',
            }
        })
    }

}
