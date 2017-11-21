import $ from 'jquery'

export default class NewsTicker {
  constructor(elem) {
    this.elem = elem
    this.opts = {
      speed: 1000,
      delay: 3000,
      easing: 'swing'
    }
    this._init()
  }

  addText(params) {
    this.list.push(params)
  }

  run() {
    this.effect = {
      init: {
        css:     { left: (200) , display:' block' ,opacity: '0' },
        animate: { left: '0', opacity: '1', zIndex:'98' }
      },
      start: {
        animate: { left:(-(200)), opacity: '0' }
      },
      next: {
        css:     { left: (param.ulWidth), display: 'block', opacity: '0', zIndex: '99' },
        animate: { left: '0', opacity: '1' }
      },
      end: {
        css: { zIndex: '98' }
      }
    }
    // this.interval =
  }

  _init() {
    const $newsTicker = `
      <div class='recho_news_ticker_container'>
        <table class='recho_news_ticker'>
          <tr>
            <th scope='row'>
              <img class='recho_twitter_logo' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADeAAAA3gHd6oNqAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAVlQTFRF////AP//gID/Var/gL//Zsz/Var/bbb/ccb/ZrPmar/qYsTrbbbtabTwY7jxZr/yYbbzar/0Zrj1aL32Ybn2Y73vaLfvYrzwZrnyY7nzZrv0ZLz0Zbr0Zr3wZLnwZrnxZb3yY7ryZLvzZLnzZ7r0Y7nyZbryZLvzZbvzZrrzZLrxZLvxZbryZbvyZrryZbrzZrvzZLrzZrvxZLvxZrvxZbzyZbryZrvyZrvxZbvxZrzyZbzyZrvyZLzyZrvzZrzxZbvxZbvxZLzyZbryZbvyZrvyZbzyZLryZrzyZLvzZbryZrvyZbzyZbvyZbvyZbvyZrzyZbvyZLvyZLvxZbzyZbvyZbvyZbvyZbzzZrvxZbzyZrvyZbvyZbvyZrvyZbvyZbvyZbvyZbvyZrvxZbvyZLvyZbvyZbvyZbvyZbvyZbvyZbvyZbvzZbvyZbvyZbvyZbvyZbvyZbvyQjjGIAAAAHJ0Uk5TAAECAwQFBgcJCgwNDhESFBUYGRsdHyAiKCwtLjAyMzc6O0BCQ01RUlNVWV5gYmRoaWtscHFyd3iAg4WIioyPlJWXm5ydnp+go6Wrra6vsLGytbe8vb7DyMzO0NPV19jZ2tze4uTn6uvv8PLz9fj5+vv9gIIbZAAAARNJREFUGBnFwecjAnEABuA3sjMiZHRZ2YTMrERkU1kZGZGZ7v3/P3BXrt/l11eeB/+jbeHkPjxSBaA71A7AZ4HIMp2m5ml+9pp7AFq5UQrBCvMS9grAS+5Ww+BWaUiOhw+BRZIPHvw4pUkXMErNjgs66wcFKQ8AhVkXE7UAOijqgibGHDW+OjxGUQs0zjSLqQTgtGMoTblXfGt8WfMGKJeAZotFBaFpSrKYfug63yj3WYMs1x2l9qFrcMAWeKeEAp0tdbkePMjwl2Pk+CiVUZBTskyZOeQNRFUWilggqlOOaBKvh4nnhiYxGwxWR5//nGahchiWVBa66oWoZ/uZorPJMhSwugen/KFI/PE2ujnTjD/3BTnX5zUB5rkyAAAAAElFTkSuQmCC">
              <span class='recho_hashtag'>#地球征服</span>
            </th>
            <td>面白い！！！＼(^o^)／</td>
          </tr>
        </table>
      </div>
    `

    $(this.elem).append($newsTicker)
  }
}
