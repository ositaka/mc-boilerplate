import Page from 'classes/Page'

export default class PricePacks extends Page {
    constructor() {
        super({
            id: 'price_packs',

            element: '.price_packs',
            elements: {
                wrapper: '.price_packs__wrapper',
                navigation: '.navigation',
                title: '.price_packs__title'
            },
            langs: {
                en: '#en',
                nl: '#nl',
                pt: '#pt',
            }
        })
    }

}
