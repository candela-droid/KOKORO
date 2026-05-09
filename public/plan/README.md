# Imágenes del módulo "Plan faseado"

Esta carpeta sirve los assets de la sección **Plan faseado** (Sections.jsx → `PlanFaseado`) del dossier KOKORO.

Coloca aquí las imágenes con estos nombres exactos para que se carguen automáticamente en cada fase:

- `fase-1.jpg` — Primer local (Local MVP). Diseño Figma usa "Dibujo mano bombilla 1".
- `fase-2.jpg` — Operación estable (Consolidación).
- `fase-3.jpg` — Segundo punto (Escala local).
- `fase-4.jpg` — KOKORO Foods consolidada (Marca completa).

Recomendación de export desde Figma: 1500–2000 px de ancho, formato JPG (calidad 80) o WebP. El componente las renderiza con `object-fit: cover` dentro de un contenedor con `border-radius: 12px` y `aspect-ratio` adaptativa, por lo que basta con que el sujeto principal esté centrado.

Si una imagen falta o falla al cargar, la sección muestra un placeholder con el texto "imagen pendiente" y el resto del módulo sigue funcionando con normalidad.
