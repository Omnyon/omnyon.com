import {QS} from './qs';
import {drawMasks} from './slants';
import {getEvents, generateEventsHTML} from './getEvents';
import {getTitleFromPath, getPath} from './path';
import {setTitle, requestAnimationFrame} from './utils';
import {getTopOfElement, scrollToElement} from './element';
import {handleScroll} from './handlers';
import {attachListeners} from './attachListeners';

export function init() {
  drawMasks();
  getEvents().then(generateEventsHTML).then(function(html) {
    QS('.js-events ul').innerHTML = html;
  });
  if (getPath()) {
    setTitle(getTitleFromPath(getPath()));
    requestAnimationFrame(() => {
      window.scrollTo(0, getTopOfElement(QS('.js-' + getPath())));
      handleScroll();
    });
  } else {
    handleScroll();
  }
  attachListeners();
}