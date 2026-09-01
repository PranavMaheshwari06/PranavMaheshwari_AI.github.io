/* =============================================================================
   main.js — renders the page from content.js and wires up the interactions.
   You should not need to edit this file to change your content.
   ========================================================================== */

(function () {
  "use strict";

  var C = window.CONTENT;
  if (!C) {
    console.error("content.js did not load — nothing to render.");
    return;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------- tiny helpers ---------------------------- */
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function isExternal(href) {
    return /^(https?:)?\/\//i.test(href || "");
  }

  /** Builds an <a>. External links get safe rel attributes automatically. */
  function link(href, className, text) {
    var a = el("a", className, text);
    a.href = href;
    if (isExternal(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  /** Row of pill tags from an array of strings. */
  function tagRow(items) {
    var wrap = el("ul", "tags");
    (items || []).forEach(function (t) {
      wrap.appendChild(el("li", "tag", t));
    });
    return wrap;
  }

  /* -------------------------------- icons -------------------------------- */
  var ICONS = {
    email:
      '<path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/>',
    github:
      '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    x: '<path d="M4 4l16 16M20 4 4 20"/>',
    mastodon:
      '<path d="M12 3c4 0 7 1.6 7 5.5V14a4 4 0 0 1-4 4H9l-4 3v-3a4 4 0 0 1-2-3.5V8.5C3 4.6 8 3 12 3z"/><path d="M8 12V9.5a1.5 1.5 0 0 1 3 0V12m2 0V9.5a1.5 1.5 0 0 1 3 0V12"/>',
    bluesky:
      '<path d="M12 10C10 6 6 3 4 4s-1 5 0 7 5 2 8 1c3 1 7 0 8-2s1-6-1-7-6 3-7 7z"/>',
    website:
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/>',
    arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
  };

  function icon(name) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[name] || ICONS.link;
    return svg;
  }

  /* ============================== RENDERING ============================== */

  function renderMeta() {
    var m = C.meta || {};
    if (m.title) document.title = m.title;

    var desc = $("[data-meta-description]");
    if (desc && m.description) desc.setAttribute("content", m.description);

    setMeta("[data-og-title]", m.title);
    setMeta("[data-og-description]", m.description);
    setMeta("[data-og-image]", m.ogImage);

    if (m.accent) document.documentElement.style.setProperty("--accent", m.accent);
    if (m.accent2) document.documentElement.style.setProperty("--accent2", m.accent2);
  }

  function setMeta(sel, value) {
    var node = $(sel);
    if (!node) return;
    if (value) node.setAttribute("content", value);
    else node.remove();
  }

  function renderNav() {
    var nav = C.nav || {};
    var mono = $("[data-monogram]");
    if (mono) mono.textContent = nav.monogram || "";

    var list = $("[data-nav-links]");
    (nav.links || []).forEach(function (item) {
      var li = el("li");
      var a = el("a", "nav__link", item.label);
      a.href = "#" + item.target;
      a.dataset.navTarget = item.target;
      li.appendChild(a);
      list.appendChild(li);
    });

    var slot = $("[data-resume-slot]");
    if (nav.resume && nav.resume.href) {
      var btn = link(nav.resume.href, "btn btn--accent", nav.resume.label || "Resume");
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      slot.appendChild(btn);
    }
  }

  function renderHero() {
    var h = C.hero || {};
    $("[data-hero-role]").textContent = h.role || "";
    $("[data-hero-punchline]").textContent = h.punchline || "";

    var chip = $("[data-availability]");
    if (h.availability) $(".chip__text", chip).textContent = h.availability;
    else chip.remove();

    // Name: one <span> per character so each can fade in on its own delay.
    var nameEl = $("[data-hero-name]");
    var name = h.name || "";
    nameEl.setAttribute("aria-label", name);
    name.split("").forEach(function (ch, i) {
      var span = el(
        "span",
        ch === " " ? "char char--space" : "char",
        ch === " " ? "\u00A0" : ch
      );
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--char-total", name.length);
      span.style.setProperty("--char-i", i);
      span.style.animationDelay = (reduceMotion ? 0 : 220 + i * 35) + "ms";
      nameEl.appendChild(span);
    });

    var metrics = $("[data-metrics]");
    var list = h.metrics || [];
    if (list.length) {
      list.forEach(function (m) {
        var wrap = el("div", "metric");
        var dd = el("dd", "metric__value", reduceMotion ? m.value : "0");
        dd.dataset.count = m.value;
        wrap.appendChild(dd);
        wrap.appendChild(el("dt", "metric__label", m.label || ""));
        metrics.appendChild(wrap);
      });
    } else {
      metrics.remove();
    }

    var cue = $("[data-scroll-cue]");
    if (h.scrollCue) {
      $(".scroll-cue__label", cue).textContent = h.scrollCue;
    } else {
      cue.remove();
    }
  }

  function renderAbout() {
    var a = C.about || {};
    $("[data-about-heading]").textContent = a.heading || "About";

    var bio = $("[data-about-bio]");
    (a.bio || []).forEach(function (p) {
      bio.appendChild(el("p", null, p));
    });

    var skills = $("[data-about-skills]");
    (a.skills || []).forEach(function (group, i) {
      var block = el("div", "skillgroup");
      block.setAttribute("data-reveal", "");
      block.style.setProperty("--reveal-delay", i * 80 + "ms");
      block.appendChild(el("h3", "skillgroup__label", group.group));
      block.appendChild(tagRow(group.items));
      skills.appendChild(block);
    });

    renderMarquee(a.marquee);
  }

  /** Keyword band. The list is duplicated so the loop can wrap seamlessly. */
  function renderMarquee(items) {
    var band = $("[data-marquee]");
    if (!items || !items.length) {
      band.remove();
      return;
    }

    var track = $("[data-marquee-track]", band);
    for (var pass = 0; pass < 2; pass++) {
      items.forEach(function (text) {
        track.appendChild(el("span", "marquee__item", text));
      });
    }
  }

  function renderCareer() {
    var c = C.career;
    var section = $("[data-career-section]");

    if (!c || !(c.jobs || []).length) {
      section.remove();
      return;
    }

    $("[data-career-heading]").textContent = c.heading || "Career";

    var sub = $("[data-career-sub]");
    if (c.subheading) sub.textContent = c.subheading;
    else sub.remove();

    var timeline = $("[data-timeline]");

    c.jobs.forEach(function (job) {
      var li = el(
        "li",
        "tl-item" + (job.current ? " tl-item--current" : "")
      );
      li.setAttribute("data-reveal", "");

      var period = el("p", "tl-item__period", job.period || "");
      if (job.current) period.appendChild(el("span", "badge", "Now"));
      li.appendChild(period);

      var role = el("h3", "tl-item__role");
      role.appendChild(document.createTextNode((job.role || "") + " "));

      var at = el("span", "tl-item__company");

      if (job.company) {
        at.appendChild(document.createTextNode("· "));

        if (job.url) {
          at.appendChild(link(job.url, null, job.company));
        } else {
          at.appendChild(document.createTextNode(job.company));
        }
      }

      role.appendChild(at);
      li.appendChild(role);

      if (job.location) {
        li.appendChild(el("p", "tl-item__meta", job.location));
      }

      if ((job.points || []).length) {
        var ul = el("ul", "tl-item__points");

        job.points.forEach(function (p) {
          ul.appendChild(el("li", null, p));
        });

        li.appendChild(ul);
      }

      if ((job.tech || []).length) {
        li.appendChild(tagRow(job.tech));
      }

      timeline.appendChild(li);
    });

    renderEducation();
  }

  function renderEducation() {
    var e = C.education;
    var host = $("[data-education]");

    if (!e || !(e.items || []).length) {
      host.remove();
      return;
    }

    host.setAttribute("data-reveal", "");
    host.appendChild(
      el("h3", "education__heading", e.heading || "Education")
    );

    var list = el("ul", "education__list");

    e.items.forEach(function (item) {
      var li = el("li", "edu-item");

      li.appendChild(el("p", "tl-item__period", item.period || ""));
      li.appendChild(el("h4", "edu-item__title", item.title || ""));

      if (item.org) {
        li.appendChild(el("p", "edu-item__meta", item.org));
      }

      if (item.note) {
        li.appendChild(el("p", "edu-item__note", item.note));
      }

      list.appendChild(li);
    });

    host.appendChild(list);
  }

  function renderWork() {
    var w = C.work;
    var section = $("[data-work-section]");

    if (!w || !(w.projects || []).length) {
      section.remove();
      return;
    }

    $("[data-work-heading]").textContent = w.heading || "Work";

    var sub = $("[data-work-sub]");
    if (w.subheading) sub.textContent = w.subheading;
    else sub.remove();

    var grid = $("[data-work-grid]");

    w.projects.forEach(function (p, i) {
      var card = el(
        "article",
        "card" + (p.featured ? " card--featured" : "")
      );

      card.setAttribute("data-reveal", "");
      card.style.setProperty("--reveal-delay", (i % 3) * 90 + "ms");

      var top = el("div", "card__top");

      top.appendChild(el("h3", "card__title", p.title || ""));

      if (p.year) {
        top.appendChild(el("span", "card__year", p.year));
      }

      card.appendChild(top);

      if (p.blurb) {
        card.appendChild(el("p", "card__blurb", p.blurb));
      }

      if ((p.tech || []).length) {
        card.appendChild(tagRow(p.tech));
      }

      if ((p.links || []).length) {
        var foot = el("div", "card__foot");

        p.links.forEach(function (l) {
          var a = link(l.href, "card__link", l.label);

          a.setAttribute(
            "aria-label",
            l.label + " — " + (p.title || "project")
          );

          a.appendChild(icon("arrow"));
          foot.appendChild(a);
        });

        card.appendChild(foot);
      }

      grid.appendChild(card);
    });
  }

  function renderContact() {
    var c = C.contact || {};

    $("[data-contact-heading]").textContent =
      c.heading || "Contact";

    var cta = $("[data-contact-cta]");

    if (c.cta) {
      // Text wrapped in *stars* is rendered in the accent gradient.
      c.cta.split("*").forEach(function (part, i) {
        if (!part) return;

        cta.appendChild(
          i % 2
            ? el("em", null, part)
            : document.createTextNode(part)
        );
      });
    } else {
      cta.remove();
    }

    var blurb = $("[data-contact-blurb]");

    if (c.blurb) {
      blurb.textContent = c.blurb;
    } else {
      blurb.remove();
    }

    var mail = $("[data-contact-email]");
    var copy = $("[data-copy-email]");

    if (c.email) {
      mail.href = "mailto:" + c.email;
      mail.textContent = c.email;

      copy.dataset.copyEmail = c.email;
      copy.setAttribute("aria-label", "Copy email address");
    } else {
      mail.parentNode.remove();
    }

    var list = $("[data-contact-links]");

    (c.links || []).forEach(function (item, i) {
      var li = el("li");

      li.setAttribute("data-reveal", "");
      li.style.setProperty("--reveal-delay", i * 70 + "ms");

      var a = link(item.href, "sociallink");

      a.appendChild(icon(item.icon));
      a.appendChild(el("span", null, item.label));

      if (item.handle) {
        a.appendChild(
          el("span", "sociallink__handle", item.handle)
        );
      }

      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function renderFooter() {
    var f = C.footer || {};
    var year = String(new Date().getFullYear());

    $("[data-footer-copy]").textContent =
      (f.copyright || "").replace("{year}", year);

    var note = $("[data-footer-note]");

    if (f.note) {
      note.textContent = f.note;
    } else {
      note.remove();
    }
  }

  /* ============================ INTERACTIONS ============================= */

  /** Counts each hero metric up from 0 to its target once it's visible. */
  function initMetricCountUp() {
    var nodes =
      document.querySelectorAll(
        "[data-metrics] .metric__value"
      );

    if (
      !nodes.length ||
      reduceMotion ||
      !("IntersectionObserver" in window)
    )
      return;

    function animate(node) {
      var raw = node.dataset.count || "";
      var digits = raw.match(/[\d.]+/);

      if (!digits) {
        node.textContent = raw;
        return;
      }

      var target = parseFloat(digits[0]);
      var prefix = raw.slice(0, digits.index);
      var suffix =
        raw.slice(digits.index + digits[0].length);

      var start = performance.now();
      var dur = 1200;

      requestAnimationFrame(function tick(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);

        var value =
          digits[0].indexOf(".") > -1
            ? (target * eased).toFixed(1)
            : Math.round(target * eased);

        node.textContent =
          prefix + value + suffix;

        if (t < 1) {
          requestAnimationFrame(tick);
        }
      });
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          animate(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  /** Click-to-copy for the contact email. */
  function initCopyEmail() {
    var btn = $("[data-copy-email]");
    if (!btn) return;

    var label = $(".copy-btn__label", btn);
    var defaultLabel = label.textContent;

    btn.addEventListener("click", function () {
      var email = btn.dataset.copyEmail;

      var done = function () {
        label.textContent = "Copied";
        btn.classList.add("is-done");

        setTimeout(function () {
          label.textContent = defaultLabel;
          btn.classList.remove("is-done");
        }, 1600);
      };

      if (
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        navigator.clipboard
          .writeText(email)
          .then(done, done);
      } else {
        done();
      }
    });
  }

  /** Live HH:MM clock in the footer, in the timezone set in content.js. */
  function initClock() {
    var node = $("[data-clock]");
    var zone =
      C.footer && C.footer.timezone;

    if (!node) return;

    if (!zone) {
      node.remove();
      return;
    }

    var fmt;

    try {
      fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: zone,
      });
    } catch (err) {
      node.remove();
      return;
    }

    var short =
      zone.split("/").pop().replace(/_/g, " ");

    function tick() {
      node.textContent =
        fmt.format(new Date()) +
        " \u00B7 " +
        short;
    }

    tick();
    setInterval(tick, 30000);
  }

  /** Nav reading-progress bar + the glowing line that grows down the timeline. */
  function initProgressBars() {
    var navBar = $("[data-progress]");
    var tlLine =
      $("[data-timeline-progress]");

    var tlWrap =
      tlLine
        ? tlLine.closest(".timeline-wrap")
        : null;

    if (!navBar && !tlLine) return;

    var ticking = false;

    function update() {
      ticking = false;

      if (navBar) {
        var doc = document.documentElement;
        var max =
          doc.scrollHeight - doc.clientHeight;

        navBar.style.transform =
          "scaleX(" +
          (max > 0
            ? window.scrollY / max
            : 0) +
          ")";
      }

      if (tlLine && tlWrap) {
        var r =
          tlWrap.getBoundingClientRect();

        var viewH = window.innerHeight;

        var visible =
          Math.min(
            r.height,
            Math.max(
              0,
              viewH * 0.7 - r.top
            )
          );

        tlLine.style.height =
          Math.max(
            0,
            Math.min(r.height, visible)
          ) + "px";
      }
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      update
    );

    update();
  }

  /** A small ring that trails the cursor and grows over links/buttons. */
  function initCursorRing() {
    if (
      reduceMotion ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;

    var ring =
      $("[data-cursor-ring]");

    if (!ring) return;

    var x = 0,
      y = 0,
      rx = 0,
      ry = 0;

    var running = false;

    function frame() {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;

      ring.style.transform =
        "translate3d(" +
        rx +
        "px," +
        ry +
        "px,0)";

      if (
        Math.abs(x - rx) > 0.3 ||
        Math.abs(y - ry) > 0.3
      ) {
        requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        x = e.clientX;
        y = e.clientY;

        ring.classList.add("is-on");

        ring.classList.toggle(
          "is-hot",
          !!e.target.closest(
            "a, button, .tag"
          )
        );

        if (!running) {
          running = true;
          requestAnimationFrame(frame);
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "pointerleave",
      function () {
        ring.classList.remove("is-on");
      }
    );
  }

  /** Typewriter that cycles through hero.rotating. */
  function initRotator() {
    var phrases =
      (C.hero && C.hero.rotating) || [];

    var out =
      $("[data-rotator-text]");

    var wrap =
      $("[data-rotator]");

    if (!phrases.length) {
      wrap.remove();
      return;
    }

    wrap.setAttribute(
      "aria-label",
      phrases.join(". ")
    );

    if (reduceMotion) {
      out.textContent = phrases[0];
      return;
    }

    var i = 0;
    var pos = 0;
    var deleting = false;

    (function tick() {
      var full = phrases[i];

      pos += deleting ? -1 : 1;

      out.textContent =
        full.slice(0, pos);

      var delay =
        deleting ? 34 : 62;

      if (
        !deleting &&
        pos === full.length
      ) {
        deleting = true;
        delay = 1800;
      } else if (
        deleting &&
        pos === 0
      ) {
        deleting = false;

        i =
          (i + 1) %
          phrases.length;

        delay = 380;
      }

      setTimeout(tick, delay);
    })();
  }

  /** Mobile menu toggle + sticky-nav border. */
  function initNavBehaviour() {
    var bar =
      $("[data-nav]");

    var toggle =
      $("[data-nav-toggle]");

    var menu =
      $("[data-nav-menu]");

    function closeMenu() {
      menu.classList.remove("is-open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    }

    toggle.addEventListener(
      "click",
      function () {
        var open =
          menu.classList.toggle("is-open");

        toggle.setAttribute(
          "aria-expanded",
          String(open)
        );

        toggle.setAttribute(
          "aria-label",
          open
            ? "Close menu"
            : "Open menu"
        );
      }
    );

    menu.addEventListener(
      "click",
      function (e) {
        if (e.target.closest("a")) {
          closeMenu();
        }
      }
    );

    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Escape") {
          closeMenu();
        }
      }
    );

    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth >= 860) {
          closeMenu();
        }
      }
    );

    window.addEventListener(
      "scroll",
      function () {
        bar.classList.toggle(
          "is-stuck",
          window.scrollY > 12
        );
      },
      { passive: true }
    );
  }

  /** Highlights the nav link of the section currently in view. */
  function initScrollSpy() {
    var links =
      Array.prototype.slice.call(
        document.querySelectorAll(
          "[data-nav-target]"
        )
      );

    if (!links.length) return;

    var sections =
      links
        .map(function (a) {
          return document.getElementById(
            a.dataset.navTarget
          );
        })
        .filter(Boolean);

    var ticking = false;

    function update() {
      ticking = false;

      var line =
        window.scrollY +
        window.innerHeight * 0.32;

      var current = null;

      sections.forEach(function (s) {
        if (s.offsetTop <= line) {
          current = s.id;
        }
      });

      // Snap to the last section when the page is scrolled to the bottom.
      if (
        window.innerHeight +
          window.scrollY >=
        document.body.offsetHeight - 4
      ) {
        current =
          sections[
            sections.length - 1
          ].id;
      }

      links.forEach(function (a) {
        var active =
          a.dataset.navTarget ===
          current;

        a.classList.toggle(
          "is-active",
          active
        );

        if (active) {
          a.setAttribute(
            "aria-current",
            "true"
          );
        } else {
          a.removeAttribute(
            "aria-current"
          );
        }
      });
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  /** Fade/slide elements in as they enter the viewport. */
  function initReveal() {
    var items =
      document.querySelectorAll(
        "[data-reveal]"
      );

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      items.forEach(function (n) {
        n.classList.add("is-visible");
      });

      return;
    }

    var io =
      new IntersectionObserver(
        function (entries) {
          entries.forEach(
            function (entry) {
              if (
                !entry.isIntersecting
              )
                return;

              entry.target.classList.add(
                "is-visible"
              );

              io.unobserve(
                entry.target
              );
            }
          );
        },
        {
          rootMargin:
            "0px 0px -8% 0px",
          threshold: 0.12,
        }
      );

    items.forEach(function (n) {
      io.observe(n);
    });
  }

  /** Accent glow that trails the pointer, plus per-card hover light. */
  function initPointerFx() {
    if (
      reduceMotion ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;

    var glow =
      $("[data-cursor-glow]");

    var x =
      window.innerWidth / 2;

    var y =
      window.innerHeight / 2;

    var cx = x;
    var cy = y;

    var running = false;

    function frame() {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;

      glow.style.transform =
        "translate3d(" +
        cx +
        "px," +
        cy +
        "px,0)";

      if (
        Math.abs(x - cx) > 0.5 ||
        Math.abs(y - cy) > 0.5
      ) {
        requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        x = e.clientX;
        y = e.clientY;

        glow.classList.add("is-on");

        if (!running) {
          running = true;
          requestAnimationFrame(frame);
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "pointermove",
      function (e) {
        var card =
          e.target.closest(".card");

        if (!card) return;

        var r =
          card.getBoundingClientRect();

        card.style.setProperty(
          "--mx",
          e.clientX - r.left + "px"
        );

        card.style.setProperty(
          "--my",
          e.clientY - r.top + "px"
        );
      },
      { passive: true }
    );
  }

  /* -------------------------------- boot --------------------------------- */

  renderMeta();
  renderNav();
  renderHero();
  renderAbout();
  renderCareer();
  renderWork();
  renderContact();
  renderFooter();

  initRotator();
  initNavBehaviour();
  initScrollSpy();
  initReveal();
  initPointerFx();
  initMetricCountUp();
  initCopyEmail();
  initClock();
  initProgressBars();
  initCursorRing();
})();