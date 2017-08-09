const randomStr = (length = 32) => {
  let s = ''
  for (let i = 0; i < length; i++) {
    const random = Math.random() * 16 | 0
    s += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16)
  }
  return s
}

const removeURL = (str) => {
  const regexp = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g
  const link_remove = (_) => {
    return ''
  }
  return str.replace(regexp, link_remove)
}

const randomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16)
}

module.exports = {
  randomStr,
  removeURL,
  randomColor,
}
