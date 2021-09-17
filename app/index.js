import NormalizeWheel from 'normalize-wheel';
import each from 'lodash/each';

import Detection from 'classes/Detection'

import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import Preloader from 'components/Preloader';

import Intro from 'pages/Intro';
import Home from 'pages/Home';
// import Work from 'pages/Work';
// import WorkPage from 'pages/WorkPage';
import Team from 'pages/Team';
import Services from 'pages/Services';
import ServicePage from 'pages/ServicePage';
import Pages from 'pages/Pages';
import Contacts from 'pages/Contacts';

class App {
  constructor() {
    this.createContent();

    // this.createCanvas();
    this.createPreloader();
    this.createNavigation();
    this.createFooter();
    this.createPages();

    this.addEventListeners();
    this.addLinkListeners();

    this.onResize();

    this.update();
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template
    });
  }

  createFooter() {
    this.footer = new Footer({
      // lang: this.lang
    });
  }

  createPreloader() {
    this.preloader = new Preloader();

    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  // createCanvas() {
  // }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      intro: new Intro(),
      home: new Home(),
      // work: new Work(),
      // work_page: new WorkPage(),
      team: new Team(),
      services: new Services(),
      service_page: new ServicePage(),
      pages: new Pages(),
      contacts: new Contacts(),
    };

    this.page = this.pages[this.template];
    this.page.create();
  }

  /**
   * Events.
   */
  onPreloaded() {
    this.onResize();

    this.page.show();
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false
    });
  }

  async onChange({ url, push = true }) {
    await this.page.hide();

    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement('div');

      if (push) {
        window.history.pushState({}, '', url);
      }

      div.innerHTML = html;

      const divContent = div.querySelector('.content');
      const langEN = div.querySelector('.langs #en') ? div.querySelector('.langs #en').href : '';
      const langPT = div.querySelector('.langs #pt') ? div.querySelector('.langs #pt').href : '';
      const menu = div.querySelector('.navigation__list__link').innerHTML;
      const menuLinks = Array.prototype.slice.call(div.querySelectorAll('.navigation__list .navigation__list__link'));
      const siteurl = div.querySelector('.navigation__link').href;
      const footerDiv = div.querySelector('.footer').innerHTML;
      const seo_title = div.querySelector('title').innerHTML;

      this.template = divContent.getAttribute('data-template');
      this.langEN = langEN;
      this.langPT = langPT;
      this.menu = menu;
      this.menuLinks = menuLinks;
      this.siteurl = siteurl;
      this.footerDiv = footerDiv;
      this.seo_title = seo_title;

      this.navigation.onChange(this.template, this.langEN, this.langPT, this.menu, this.menuLinks, this.siteurl, this.seo_title);

      this.footer.onChange(this.footerDiv);

      this.content.setAttribute('data-template', this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages[this.template];
      this.page.create();

      this.onResize();

      this.page.show();

      this.addLinkListeners();

    }
    else {
      this.onChange({ url: '/' });
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  onTouchDown(event) {
    if (this.page && this.page.onTouchDown) {
      this.page.onTouchDown(event)
    }
  }

  onTouchMove(event) {
    if (this.page && this.page.onTouchMove) {
      this.page.onTouchMove(event)
    }
  }

  onTouchUp(event) {
    if (this.page && this.page.onTouchUp) {
      this.page.onTouchUp(event)
    }
  }

  onWheel(event) {
    const normalizedWheel = NormalizeWheel(event);

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel);
    }
  }

  /**
   * Loop.
   */
  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  /***
   * Listeners.
   */
  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this));
    window.addEventListener('mousewheel', this.onWheel.bind(this));

    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('mousemove', this.onTouchMove.bind(this));
    window.addEventListener('mouseup', this.onTouchUp.bind(this));

    window.addEventListener('touchstart', this.onTouchDown.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchUp.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, link => {
      const isLocal = link.href.indexOf(window.location.origin) > -1
      const isOnPage = link.href.indexOf('#') > -1

      const isNotEmail = link.href.indexOf('mailto') === -1
      const isNotPhone = link.href.indexOf('tel') === -1

      if (isLocal && !isOnPage) {
        link.onclick = event => {
          event.preventDefault()

          this.onChange({
            url: link.href
          })
        }
      }
      else if (isOnPage) {
        link.onclick = event => {
          event.preventDefault()

          const destination = event.target.getAttribute('href')
          const destinationElement = document.querySelector(destination)

          console.log(destination)
          console.log(destinationElement)

          this.page.scroll.target = destinationElement.offsetTop
        }
      }
      else if (isNotEmail && isNotPhone) {
        link.rel = 'noopener'
        link.target = '_blank'
      }
    })
  }
}

new App();