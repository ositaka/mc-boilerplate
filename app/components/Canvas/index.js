import { Camera, Renderer, Transform } from 'ogl'

import Intro from './Intro'

export default class Canvas {
  constructor({ template }) {
    this.template = template

    this.x = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.y = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true
    })

    this.gl = this.renderer.gl
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
  }

  createScene() {
    this.scene = new Transform()
  }

  /**
   * Intro.
   */
  createIntro() {
    this.intro = new Intro({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyIntro() {
    if (!this.intro) return

    this.intro.destroy()
    this.intro = null
  }

  /**
   * About.
   */
  createAbout() {
    this.about = new About({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyAbout() {
    if (!this.about) return

    this.about.destroy()
    this.about = null
  }

  /**
   * Collections.
   */
  // createCollections() {
  //   this.collections = new Collections({
  //     gl: this.gl,
  //     scene: this.scene,
  //     sizes: this.sizes,
  //     transition: this.transition
  //   })
  // }

  // destroyCollections() {
  //   if (!this.collections) return

  //   this.collections.destroy()
  //   this.collections = null
  // }

  /**
   * Detail.
   */
  // createDetail() {
  //   this.detail = new Detail({
  //     gl: this.gl,
  //     scene: this.scene,
  //     sizes: this.sizes,
  //     transition: this.transition
  //   })
  // }

  // destroyDetail() {
  //   if (!this.detail) return

  //   this.detail.destroy()
  //   this.detail = null
  // }

  /**
   * Events.
   */
  onPreloaded() {
    this.onChangeEnd(this.template)
  }

  onChangeStart(template, url) {
    if (this.about) {
      this.about.hide()
    }

    // if (this.collections) {
    //   this.collections.hide()
    // }

    // if (this.detail) {
    //   this.detail.hide()
    // }

    if (this.intro) {
      this.intro.hide()
    }

    // this.isFromCollectionsToDetail = this.template === 'collections' && url.indexOf('detail') > -1
    // this.isFromDetailToCollections = this.template === 'detail' && url.indexOf('collections') > -1

    // if (this.isFromCollectionsToDetail || this.isFromDetailToCollections) {
    //   this.transition = new Transition({
    //     gl: this.gl,
    //     scene: this.scene,
    //     sizes: this.sizes,
    //     url
    //   })

    //   this.transition.setElement(this.collections || this.detail)
    // }
  }

  onChangeEnd(template) {
    if (template === 'about') {
      this.createAbout()
    } else if (this.about) {
      this.destroyAbout()
    }

    // if (template === 'collections') {
    //   this.createCollections()
    // } else if (this.collections) {
    //   this.destroyCollections()
    // }

    // if (template === 'detail') {
    //   this.createDetail()
    // } else if (this.detail) {
    //   this.destroyDetail()
    // }

    if (template === 'intro') {
      this.createIntro()
    } else {
      this.destroyIntro()
    }

    this.template = template
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes = {
      height,
      width
    }

    const values = {
      sizes: this.sizes
    }

    if (this.about) {
      this.about.onResize(values)
    }

    // if (this.collections) {
    //   this.collections.onResize(values)
    // }

    // if (this.detail) {
    //   this.detail.onResize(values)
    // }

    if (this.intro) {
      this.intro.onResize(values)
    }
  }

  onTouchDown(event) {
    this.isDown = true

    this.x.start = event.touches ? event.touches[0].clientX : event.clientX
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY

    const values = {
      x: this.x,
      y: this.y,
    }

    if (this.about) {
      this.about.onTouchDown(values)
    }

    // if (this.collections) {
    //   this.collections.onTouchDown(values)
    // }

    // if (this.detail) {
    //   this.detail.onTouchDown(values)
    // }

    if (this.intro) {
      this.intro.onTouchDown(values)
    }
  }

  onTouchMove(event) {
    if (!this.isDown) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y,
    }

    if (this.about) {
      this.about.onTouchMove(values)
    }

    // if (this.collections) {
    //   this.collections.onTouchMove(values)
    // }

    // if (this.detail) {
    //   this.detail.onTouchMove(values)
    // }

    if (this.intro) {
      this.intro.onTouchMove(values)
    }
  }

  onTouchUp(event) {
    this.isDown = false

    const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
    const y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y,
    }

    if (this.about) {
      this.about.onTouchUp(values)
    }

    // if (this.collections) {
    //   this.collections.onTouchUp(values)
    // }

    // if (this.detail) {
    //   this.detail.onTouchUp(values)
    // }

    if (this.intro) {
      this.intro.onTouchUp(values)
    }
  }

  onWheel(event) {
    // if (this.collections) {
    //   this.collections.onWheel(event)
    // }

    if (this.intro) {
      this.intro.onWheel(event)
    }
  }

  /**
   * Loop.
   */
  update(scroll) {
    if (this.about) {
      this.about.update(scroll)
    }

    // if (this.collections) {
    //   this.collections.update()
    // }

    // if (this.detail) {
    //   this.detail.update()
    // }

    if (this.intro) {
      this.intro.update()
    }

    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    })
  }
}
