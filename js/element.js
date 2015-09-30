import {QS} from './qs';
import 'greensock';
import 'greensock-scrollto';
// import scrollto from './greensock-scrollto';

let navHeight = QS('nav').clientHeight;

export function getTopOfElement(element) {
  return element.getBoundingClientRect().top + window.scrollY - navHeight;
}

export function scrollToElement(selector, time) {
  let el = QS(selector);
  let topOfElement = getTopOfElement(el);

  TweenMax.to(window, time, {
    scrollTo: topOfElement,
    autoKill: true
  });
}