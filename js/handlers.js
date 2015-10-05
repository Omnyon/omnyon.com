import {QS} from './qs'
import {setTitle} from './utils'
import {getTitleFromPath, getPath, setPath} from './path'
import {getTopOfElement, scrollToElement, showHideFileInput} from './element'

export function handleScroll () {
  let nav = QS('nav')
  let isScrolled = window.scrollY > 0

  if (isScrolled && nav.classList.contains('scrolled')) {
    return
  }
  nav.classList[isScrolled ? 'add' : 'remove']('scrolled')
}

export function handleScrollToClick (ev) {
  ev.preventDefault()
  let path = ev.target.getAttribute('href')
  let title = getTitleFromPath(path)

  setTitle(title)
  setPath(path)
  QS('nav').classList.remove('open')
  scrollToElement(ev.target.getAttribute('data-scroll-to'), 1)
}

export function handleSelectSelect (ev) {
  showHideFileInput(ev.target.value !== 'Staffing')
}

export function handleToggleNavClick (ev) {
  ev.preventDefault()
  QS('nav').classList.toggle('open')
}

export function handleResize () {
  if (window.innerWidth < 850) {
    return
  }
  QS('nav').classList.remove('open')
}

export function handleBeforeUnload () {
  window.scrollTo(0, getTopOfElement(QS('.js-' + getPath())))
}

export function handleFormChange () {
  let valid = QS('.js-contact form').checkValidity()
  let button = QS('.js-contact button')

  if (!valid) {
    button.setAttribute('disabled', '')
    return
  }
  button.removeAttribute('disabled')
}