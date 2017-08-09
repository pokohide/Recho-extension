/* スライドを操作するマネージャー */
/* jQueryに依存 */

import $ from 'jquery'
import crypto from 'crypto'
import { randomStr } from '../utils'

export default class ContentManager {
  constructor(hostname) {
    this.type = this._discriminateBy(hostname)
    this._init(this.type)
  }

  goNext() {
    console.log('goNext')
    $(this.nextButton).click()
  }

  goPrev() {
    console.log('goPrev')
    $(this.prevButton).click()
  }

  countUp(type, value) {
    this.count[type] += value
    this._updateNavigation(this.count)
  }

  getState() {
    return {
      isRechoing   : this.isRechoing,
      isNavigation : this.isNavigation,
      isCommentable: this.isCommentable,
      hashtag      : this.hashtag,
      direction    : this.direction,
      room         : this.room_id,
    }
  }

  recho(hashtag, direction) {
    if (this.hashtag === hashtag) {
      this._updateNavigation(this.count)
    } else {
      this.count = { tweet: 0, like: 0 }
      this.showNavigation(hashtag, this.count)
    }
    this.isRechoing = true
    this.isCommentable = true
    this.hashtag = hashtag
    this.direction = direction
  }

  generateRoomId(user_id) {
    if (this.room_id) return
    const prefix = crypto.createHash('md5').update(location.href).digest('hex')
    this.room_id = prefix + '_' + user_id
  }

  update(params) {
    this.direction = params.direction
  }

  disrecho() {
    this.isRechoing = false
    this.hideNavigation()
  }

  hideNavigation() {
    $('.recho_viewer').hide()
    this.isNavigation = false
  }

  showNavigation(hashtag, count) {
    if (!hashtag) hashtag = this.hashtag
    if (!count) count = this.count
    this.isNavigation = true

    if ($('.recho_viewer').length) {
      $('.recho_viewer .r_hashtag').text(`#${hashtag}`)
      return this._updateNavigation(count)
    }

    const $viewer = `
    <div class="recho_viewer" style="position:fixed;right:10px;top:10px;margin: 1em 0em;margin-top:0;max-width:100%;
      display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;
      min-height:0px;background:#FFFFFF;padding:0em;border:none;box-shadow: 0px 1px 3px 0px #D4D4D5,0px 0px 0px 1px #D4D4D5;
      transition: box-shadow 0.1s ease,transform 0.1s ease,-webkit-transform 0.1s ease;width:200px;border-radius:2px;
      font-family: Lato,'Noto Sans JP','游ゴシック Medium','游ゴシック体','Yu Gothic Medium',YuGothic,'ヒラギノ角ゴ ProN',
      'Hiragino Kaku Gothic ProN','メイリオ',Meiryo,'ＭＳ Ｐゴシック','MS PGothic',sans-serif;z-index:2147483647;">
      <div style="-webkit-box-flex:1;flex-grow:1;border:none;background:none;margin:0;padding:1em;box-shadow:none;font-size:1em;
        border-radius: 0.28571429rem 0.28571429rem 0em 0em;border-top:none;display:block;">
        <h3 class="r_hashtag" style="margin:0;text-align:center;font-weight:200;display:block;font-size:23px;">
          #${hashtag}
        </h3>
      </div>
      <div style="max-width:100%;min-height:0;-webkit-box-flex:0;flex-grow:0;border-top:1px solid rgba(0, 0, 0, 0.05);
        position:static;background:none;width:auto;margin:0;top:0;left:0;color:rgba(0,0,0,0.4);box-shadow:none;
        border-radius:0em 0em 0.28571429rem 0.28571429rem;font-size:1em;border:none;padding:5px 40px;">
        <span class="recho_tweet" style="float:left;color:rgba(0, 0, 0, 0.4);display:flex;-webkit-align-items:center;">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADeAAAA3gHd6oNqAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAVlQTFRF////AP//gID/Var/gL//Zsz/Var/bbb/ccb/ZrPmar/qYsTrbbbtabTwY7jxZr/yYbbzar/0Zrj1aL32Ybn2Y73vaLfvYrzwZrnyY7nzZrv0ZLz0Zbr0Zr3wZLnwZrnxZb3yY7ryZLvzZLnzZ7r0Y7nyZbryZLvzZbvzZrrzZLrxZLvxZbryZbvyZrryZbrzZrvzZLrzZrvxZLvxZrvxZbzyZbryZrvyZrvxZbvxZrzyZbzyZrvyZLzyZrvzZrzxZbvxZbvxZLzyZbryZbvyZrvyZbzyZLryZrzyZLvzZbryZrvyZbzyZbvyZbvyZbvyZrzyZbvyZLvyZLvxZbzyZbvyZbvyZbvyZbzzZrvxZbzyZrvyZbvyZbvyZrvyZbvyZbvyZbvyZbvyZrvxZbvyZLvyZbvyZbvyZbvyZbvyZbvyZbvyZbvzZbvyZbvyZbvyZbvyZbvyZbvyQjjGIAAAAHJ0Uk5TAAECAwQFBgcJCgwNDhESFBUYGRsdHyAiKCwtLjAyMzc6O0BCQ01RUlNVWV5gYmRoaWtscHFyd3iAg4WIioyPlJWXm5ydnp+go6Wrra6vsLGytbe8vb7DyMzO0NPV19jZ2tze4uTn6uvv8PLz9fj5+vv9gIIbZAAAARNJREFUGBnFwecjAnEABuA3sjMiZHRZ2YTMrERkU1kZGZGZ7v3/P3BXrt/l11eeB/+jbeHkPjxSBaA71A7AZ4HIMp2m5ml+9pp7AFq5UQrBCvMS9grAS+5Ww+BWaUiOhw+BRZIPHvw4pUkXMErNjgs66wcFKQ8AhVkXE7UAOijqgibGHDW+OjxGUQs0zjSLqQTgtGMoTblXfGt8WfMGKJeAZotFBaFpSrKYfug63yj3WYMs1x2l9qFrcMAWeKeEAp0tdbkePMjwl2Pk+CiVUZBTskyZOeQNRFUWilggqlOOaBKvh4nnhiYxGwxWR5//nGahchiWVBa66oWoZ/uZorPJMhSwugen/KFI/PE2ujnTjD/3BTnX5zUB5rkyAAAAAElFTkSuQmCC" style="width:22px;height:22px;display:inline-block;vertical-align:middle;">
          <span class="recho_count" style="font-size:16px;margin-left:3px;">${count.tweet || 0}</span>
          <i></i>
        </span>
        <span class="recho_like" style="float:right;color:rgba(0, 0, 0, 0.4);display:flex;-webkit-align-items:center;">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCAYAKRBdJvkVAAABj0lEQVRIx6XUsWsUURDH8Y9BtDAqgqUKiiAkRPCuERVFiBCwOSyUYOO/EGIVU1wpCEqsxSqCRTq1SgIqio1okQQTBDmJVsYQiIiiZCyylxPdS/bt/aaZeW9/3515b1m21gkLljw2bEeBp3P0UmTxyr50+xEh9LuoIdxMB4wKC+CCsJrew7xwI8vfCcfT7FVhzaGs+ij0pgHuCdNZ3mVVOJZirwuhllVnhWXbU+31jfquMF7ezqJwubydLxsfVPhtzqjdKXZGLP2FCOGtbv8staJuM+1U0xDu5AMWDRUY86Qwmw8opr3CSlfxa/lPPZjrBDCImfKAbtfwvjzgmzEc6GSEp+jtBFDFp/LX2OercLo8YEBo0BxhSlXVVMIA81ih2UEFVBI6uCW8aXWQqkuG8aTVwaSKismsmjHi8KaAMWF2/X8QbeOZgbaAQeH2eppnPWc6y16r2ZYDeCBcbQ+AUx5ZE8JnE647Y5f9epx3xUNh2Z6tj6rPuF+5r/ipv+h5HzTkue+Z8YcPXrjvaHP7D+yn8jNeA/XsAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA4LTA2VDAwOjQxOjE2KzAyOjAwH/jwfQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOC0wNlQwMDo0MToxNiswMjowMG6lSMEAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC" style="width:22px;height:22px;display:inline-block;vertical-align:middle;">
          <span class="recho_count" style="font-size:16px;margin-left:3px;">${count.like || 0}</span>
          <i></i>
        </span>
      </div>
    </div>
    `
    document.body.insertAdjacentHTML('afterend', $viewer)
  }

  _updateNavigation(count) {
    $('.recho_viewer .recho_tweet .recho_count').text(count.tweet || 0)
    $('.recho_viewer .recho_like .recho_count').text(count.like || 0)
    $('.recho_viewer').show()
    this.isNavigation = true
  }

  /* タイプから判別する */
  _init(type) {
    this.isRechoing = false
    this.isNavigation = false
    this.isCommentable = false
    this.direction = 'ho'
    this.hashtag = ''

    this.slide = {}
    if (type === 'slideshare') {
      this.container = '.slide_container'
      this.nextButton = '#btnNext'
      this.prevButton = '#btnPrevious'
    } else if (type === 'speakerdeck') {
      this.container = '.speakerdeck-iframe'
    } else if (type === 'qiita') {
      this.container = '.slide_preview'
    }
  }

  _discriminateBy(host) {
    if (/slideshare/.test(host)) return 'slideshare'
    else if (/speakerdeck/.test(host)) return 'speakerdeck'
    else if (/qiita/.test(host)) return 'qiita'
  }
}
