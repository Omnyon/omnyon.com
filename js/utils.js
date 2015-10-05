import {QSA} from './qs'

let requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
}())

export const requestAnimationFrame = window::requestAnimFrame

export function matchesSelector (el, selector) {
  let p = Element.prototype
  let f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
    return [].indexOf.call(QSA(s), this) !== -1
  }

  return f.call(el, selector)
}

export function delegate (fn, selector) {
  return function (event) {
    if (!matchesSelector(event.target, selector)) {
      return
    }
    fn.call(event.target, event)
  }
}

export function debounce (func, wait, immediate) {
  let timeout

  return function debounced () {
    let context = this
    let args = arguments
    let later = function later () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    let callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}

export function setTitle (title) {
  document.title = 'Omnyon | ' + title
}