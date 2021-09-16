import GSAP from 'gsap'
import Animation from 'classes/Animation'
export default class Paragraph extends Animation {
  constructor({ element }) {
    super({
      element
    })
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({
      delay: 0.2
    })

    // this.timelineIn.set(this.element, {
    //   autoAlpha: 1
    // })

    this.timelineIn.fromTo(this.element, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: .3,
    }, 0)

  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }
}
