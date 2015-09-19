(function() {
  'use strict';
  let QS = document::document.querySelector;
  let nav = document.querySelector('nav');
  let navHeight = nav.clientHeight;
  // shim layer with setTimeout fallback
  let requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  let handleScroll = function handleScroll() {
    changeHeaderColor(window.scrollY > 0);
  };
  let changeHeaderColor = function changeHeaderColor(isScrolled) {
    if (isScrolled && nav.classList.contains('scrolled')) {
      return;
    }
    nav.classList[isScrolled ? 'add' : 'remove']('scrolled');
  };
  let getHash = function getHash() {
    return window.location.hash.substring(1);
  };
  let setHash = function setHash(hash) {
    window.location.hash = hash.substring(1);
  };
  let getTopOfElement = function getTopOfElement(el) {
    return el.getBoundingClientRect().top + window.scrollY - navHeight;
  };
  let scrollToElement = function scrollToElement(selector, time) {
    let el = document.querySelector(selector);
    let topOfEl = getTopOfElement(el);

    TweenMax.to(window, time, {
      scrollTo: {
        y: topOfEl,
        autoKill: true
      }
    });
  };
  let handleResize = function handleResize() {
    if (window.innerWidth > 850) {
      nav.classList.remove('open');
    }
  };
  let debounce = function debounce(func, wait, immediate) {
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
  };

  [...document.querySelectorAll('[data-scroll-to]')].forEach(function forEachDataScrollTo(el) {
    el.addEventListener('click', function onClick(ev) {
      ev.preventDefault();
      setHash(ev.target.getAttribute('href'));
      nav.classList.remove('open');
      scrollToElement(ev.target.getAttribute('data-scroll-to'), 1);
    });
  });

  document.querySelector('.nav-button').addEventListener('click', function navClick(ev) {
    ev.preventDefault();
    nav.classList.toggle('open');
  });

  if (getHash()) {
    requestAnimFrame(function() {
      window.scrollTo(0, getTopOfElement(QS('.js-' + getHash())));
      handleScroll();
    });
  } else {
    handleScroll();
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', debounce(handleResize, 1000));
  window.addEventListener('beforeunload', function() {
    window.scrollTo(0, getTopOfElement(QS('.js-' + getHash())));
  });
}());