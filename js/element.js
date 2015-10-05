import {QS} from './qs'
import 'greensock'
import 'greensock-scrollto'

let navHeight = QS('nav').clientHeight

export function getTopOfElement (element) {
  return element.getBoundingClientRect().top + window.scrollY - navHeight
}

export function scrollToElement (selector, time) {
  let el = QS(selector)
  let topOfElement = getTopOfElement(el)

  TweenLite.to(window, time, {
    scrollTo: topOfElement,
    autoKill: true
  })
}

export function showHideFileInput (shouldHide) {
  let fileInput = QS('.js-contact .file-input-wrapper')

  fileInput.classList[shouldHide ? 'add' : 'remove']('hidden')
}