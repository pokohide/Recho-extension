const match_page = (url) => {
  const regs = [
    /https:\/\/www\.slideshare\.net\/.*/,
    /https:\/\/speakerdeck\.com\/.*/
  ]
  for (let i = 0; regs.length; i++) {
    if (regs[i].test(url)) return true
  }
  return false
}

const update_button = (tabid, info) => {
  info.url && (match_page(info.url) ? chrome.pageAction.show(tabid) : chrome.pageAction.hide(tabid))
}

chrome.tabs.onUpdated.addListener(update_button)
