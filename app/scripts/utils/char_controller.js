/* 文字を制御するコントローラー */

import $ from 'jquery'
import Flowly from 'flowly-js'

export default class CharController {
  constructor(type, container, opts = { direction: 'horizontal' }) {
    this.type = type
    this.container = container
    this.opts = opts
    this._init()
  }

  addText(params) {
    if (this._isFlowly()) {
      this.flowly.addText(params)

    } else if (this._isNewsTicker()) {

    }
  }

  addImage(params) {
    if (this._isFlowly()) {
      this.flowly.addImage(params)

    } else if (this._isNewsTicker()) {

    }
  }

  toggle(flag) {
    if (this._isFlowly()) {
      this.flowly.toggle(flag)

    } else if (this._isNewsTicker()) {

    }
  }

  updateType(type) {
    this.type = type
    this._init()
  }

  update(opts) {
    this.opts = opts
    this._init()
  }

  _init() {
    if (this._isFlowly()) {
      this.flowly = this.flowly || new Flowly(this.container, { padding: { top: 30, bottom: 30 } })
      this.flowly.update(this.opts)
    } else if (this._isNewsTicker()) {

    }
  }

  _isFlowly() {
    return this.type === 'Flowly'
  }

  _isNewsTicker() {
    return this.type === 'NewsTicker'
  }

  update() {

  }
}
