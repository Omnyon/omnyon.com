import {init} from './init';

init();

/* (function() {
  'use strict';
  let App = {
    QS: document::document.querySelector,
    QSA: document::document.querySelectorAll,
    nav: null,
    navHeight: null,
    requestAnimationFrame: window::(function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    }()),
    init() {
      if (App.getHash()) {
        App.requestAnimationFrame(function() {
          window.scrollTo(0, App.getTopOfElement(App.QS('.js-' + App.getHash())));
          App.handleScroll();
        });
      } else {
        App.handleScroll();
      }
      App.attachListeners();
    },
    attachListeners() {
      App.nav = App.QS('nav');
      App.navHeight = App.nav.clientHeight;
      [...App.QSA('[data-scroll-to]')].forEach(function(element) {
        element.addEventListener('click', App.handleScrollToClick);
      });
      App.QS('.nav-button').addEventListener('click', function(ev) {
        ev.preventDefault();
        App.nav.classList.toggle('open');
      });
      window.addEventListener('scroll', App.handleScroll);
      window.addEventListener('resize', App.debounce(App.handleResize), 1000);
      window.addEventListener('beforeunload', App.handleBeforeUnload);
    },
    handleScroll() {
      App.changeHeaderColor(window.scrollY > 0);
    },
    changeHeaderColor(isScrolled = false) {
      if (isScrolled && App.nav.classList.contains('scrolled')) {
        return;
      }
      App.nav.classList[isScrolled ? 'add' : 'remove']('scrolled');
    },
    getHash() {
      return window.location.hash.substring(1);
    },
    setHash(hash) {
      window.location.hash = hash.substring(1);
    },
    getTopOfElement(element) {
      return element.getBoundingClientRect().top + window.scrollY - App.navHeight;
    },
    scrollToElement(selector, time) {
      let el = App.QS(selector);
      let topOfElement = App.getTopOfElement(el);

      TweenMax.to(window, time, {
        scrollTo: topOfElement,
        autoKill: true
      });
    },
    handleScrollToClick(ev) {
      ev.preventDefault();
      App.setHash(ev.target.getAttribute('href'));
      App.nav.classList.remove('open');
      App.scrollToElement(ev.target.getAttribute('data-scroll-to'), 1);
    },
    handleResize() {
      if (window.innerWidth < 850) {
        return;
      }
      App.nav.classList.remove('open');
    },
    handleBeforeUnload() {
      window.scrollTo(0, App.getTopOfElement(App.QS('.js-' + getHash())));
    },
    debounce(func, wait, immediate) {
      let timeout;

      return function debounced() {
        let context = this;
        let args = arguments;
        let later = function later() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        let callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
    }
  };

  App.init();
}());*/