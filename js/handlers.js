import {QS} from './utils'

export function handleScroll () {
  let nav = QS('nav')
  let isScrolled = window.scrollY > 0

  if (isScrolled && nav.classList.contains('scrolled')) {
    return
  }
  nav.classList[isScrolled ? 'add' : 'remove']('scrolled')
}

export function handleResize () {
  if (window.innerWidth < 850) {
    return
  }
  QS('nav').classList.remove('open')
}