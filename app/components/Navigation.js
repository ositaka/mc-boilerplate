import GSAP from 'gsap'

import Component from 'classes/Component'
import Detection from 'classes/Detection'

import { mapEach } from 'utils/dom'

import { COLOR_BRIGHT_GRAY, COLOR_QUARTER_SPANISH_WHITE } from 'utils/colors'

export default class Navigation extends Component {
  constructor({ template, langEN, langPT, menu, menuLinks, siteurl, seo_title }) {
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link',
        menuLinks: '.navigation__list .navigation__list__link',
        navigation: '.navigation'
      },
      langs: {
        en: '#en',
        pt: '#pt',
        menu: '.navigation__list',
        siteurl: '.navigation__link'
      },
    })

    this.onChange(template, langEN, langPT, menu, menuLinks, siteurl, seo_title)
  }

  create() {
    super.create()

    if (Detection.isPhone) {
      mapEach(this.elements.links, element => {
        element.addEventListener('click', _ => {
          console.log("clicked")
          document.getElementById("menu-toggle-button").checked = false
        })
      })
    }
  }

  onChange(template, langEN, langPT, menu, menuLinks, siteurl, seo_title) {
    if (typeof menu !== 'undefined') {
      document.title = seo_title
      this.langs.en.setAttribute('href', langEN);
      this.langs.pt.setAttribute('href', langPT);
      this.langs.siteurl.setAttribute('href', siteurl);

      this.elements.menuLinks.forEach((element, index) => {
        const link = menuLinks[index]
        element.text = link.text
        element.href = link.href
      })
    }

    if (template === 'home') {
      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })
      GSAP.to(this.elements.items[0], {
        duration: 1.5,
        textDecoration: 'underline'
      })

    } else if (template === 'the_media' || template === 'media_page') {

      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })
      GSAP.to(this.elements.items[0], {
        duration: 1.5,
        textDecoration: 'underline'
      })

    } else if (template === 'approach') {

      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })
      GSAP.to(this.elements.items[1], {
        duration: 1.5,
        textDecoration: 'underline'
      })

    } else if (template === 'work') {

      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })
      GSAP.to(this.elements.items[2], {
        duration: 1.5,
        textDecoration: 'underline'
      })

    } else if (template === 'the_creators') {

      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })
      GSAP.to(this.elements.items[3], {
        duration: 1.5,
        textDecoration: 'underline'
      })

    } else if (template === 'contacts') {

      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })
      GSAP.to(this.elements.items[4], {
        duration: 1.5,
        textDecoration: 'underline'
      })

    } else if (template === 'price_packs') {

      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })
      GSAP.to(this.elements.items[5], {
        duration: 1.5,
        textDecoration: 'underline'
      })

    } else {

      GSAP.to(this.elements.items, {
        duration: 1.5,
        textDecoration: 'none'
      })

    }

    // if (template === 'about') {
    //   GSAP.to(this.element, {
    //     color: COLOR_BRIGHT_GRAY,
    //     duration: 1.5
    //   })

    //   GSAP.to(this.elements.items[0], {
    //     autoAlpha: 1,
    //     delay: 0.75,
    //     duration: 0.75
    //   })

    //   GSAP.to(this.elements.items[1], {
    //     autoAlpha: 0,
    //     duration: 0.75
    //   })
    // } else {
    //   GSAP.to(this.element, {
    //     color: COLOR_QUARTER_SPANISH_WHITE,
    //     duration: 1.5
    //   })

    //   GSAP.to(this.elements.items[0], {
    //     autoAlpha: 0,
    //     duration: 0.75
    //   })

    //   GSAP.to(this.elements.items[1], {
    //     autoAlpha: 1,
    //     delay: 0.75,
    //     duration: 0.75
    //   })
    // }

  }
}
