const match_page = (url) => {
  const regs = [
    /https:\/\/www\.slideshare\.net\/.*/,
    /https:\/\/speakerdeck\.com\/.*/,
    /http:\/\/qiita\.com\/Qiita\/items\/.*/
  ]
  for (let i = 0; regs.length; i++) {
    if (regs[i].test(url)) return true
  }
  return false
}

const update_button = (tabid, info) => {
  info.url && (match_page(info.url) ? chrome.pageAction.show(tabid) : chrome.pageAction.hide(tabid))
}

// chrome.tabs.onUpdated.addListener(update_button)

// このファイルは、content_script.jsからリクエストを受け取って、アドレスバーにアイコンを表示する。
chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
  chrome.pageAction.show(sender.tab.id)
  sendResponse(true)
})
