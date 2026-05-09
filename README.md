# KOKORO — Pitch deck web

Web multi-página que sirve como dossier comercial / pitch deck oficial de **KOKORO Foods**.
Pensada para presentar el proyecto a inversores y partners, con un modo presentación tipo deck integrado y descarga directa del PDF original.

## Stack

- **React 18 + Vite** — proyecto ligero, hot-reload instantáneo.
- **Framer Motion** — animaciones de scroll editoriales (fade / reveal por palabra).
- **Lenis** — smooth-scroll cinematográfico tipo AG1 / Nomad.
- **CSS plano con variables** — sin Tailwind, control editorial total.
- **Inter + EB Garamond** (Google Fonts) — sans para títulos, serif italic para énfasis.

## Estructura (multi-página)

```
web/
├── public/
│   ├── dossier.pdf          ← PDF original descargable
│   └── favicon.svg
├── src/
│   ├── components/          ← UI compartido (TopBar, PageFooter, RevealText…)
│   ├── data/content.js      ← TODO el texto editable de la web
│   ├── hooks/               ← useLenis, usePresentationMode
│   ├── pages/               ← HomePage, ModeloPage, MvpPage
│   ├── router.jsx           ← Mini-router client-side, sin dependencias
│   ├── sections/            ← Bloques reutilizables (Hero, Modelo, Kiosco…)
│   ├── styles/global.css    ← Sistema de diseño (variables, escala tipográfica)
│   └── main.jsx
├── index.html
├── vite.config.js
└── vercel.json
```

### Páginas

- **`/`** — La marca: Hero, ¿Por qué Kokoro?, Resumen ejecutivo, Problema, Gap, Misión, Visión, Valores, Referencias.
- **`/modelo`** — Modelo de negocio: hero compacto + Business Model Canvas completo.
- **`/mvp`** — MVP & Roadmap: Fase 0 (kiosco MVP en Madrid) + Plan a 3 años + sección de Contacto / "Hablemos".

El cambio entre páginas usa `history.pushState` (router propio en `src/router.jsx`, sin `react-router-dom`).
Para producción, `vercel.json` ya incluye un rewrite `/(.*) → /` para que las rutas funcionen al abrirlas directamente.

## Comandos

```bash
npm install           # instalar dependencias (1ª vez)
npm run dev           # arranca en http://localhost:5173
npm run build         # genera /dist optimizado para producción
npm run preview       # sirve /dist localmente para previsualizar el build
```

## Editar contenido

El **único archivo** que necesitas tocar para cambiar texto es:
`src/data/content.js`. Está organizado por secciones (resumen, problema, misión, kiosco…) con el contenido extraído del PDF y del HTML originales.

## Modo presentación

- Pulsa **`P`** en cualquier momento para entrar/salir del modo deck.
- También hay un botón flotante **"Presentar"** abajo a la derecha.
- Dentro del modo:
  - **`→`** o **espacio** → siguiente slide
  - **`←`** o **shift+espacio** → anterior
  - **`Esc`** → salir

## Deploy en Vercel

1. Sube el repo a GitHub.
2. En Vercel: New Project → importa el repo.
3. Vercel detecta Vite automáticamente (ya hay `vercel.json`).
4. Apunta el dominio `kokorofoods.com` (o el que elijas) en *Settings → Domains*.

## Próximos pasos sugeridos

- Sustituir `dossier.pdf` por la versión final cuando esté lista.
- Añadir favicon definitivo y `og-image.png` en `/public` para previsualizaciones de redes.
- Configurar **Resend** o **Formspree** si se quiere formulario de contacto en lugar de mailto.
- Añadir sección **Equipo** cuando esté el dato.
