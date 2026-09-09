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

  /* Formulario de contacto: envío AJAX a Formspree sin salir de la página.
     Sin JavaScript, el navegador hace el POST normal y Formspree muestra
     su propia página de confirmación. */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form) {
    var defaultNote = status ? status.innerHTML : "";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (status) { status.textContent = "Enviando su solicitud…"; status.style.color = ""; }
      if (btn) { btn.disabled = true; }

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (r) {
          return r.json().then(function (j) { return { ok: r.ok, j: j }; }, function () { return { ok: r.ok, j: {} }; });
        })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (status) {
              status.textContent = "¡Gracias! Recibimos su solicitud y un contador del despacho le contactará pronto.";
              status.style.color = "#2c7a3f";
            }
          } else {
            var msg = res.j && res.j.errors && res.j.errors.length
              ? res.j.errors.map(function (x) { return x.message; }).join(" ")
              : "error";
            throw new Error(msg);
          }
        })
        .catch(function () {
          if (status) {
            status.innerHTML =
              "No se pudo enviar el formulario. Escríbanos directamente a " +
              '<b><a href="mailto:contador.pachuca@gmail.com">contador.pachuca@gmail.com</a></b>.';
            status.style.color = "#b3261e";
          }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; }
          if (status) {
            setTimeout(function () {
              status.innerHTML = defaultNote;
              status.style.color = "";
            }, 12000);
          }
        });
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
