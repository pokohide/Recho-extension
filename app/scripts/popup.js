import $ from 'jquery'

const $submitButton = $('#submit-button')
const $hashInput = $('#hashtag-input')
const $dirInput = $('#direction-input')

const sendMessage = (message, cb) => {
  // 取得するタブの条件
  const queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  }
  chrome.tabs.query(queryInfo, (result) => {
    const currentTab = result.shift()
    chrome.tabs.sendMessage(currentTab.id, message, (res) => {
      cb(res)
    })
  })
}

const toggleButton = (flag) => {
  if (flag) {
    $('#submit-button').addClass('active').text('有効中')
  } else {
    $('#submit-button').removeClass('active').text('有効にする')
  }
}

const enableStrem = () => {
  const hashtag = $hashInput.val()
  const direction = $dirInput.val()

  chrome.storage.local.set({
    recho_hashtag: hashtag,
    recho_direction: direction
  })

  $submitButton.addClass('loading')
  sendMessage({ method: "recho", hashtag }, (res) => {
    $submitButton.addClass('active').removeClass('loading').text('有効中')
  })
}

const disableStream = () => {
  $submitButton.addClass('loading')
  sendMessage({ method: "disrecho" }, (res) => {
    $submitButton.removeClass('active').removeClass('loading').text('有効にする')
  })
}

/* Init */
chrome.storage.local.get(['recho_hashtag', 'recho_direction'], (items) => {
  $hashInput.val(items.recho_hashtag)
  $dirInput.val(items.recho_direction)
})

$(function() {
  $submitButton.addClass('loading').addClass('disabled')
  sendMessage({ method: 'isRechoing' }, (res) => {
    $submitButton.removeClass('loading').removeClass('disabled')
    toggleButton(res)
  })

  $dirInput.on('change', function(e) {
    const dir = $dirInput.val()
    sendMessage({ method: "update", dir }, (res) => {
      chrome.storage.local.set({
        recho_direction: dir
      })
    })
  })

  $submitButton.on('click', function(e) {
    e.preventDefault()
    const isRecho = $submitButton.hasClass('active')
    // active = trueなら有効中という事。つまりdisableStreamする意味

    if (isRecho) {
      disableStream()
    } else {
      enableStrem()
    }
  })
})
