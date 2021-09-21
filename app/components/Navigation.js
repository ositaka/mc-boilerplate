// import GSAP from 'gsap'

import Component from 'classes/Component'
import Detection from 'classes/Detection'

import { mapEach } from 'utils/dom'

// import { COLOR_BRIGHT_GRAY, COLOR_QUARTER_SPANISH_WHITE } from 'utils/colors'

export default class Navigation extends Component {
  constructor({ template, langEN, langPT, menu, menuLinks, siteurl, seo_title }) {
    super({
      element: '.navigation',
      elements: {
        content: '.content',
        items: '.navigation__list__item',
        links: '.navigation__list__link',
        menuLinks: '.navigation__list .navigation__list__link',
        navigation: '.navigation',
        langSwitcher: '.langs__switcher .navigation__list__link'
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
          document.getElementById("menu-toggle-button").checked = false
        })
      })
    }

    this.elements.navigation.addEventListener('click', event => {
      const subnav = event.srcElement.parentNode.parentNode.classList.contains('navigation__list__subnav')
      const subnavParent = event.srcElement.parentNode.parentNode.parentNode.querySelector('.navigation__list__link')
      const langSwitcher = this.elements.langSwitcher
      let langsClick = false

      mapEach(langSwitcher, element => {
        if (event.target == element) {
          langsClick = true
        }
      })

      if (subnav) {
        mapEach(this.elements.menuLinks, element => {
          element.classList.remove('active')
        })

        subnavParent.classList.add("active")
      }

      else {
        if (langsClick !== true && event.target.href) {
          mapEach(this.elements.menuLinks, element => {
            element.classList.remove('active')
          })
        }
      }

      if (langsClick !== true && event.target.href) {
        event.target.classList.add("active")
      }
    })

    this.elements.content.addEventListener('click', event => {

      // get url's from navigation
      mapEach(this.elements.menuLinks, element => {

        const anchor = event.target.closest("a")
        if (!anchor) return

        // get url from click
        if (anchor.getAttribute('href') === element.getAttribute('href').replace(/http:\/\/localhost:3030/g, '')) {
          element.classList.add('active')
        }
      })
    })

    // check current page on window load
    mapEach(this.elements.menuLinks, element => {
      if (window.location.href.replace(/http:\/\/localhost:3030/g, '') === element.getAttribute('href')) {
        element.classList.add('active')

        // in case of subnav item,
        // activate parent link
        if (window.location.pathname.includes(element.getAttribute('href'))) {

          const subnav = element.parentNode.parentNode.classList.contains('navigation__list__subnav')
          const subnavParent = element.parentNode.parentNode.parentNode.querySelector('.navigation__list__link')

          if (subnav) {
            subnavParent.classList.add("active")
          }
        }
      }
    })
  }

  onChange(template, langEN, langPT, menu, menuLinks, siteurl, seo_title) {
    if (typeof menu !== 'undefined') {
      document.title = seo_title
      this.langs.en.setAttribute('href', langEN);
      this.langs.pt.setAttribute('href', langPT);
      this.langs.siteurl.setAttribute('href', siteurl);

      mapEach(this.elements.menuLinks, (element, index) => {
        const link = menuLinks[index]
        element.text = link.text
        element.href = link.href
      })
    }

  }
}
