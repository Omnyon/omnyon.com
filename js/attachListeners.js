import {QS} from './qs';
import {handleScrollToClick, handleToggleNavClick, handleScroll, handleResize, handleBeforeUnload} from './handlers';
import {debounce, delegate} from './utils';

export function attachListeners() {
  document.addEventListener('click', delegate(handleScrollToClick, '[data-scroll-to]'));
  QS('.nav-button').addEventListener('click', handleToggleNavClick);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', debounce(handleResize), 1000);
  window.addEventListener('beforeunload', handleBeforeUnload);
}