/* ============================================================
   DALI BEAUTY - SITE SCRIPT
   Builds product cards from js/products.js, handles the catalog
   filter, the mobile menu and fills in contact details.
   You normally do not need to edit this file.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var CATEGORY_ORDER = ["Makeup", "Skin", "Nails"];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function money(n) { return (SITE.currency || "$") + Number(n).toFixed(2); }
  function digits(s) { return String(s || "").replace(/\D/g, ""); }

  /* ---------- WhatsApp links ---------- */
  function waUrl(text) {
    return "https://wa.me/" + digits(WHATSAPP_NUMBER) + "?text=" + encodeURIComponent(text);
  }
  function orderMessage(product, shade) {
    var line = product.name + (shade ? " - " + shade : "") + " (" + money(product.price) + ")";
    return SITE.whatsappGreeting + "\n" + line;
  }

  var WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8c.1.2 1.9 2.9 4.6 4 1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"/></svg>';

  /* ---------- Product cards ---------- */
  function cardHTML(p, uid) {
    var shades = p.shades || [];
    var firstShade = shades.length ? shades[0].name : "";
    var html = '<article class="card" data-uid="' + uid + '">';
    html += '<div class="card-media">';
    if (p.badge) html += '<span class="badge">' + esc(p.badge) + "</span>";
    html += '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" width="600" height="600">';
    html += "</div>";
    html += '<h3 class="card-title">' + esc(p.name) + "</h3>";
    if (p.type) html += '<p class="card-type">' + esc(p.category) + ", " + esc(p.type) + "</p>";
    html += '<p class="card-price">' + esc(money(p.price)) + (p.size ? "<small>" + esc(p.size) + "</small>" : "") + "</p>";
    if (p.description) html += '<p class="card-desc">' + esc(p.description) + "</p>";
    if (shades.length) {
      var id = "shade-" + uid;
      html += '<div class="card-shade"><label for="' + id + '">Shade (' + shades.length + ')</label>';
      html += '<select id="' + id + '">';
      shades.forEach(function (s, i) {
        html += '<option value="' + i + '">' + esc(s.name) + "</option>";
      });
      html += "</select></div>";
    }
    html += '<a class="btn btn-primary btn-block card-order" href="' + esc(waUrl(orderMessage(p, firstShade))) +
      '" target="_blank" rel="noopener" aria-label="Order ' + esc(p.name) + ' on WhatsApp">' + WA_ICON + "Order on WhatsApp</a>";
    html += "</article>";
    return html;
  }

  function bindCard(card, p) {
    var select = $("select", card);
    if (!select) return;
    var img = $("img", card);
    var link = $(".card-order", card);
    select.addEventListener("change", function () {
      var shade = p.shades[Number(select.value)];
      if (!shade) return;
      if (shade.image) img.src = shade.image;
      img.alt = p.name + " - " + shade.name;
      link.href = waUrl(orderMessage(p, shade.name));
    });
  }

  function renderGrid(container, products, prefix) {
    container.innerHTML = products.map(function (p, i) { return cardHTML(p, prefix + "-" + i); }).join("");
    $$(".card", container).forEach(function (card, i) { bindCard(card, products[i]); });
  }

  /* ---------- Home page: bestsellers ---------- */
  var bestGrid = $("#bestsellers-grid");
  if (bestGrid) {
    var best = PRODUCTS.filter(function (p) { return p.bestseller; }).slice(0, 8);
    if (!best.length) best = PRODUCTS.slice(0, 8);
    renderGrid(bestGrid, best, "best");
  }

  /* ---------- Products page: full catalog with filter ---------- */
  var catalog = $("#catalog");
  if (catalog) {
    var groups = {};
    PRODUCTS.forEach(function (p) {
      var c = CATEGORY_ORDER.indexOf(p.category) >= 0 ? p.category : "Other";
      (groups[c] = groups[c] || []).push(p);
    });
    var cats = CATEGORY_ORDER.filter(function (c) { return groups[c]; });
    if (groups.Other) cats.push("Other");

    catalog.innerHTML = cats.map(function (c) {
      return '<section class="catalog-group" data-category="' + esc(c) + '" id="' + slugify(c) + '" aria-labelledby="h-' + slugify(c) + '">' +
        '<div class="group-head"><h2 id="h-' + slugify(c) + '">' + esc(c) + "</h2><span>" + groups[c].length + " products</span></div>" +
        '<div class="product-grid"></div></section>';
    }).join("") + '<p class="empty" id="catalog-empty" hidden>No products in this category yet.</p>';

    cats.forEach(function (c) {
      renderGrid($('.catalog-group[data-category="' + c + '"] .product-grid'), groups[c], slugify(c));
    });

    var buttons = $$(".filter-btn");
    function applyFilter(name, updateUrl) {
      var valid = name === "All" || cats.indexOf(name) >= 0;
      if (!valid) name = "All";
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.filter === name ? "true" : "false"); });
      var shown = 0;
      $$(".catalog-group").forEach(function (g) {
        var show = name === "All" || g.dataset.category === name;
        g.hidden = !show;
        if (show) shown++;
      });
      $("#catalog-empty").hidden = shown > 0;
      if (updateUrl && window.history && history.replaceState) {
        var url = name === "All" ? location.pathname : location.pathname + "?category=" + encodeURIComponent(name);
        try { history.replaceState(null, "", url); } catch (e) { /* not allowed on file:// in some browsers */ }
      }
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { applyFilter(b.dataset.filter, true); });
    });
    var param = new URLSearchParams(location.search).get("category");
    if (param) param = param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
    applyFilter(param || "All", false);
  }

  /* ---------- Fill in contact details from SITE ---------- */
  function hideRow(el) { var row = el.closest("[data-site-row]"); if (row) row.hidden = true; }

  $$("[data-wa]").forEach(function (a) {
    a.href = waUrl(SITE.whatsappGreeting.replace(/:\s*$/, ".").replace(/I would like to order\.?$/, "I have a question."));
    a.target = "_blank"; a.rel = "noopener";
  });
  $$("[data-site='phone']").forEach(function (el) {
    if (!SITE.phoneDisplay) return hideRow(el);
    el.textContent = SITE.phoneDisplay;
    if (el.tagName === "A") el.href = "tel:+" + digits(SITE.phoneDisplay || WHATSAPP_NUMBER);
  });
  $$("[data-site='whatsapp-number']").forEach(function (el) { el.textContent = SITE.phoneDisplay || ("+" + digits(WHATSAPP_NUMBER)); });
  $$("[data-site='email']").forEach(function (el) {
    if (!SITE.email) return hideRow(el);
    el.textContent = SITE.email;
    if (el.tagName === "A") el.href = "mailto:" + SITE.email;
  });
  $$("[data-site='instagram']").forEach(function (el) { if (SITE.instagram) { el.href = SITE.instagram; } else { hideRow(el); el.hidden = true; } });
  $$("[data-site='facebook']").forEach(function (el) { if (SITE.facebook) { el.href = SITE.facebook; } else { hideRow(el); el.hidden = true; } });
  $$("[data-site='address']").forEach(function (el) { if (SITE.address) { el.textContent = SITE.address; } else { hideRow(el); } });
  $$("[data-site='map']").forEach(function (el) { if (SITE.mapLink) { el.href = SITE.mapLink; } else { el.hidden = true; } });
  $$("[data-site='hours']").forEach(function (el) {
    if (!SITE.hours || !SITE.hours.length) return hideRow(el);
    el.innerHTML = SITE.hours.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
  });

  /* ---------- Header: mobile menu and current page ---------- */
  var toggle = $(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }
  var here = (location.pathname.split("/").pop() || "index.html") + location.search;
  $$(".site-nav a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
