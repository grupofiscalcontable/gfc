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

## Configurar el formulario de contacto (Web3Forms)

El formulario envía los datos a **Web3Forms** (gratis, ilimitado) y te llegan por correo.
Falta un paso: pegar tu *Access Key*.

1. Entra a **https://web3forms.com**, escribe `contador.pachuca@gmail.com` en
   *"Create Access Key"* y revisa tu bandeja: recibirás una clave con formato
   `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
2. En `index.html`, busca `REEMPLAZAR-CON-TU-ACCESS-KEY` (dentro del `<form id="contactForm">`)
   y sustitúyelo por esa clave:
   ```html
   <input type="hidden" name="access_key" value="tu-clave-aqui">
   ```
3. Sube el cambio (`git push`). Envía una prueba desde el sitio y confirma que llega
   el correo. Los envíos también quedan en el panel de web3forms.com.

Detalles:

- Al enviar, el visitante ve un mensaje de "gracias" sin salir de la página (vía JavaScript).
  Sin JavaScript, Web3Forms muestra su propia página de confirmación.
- El correo destino **no aparece en el HTML** (solo la Access Key), así que hay menos spam.
- Ya incluye honeypot anti-bots (`botcheck`). Para añadir reCAPTCHA/hCaptcha, sigue la
  documentación de Web3Forms.
- Para cambiar el correo que recibe los avisos: se hace desde el panel de Web3Forms, o
  añade `<input type="hidden" name="to" value="otro@correo.com">` (requiere plan con
  varios destinatarios).

## Créditos de imágenes

Fotografías de stock con licencia libre (uso comercial sin atribución obligatoria):

- Hero, "El reto" — [Unsplash](https://unsplash.com/).
- Nosotros — foto de [Pexels](https://www.pexels.com/es-es/foto/gente-negocio-colaboracion-acuerdo-7651924/).

Sustitúyelas por fotos reales del despacho cuando estén disponibles (mismos nombres de
archivo en `assets/img/`, o regenera los `.webp` a los anchos 900/600 y 1600/1000/640).
