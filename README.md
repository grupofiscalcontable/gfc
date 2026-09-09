# Grupo Fiscal Contable — Landing page

Landing page profesional de una sola página para el despacho **Grupo Fiscal Contable**
(Pachuca de Soto, Hidalgo). Estática, sin dependencias ni framework: HTML + CSS + un
archivo JS pequeño.

## Estructura

```
landing/
├── index.html            Página completa (todas las secciones)
├── css/styles.css         Estilos (tokens, responsive, dark navy + oro)
├── js/main.js             Menú móvil, acordeón FAQ, formulario mailto, animaciones
├── site.webmanifest       PWA / icono en pantalla de inicio
├── robots.txt             Indexación abierta + referencia al sitemap
├── sitemap.xml            1 URL
└── assets/
    ├── logo.svg           Imagotipo (badge + texto) para fondo claro
    ├── logo-light.svg     Imagotipo para fondo oscuro (footer)
    ├── favicon.svg        Isotipo (marca sola)
    ├── favicon-32.png · apple-touch-icon.png · icon-192.png · icon-512.png
    ├── img/og-image.jpg   Imagen para redes sociales (1200×630)
    └── img/*.webp          Fotos optimizadas (hero, "el reto", nosotros) con srcset
```

## Contenido

La información proviene de `../SERVICIOS GENERALES v5.pptx`:

- **Hero** — propuesta de valor + alcance del despacho.
- **El reto** — operar en un entorno altamente fiscalizado.
- **Servicios** — las 11 áreas: cumplimiento fiscal (SAT), defensa fiscal, IMSS e
  INFONAVIT, REPSE, comercio exterior, precios de transferencia, impuestos estatales,
  auditoría y dictámenes, PLD, consultoría CFO y servicios complementarios.
- **Sectores** — industrias del corredor CDMX–Pachuca.
- **Metodología** — 4 pasos + modelos de servicio.
- **Nosotros** — misión, visión y valores.
- **Contacto** — datos del despacho + formulario.
- **FAQ** — 6 preguntas (también en JSON-LD).

## SEO y rendimiento

- HTML semántico, un solo `<h1>`, `lang="es-MX"`.
- `<meta description>`, canonical, Open Graph y Twitter Card.
- **JSON-LD** con `@graph`: `AccountingService` / `LocalBusiness` (dirección, correo,
  zona de servicio, catálogo de servicios), `WebSite` y `FAQPage`.
- Imágenes en **WebP** con `srcset`/`sizes`, `width`/`height` (evita CLS),
  `loading="lazy"` salvo el hero (`fetchpriority="high"` + `<link rel="preload">`).
- Sin fuentes web externas (stack del sistema) y sin librerías → carga muy rápida en
  móvil, tablet y escritorio.
- `robots.txt` + `sitemap.xml`.

## Publicar

Es un sitio estático: sirve la carpeta tal cual.

- **Prueba local:** `python -m http.server 8000` dentro de `landing/` y abre
  `http://localhost:8000`.
- **GitHub Pages:** sube el contenido de `landing/` a la rama que publique Pages.

### Dominio de producción

`https://grupofiscalcontable.github.io/gfc/` (repositorio `grupofiscalcontable/gfc`,
GitHub Pages sirviendo `/` — sube el contenido de `landing/` a la raíz del repo).

Si el dominio cambia, reemplázalo en:

1. `index.html` → `<link rel="canonical">`, etiquetas `og:*` / `twitter:*`, los `@id`
   / URLs y el `sameAs` del bloque JSON-LD.
2. `robots.txt` → línea `Sitemap:`.
3. `sitemap.xml` → `<loc>`.

Los datos de contacto (dirección, correo `contador.pachuca@gmail.com`) también viven en
`index.html` y en el JSON-LD; actualízalos en ambos lugares si cambian.

## Formulario de contacto (Formspree)

El formulario (`<form id="contactForm">` en `index.html`) envía los datos a **Formspree**:

```
action="https://formspree.io/f/mbgjqkgo"
```

- El destinatario y los ajustes (asunto, autorespuesta, reCAPTCHA, dominios permitidos)
  se configuran en el panel de **formspree.io** → proyecto `mbgjqkgo`.
- Al enviar, el visitante ve *"¡Gracias!…"* sin salir de la página (JavaScript en
  `js/main.js`). Sin JavaScript, Formspree muestra su propia página de confirmación.
- Campos que se envían: `nombre`, `empresa`, `email`, `telefono`, `mensaje`, más
  `_subject` (asunto del correo). Incluye honeypot `_gotcha` anti-spam.
- Plan gratis de Formspree: 50 envíos/mes. Los envíos quedan archivados en el panel.
- **Primer envío:** Formspree manda un correo de confirmación para activar el buzón;
  hay que hacer clic una vez.
- Para cambiar de proveedor o de ID, edita `action=` en el `<form>`. Si cambias de
  proveedor, revisa el manejo de la respuesta en `js/main.js` (Formspree responde
  `{ "ok": true }` en éxito y `{ "errors": [...] }` en error).

## Créditos de imágenes

Fotografías de stock con licencia libre (uso comercial sin atribución obligatoria):

- Hero, "El reto" — [Unsplash](https://unsplash.com/).
- Nosotros — foto de [Pexels](https://www.pexels.com/es-es/foto/gente-negocio-colaboracion-acuerdo-7651924/).

Sustitúyelas por fotos reales del despacho cuando estén disponibles (mismos nombres de
archivo en `assets/img/`, o regenera los `.webp` a los anchos 900/600 y 1600/1000/640).
