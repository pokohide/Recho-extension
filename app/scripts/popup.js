import $ from 'jquery'
import PopupManager from './manager/popup'

const $submitButton = $('#submit-button')
const $hashInput = $('#hashtag-input')
const $dirInput = $('#direction-input')

const ACTIVATE = 'Activate'
const INACTIVATE = 'Inactivate'

$(function() {
  const manager = new PopupManager()

  const enableStream = () => {
    const hashtag = $hashInput.val()
    const direction = $dirInput.val()

    chrome.storage.local.set({
      recho_hashtag  : hashtag,
      recho_direction: direction
    })

    $submitButton.addClass('loading')
    manager.send({ method: 'recho', hashtag: hashtag, direction: direction }, (res) => {
      $submitButton.addClass('active').removeClass('loading').text(INACTIVATE)
    })
  }

  const disableStream = () => {
    $submitButton.addClass('loading')
    manager.send({ method: 'disrecho' }, (res) => {
      $submitButton.removeClass('active').removeClass('loading').text(ACTIVATE)
    })
  }

  $dirInput.on('change', (e) => {
    const dir = $dirInput.val()
    manager.send({ method: 'update', dir: dir }, (res) => {
      chrome.storage.local.set({ recho_direction: dir })
    })
  })

  $submitButton.on('click', (e) => {
    e.preventDefault()
    const isRecho = $submitButton.hasClass('active')
    console.log('isRecho', isRecho)

    if (isRecho) disableStream()
    else enableStream()
  })
})
