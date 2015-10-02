import {QS} from './qs';
import {setTitle} from './utils';
import {getTitleFromPath, setPath} from './path';
import {getTopOfElement, scrollToElement} from './element';

export function handleScroll() {
  let nav = QS('nav');
  let isScrolled = window.scrollY > 0;

  if (isScrolled && nav.classList.contains('scrolled')) {
    return;
  }
  nav.classList[isScrolled ? 'add' : 'remove']('scrolled');
}

export function handleScrollToClick(ev) {
  ev.preventDefault();
  let path = ev.target.getAttribute('href');
  let title = getTitleFromPath(path);

  setTitle(title);
  setPath(path);
  QS('nav').classList.remove('open');
  scrollToElement(ev.target.getAttribute('data-scroll-to'), 1);
}

export function handleToggleNavClick(ev) {
  ev.preventDefault();
  QS('nav').classList.toggle('open');
}

export function handleResize() {
  if (window.innerWidth < 850) {
    return;
  }
  QS('nav').classList.remove('open');
}

export function handleBeforeUnload() {
  window.scrollTo(0, getTopOfElement(QS('.js-' + getHash())));
}