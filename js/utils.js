let requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
}())

export const QS = document::document.querySelector
export const QSA = document::document.querySelectorAll

export const requestAnimationFrame = window::requestAnimFrame

export function setTitle (title) {
  document.title = 'Omnyon | ' + title
}

export const scrollToElementForPath = (function () {
  let timer, start, factor

  return function (path, duration) {
    const slashIndex = path.includes('/') ? 1 : 0
    const selector = '.js-' + (path === '/' ? 'hero' : path.substring(slashIndex))
    let target = QS(selector).offsetTop - QS('nav').clientHeight
    let offset = window.pageYOffset
    let delta = target - window.pageYOffset
    duration = duration || 1000
    start = Date.now()
    factor = 0

    console.log(target, duration)

    if (timer) {
      clearInterval(timer)
    }

    function step () {
      let y
      factor = (Date.now() - start) / duration
      if (factor >= 1) {
        clearInterval(timer)
        factor = 1
      }
      y = factor * delta + offset
      window.scrollBy(0, y - window.pageYOffset)
    }

    timer = setInterval(step, 2)
    return timer
  }
}())

export function getPath () {
  return window.location.pathname.substring(1)
}

export function setPath (path) {
  window.history.pushState({}, '', path || '/')
}

export function getTitleFromPath (path) {
  let index = path.indexOf('/')

  if (path === '/') {
    return 'Home'
  }
  return path.charAt(index + 1).toUpperCase() + path.substring(index + 2)
}