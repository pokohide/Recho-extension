import $ from 'jquery'

const API_URL = 'https://recho-api.herokuapp.com'

export default class PopupManager {
  constructor() {
    this.submitButton = $('#submit-button')
    this.hashInput = $('#hashtag-input')
    this.dirInput = $('#direction-input')
    this.qrCode = $('.qrcode-container')

    this._init()
  }

  send(message, cb) {
    const queryInfo = {
      active  : true,
      windowId: chrome.windows.WINDOW_ID_CURRENT
    }

    chrome.tabs.query(queryInfo, (result) => {
      const currentTab = result.shift()
      chrome.tabs.sendMessage(currentTab.id, message, (res) => { cb(res) })
    })
  }

  _init() {
    this.submitButton.addClass('loading').addClass('disabled')

    chrome.storage.local.get(['recho_hashtag', 'recho_direction'], (items) => {
      this.hashInput.val(items.recho_hashtag || '')
      this.dirInput.val(items.recho_direction || 'horizontal')
    })

    this.send({ method: 'isRechoing' }, (res) => {
      this.submitButton.removeClass('loading').removeClass('disabled')

      this.adminURL = `${API_URL}/admin?room=${res.room}`
      console.log(this.adminURL)
      this.qrCode.html(`<img src="http://chart.apis.google.com/chart?cht=qr&chs=130x130&chl=${this.adminURL}">`)
      this._toggleSubmit(res.isRechoing)
    })
  }

  _toggleSubmit(flag) {
    if (flag) this.submitButton.addClass('active').text('有効中')
    else this.submitButton.removeClass('active').text('有効にする')
  }
}
