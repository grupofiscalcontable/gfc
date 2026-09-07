/* Grupo Fiscal Contable — interacciones mínimas, sin dependencias */
(function () {
  "use strict";

  var header = document.querySelector(".header");
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  /* Sombra del header al hacer scroll */
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menú móvil */
  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 940) setMenu(false);
    });
  }

  /* Acordeón de FAQ */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* Formulario: componer correo con mailto (sitio estático) */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var cuerpo =
        "Nombre: " + (data.get("Nombre") || "") + "\n" +
        "Empresa: " + (data.get("Empresa") || "") + "\n" +
        "Correo: " + (data.get("Correo") || "") + "\n" +
        "Teléfono: " + (data.get("Telefono") || "") + "\n\n" +
        (data.get("Mensaje") || "");
      var href =
        "mailto:contador.pachuca@gmail.com" +
        "?subject=" + encodeURIComponent("Solicitud de diagnóstico — " + (data.get("Empresa") || "sitio web")) +
        "&body=" + encodeURIComponent(cuerpo);
      window.location.href = href;
    });
  }

  /* Aparición suave de tarjetas */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Año del footer */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
