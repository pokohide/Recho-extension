import Flowly from 'flowly-js'
import io from 'socket.io-client'
import $ from 'jquery'

const API_URL = 'https://recho-api.herokuapp.com'
var flowly = new Flowly('.slide_container')
let isRechoing = false

/******************************************************/
const connect = (socket) => {
  if (socket) return socket
  socket = io(API_URL)
  socket.on('tweet', tweetHandler)
  socket.on('like', likeHandler)
  return socket
}

const tweetHandler = (tweet) => {
  console.log(tweet)
  const size = 40 + 12 / tweet.length
  const color = randomColor()
  const text = removeURL(tweet)
  flowly.addText({ body: text, size: size, color: color })
}

// ハッシュタグを含むツイートがいいねされた時にいいね！をランダムで表示したい
const likeHandler = (like) => {
  console.log(like)
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

const createStream = (socket, params) => {
  isRechoing = true
  socket.emit('recho', params)
}

const deleteStream = (socket, params) => {
  isRechoing = false
  socket.emit('disrecho', params)
}

/******************************************************/
let socket = connect(socket)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.method) {
    case 'update':
      console.log(request.dir)
      flowly.update({ direction: request.dir })
      sendResponse(true)
      break
    case 'isRechoing':
      sendResponse(isRechoing)
      break
    case 'recho':
      createStream(socket, { hashtag: request.hashtag })
      sendResponse(true)
      break
    case 'disrecho':
      deleteStream(socket, {})
      sendResponse(true)
      break
    default:
      break
  }
})
