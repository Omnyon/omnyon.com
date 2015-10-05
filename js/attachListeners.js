import {QS} from './qs'
import {handleFormChange, handleScrollToClick, handleToggleNavClick, handleSelectSelect, handleScroll, handleResize, handleBeforeUnload} from './handlers'
import {debounce, delegate} from './utils'

export function attachListeners () {
  document.addEventListener('click', delegate(handleScrollToClick, '[data-scroll-to]'))
  QS('.nav-button').addEventListener('click', handleToggleNavClick)
  QS('.js-contact select').addEventListener('input', handleSelectSelect)
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', debounce(handleResize), 1000)
  window.addEventListener('beforeunload', handleBeforeUnload)
  QS('.js-contact form').addEventListener('input', handleFormChange)
}