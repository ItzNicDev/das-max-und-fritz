(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById('siteHeader');
  var hero = document.querySelector('.hero');

  function updateHeader() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 40);
  }
  if (header && hero) {
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var navToggleIcon = document.getElementById('navToggleIcon');
  var mainNav = document.getElementById('mainNav');

  function setNavIcon(open) {
    navToggleIcon.classList.toggle('bi-list', !open);
    navToggleIcon.classList.toggle('bi-x-lg', open);
    navToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.body.classList.toggle('nav-open', open);
  }

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    setNavIcon(false);
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      setNavIcon(open);
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* ---------- Smooth scroll cue ---------- */
  var scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', function () {
      var next = hero.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Parallax ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('.parallax'));

  function updateParallax() {
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      var speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
      var bg = el.querySelector('.parallax__bg');
      if (!bg) return;
      var offset = rect.top * speed;
      var maxOffset = rect.height * 0.15;
      offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
      bg.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateParallax();
      ticking = false;
    });
  }

  if (!reduceMotion) {
    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');

  if (lightbox) {
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var activeImages = [];
    var currentIndex = 0;

    var showCurrent = function () {
      var img = activeImages[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    };

    var openLightbox = function (images, index) {
      activeImages = images;
      currentIndex = index;
      showCurrent();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    var closeLightbox = function () {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    var showRelative = function (delta) {
      currentIndex = (currentIndex + delta + activeImages.length) % activeImages.length;
      showCurrent();
    };

    var registerGallery = function (selector) {
      var images = Array.prototype.slice.call(document.querySelectorAll(selector));
      images.forEach(function (img, index) {
        img.addEventListener('click', function () { openLightbox(images, index); });
      });
    };

    registerGallery('#masonryGrid img');
    registerGallery('.rooms__gallery img');

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', function () { showRelative(-1); });
    lightboxNext.addEventListener('click', function () { showRelative(1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showRelative(-1);
      if (e.key === 'ArrowRight') showRelative(1);
    });
  }

  /* ---------- Contact form (no backend yet: opens a prefilled email) ---------- */
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var subject = form.subject.value.trim() || 'Anfrage über die Website';
      var message = form.message.value.trim();

      var body = 'Name: ' + name + '\nE-Mail: ' + email + '\n\n' + message;
      var mailto = 'mailto:dasmaxundfritz@web.de'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;
      formNote.textContent = 'Euer E-Mail-Programm öffnet sich mit der ausgefüllten Anfrage.';
    });
  }

})();
