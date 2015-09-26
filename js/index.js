(function() {
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
      App.nav = App.QS('nav');
      App.navHeight = App.nav.clientHeight;
      App.getEvents();
      if (App.getHash()) {
        App.setTitle(App.getTitleFromHash(App.getHash()));
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
      [...App.QSA('[data-scroll-to]')].forEach(function(element) {
        element.addEventListener('click', App.handleScrollToClick);
      });
      App.QS('.nav-button').addEventListener('click', function(ev) {
        ev.preventDefault();
        App.nav.classList.toggle('open');
      });
      App.QS('.select-arrow').addEventListener('click', function(ev) {
        ev.preventDefault();
        let node = ev.target.parentNode.querySelector('select');
        let mdEvent = document.createEvent('MouseEvents');

        if (!node) {
          return;
        }

        mdEvent.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        node.dispatchEvent(mdEvent);
      });
      window.addEventListener('scroll', App.handleScroll);
      window.addEventListener('resize', App.debounce(App.handleResize), 1000);
      window.addEventListener('beforeunload', App.handleBeforeUnload);
    },
    getEvents() {
      fetch('events.json').then((res) => res.json()).then(function(json) {
        let html = json.events.map(function(event) {
          return `<li>${event.date} ${event.time} @ <a href="${event.uri}">${event.location}</a></li>`;
        }).join('');

        App.QS('.js-events ul').innerHTML = html;
      });
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
    setTitle(title) {
      document.title = 'Omnyon | ' + title;
    },
    getHash() {
      return window.location.hash.substring(1);
    },
    setHash(hash) {
      window.history.pushState({}, '', hash || '/');
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
      let hash = ev.target.getAttribute('href');
      let title = App.getTitleFromHash(hash);

      App.setTitle(title);
      App.setHash(hash);
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
    getTitleFromHash(hash) {
      if (!hash) {
        return 'Home';
      }

      let index = hash.indexOf('#');

      return hash.charAt(index + 1).toUpperCase() + hash.substring(index + 2);
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
}());