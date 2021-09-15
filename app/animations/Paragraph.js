// import GSAP from 'gsap'
// import each from 'lodash/each'

import Animation from 'classes/Animation'
// import Component from 'gia/Component';

export default class Paragraph extends Animation {
  constructor(element) {
    super(element);

    this.options = {
      delay: 0.3,
    };
  }

  mount() {
    let newContent = "";
    this.element.innerText.split(' ').forEach(function (word, index) {
      newContent += `<span><span style="animation-delay: ${0.6 + index * this.options.delay + 0.4}s">${word}</span></span> `;
    }.bind(this));
    this.element.innerHTML = newContent;
  }
}