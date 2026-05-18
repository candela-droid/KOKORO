// Contenido extraído del dossier oficial (PDF) + dossier comercial (HTML)
// Editar aquí cambia el contenido de toda la web sin tocar componentes.

export const brand = {
  name: 'KOKORO',
  tagline: 'Comida real para todos los cuerpos',
  subtitle: 'Specialty Coffee & Conscious Food',
  city: 'Madrid',
  year: '2026',
};

export const sections = [
  { id: 'hero', label: '00 · Inicio' },
  { id: 'kokoro', label: '01 · Por qué Kokoro' },
  { id: 'resumen', label: '02 · Resumen ejecutivo' },
  { id: 'problema', label: '03 · Problema' },
  { id: 'gap', label: '04 · Por qué no está resuelto' },
  { id: 'mision', label: '05 · Misión' },
  { id: 'vision', label: '06 · Visión' },
  { id: 'valores', label: '07 · Valores' },
  { id: 'modelo', label: '08 · Modelo de negocio' },
  { id: 'kiosco', label: '09 · Fase 0 — primer local' },
  { id: 'fases', label: '10 · Plan a 2 años' },
  { id: 'referencias', label: '11 · Referencias' },
  { id: 'contacto', label: '12 · Contacto' },
];

export const kokoroMeaning = {
  jp: '心',
  body: 'En japonés, kokoro significa a la vez corazón, mente, alma y sentimiento — una palabra que no separa lo físico de lo emocional. Por eso da nombre a esta marca:',
  italic: ' el corazón de las cosas.',
};

/* Lead de marca usado SOLO en "Qué es" (Home Resumen, Figma 151:215).
   Estructura tras la revisión 2026-05:
     · intro — primer párrafo regular (KOKORO Foods es una marca…)
     · (gap visual de 1 línea)
     · closer — segundo párrafo regular (Trazabilidad total…)
     · italic — tercer párrafo, Instrument Serif Italic, pegado al
       closer sin gap extra (Inclusión, salud y confianza…)
   La frase italic deja de estar intercalada dentro del primer párrafo
   y pasa a ser un manifiesto-cierre en su propia línea.

   Hasta la revisión 2026-05 esta variable la consumían tanto Resumen
   (Home) como MvpIntro (/mvp). Ahora MvpIntro tiene su propio bloque
   `mvpIntro` con copy específico del MVP. */
export const ejecutivo = {
  intro:
    'KOKORO Foods es una marca premium de alimentos funcionales basada en comida real. Diseñamos cada producto para personas con alergias, intolerancias y estilos de vida conscientes — sin renunciar al sabor, al diseño ni a la seguridad.',
  closer:
    'Trazabilidad total, ingredientes limpios y una promesa clara: alimentos reales para todos los cuerpos.',
  italic: 'Inclusión, salud y confianza, sin compromisos.',
};

/* Lead específico de "Mínimo Producto Viable" (Sections > MvpIntro,
   Figma 151:212). Mismo patrón intro-dual: párrafo 1 = intro + italic
   (la frase "la primera versión física de la marca" como remate
   editorial), párrafo 2 = closer que enumera lo que el local valida.
   Reemplaza al copy genérico de marca (ejecutivo) que se compartía
   antes con "Qué es" — ahora cada sección tiene su voz. */
export const mvpIntro = {
  intro:
    'KOKORO arranca como una cafetería de specialty coffee de 10–15 m² en Madrid. No es un local y ya: es',
  italic: ' la primera versión física de la marca.',
  closer:
    'El sitio donde se valida el modelo, se generan los primeros datos reales, se construye comunidad y se demuestra el estándar KOKORO antes de escalar a retail y B2B.',
};

/* "Sobre Kokoro" — sección con tabs (Figma 104:487 / 151:192).
   Título grande a dos líneas + 4 tabs (Por qué Kokoro / Misión / Visión /
   Valores). Cada tab carga su body en formato Mona Sans 24px con frase
   en Instrument Serif italic intercalada (P1 bajó de 28px a 24px en
   la revisión 2026-05). */
export const sobreKokoro = {
  title: ['Sobre', 'Kokoro'],
  tabs: [
    {
      key: 'por-que',
      label: 'Por qué Kokoro',
      body: 'En japonés, kokoro significa a la vez corazón, mente, alma y sentimiento — una palabra que no separa lo físico de lo emocional. Por eso da nombre a esta marca:',
      italic: ' el corazón de las cosas.',
    },
    {
      key: 'mision',
      label: 'Misión',
      body: 'Crear alimentos premium, basados en comida real y libres de ultraprocesados, pensados desde el primer minuto para quien hoy come con miedo o resignación.',
      italic: ' Diseñamos cada producto con el estándar más alto en nutrición, seguridad y experiencia, para convertir el acto de comer en confianza, placer y pertenencia.',
    },
    {
      key: 'vision',
      label: 'Visión',
      body: 'Convertirnos en la marca europea de referencia en alimentación funcional libre de alérgenos. Elevar el estándar de la categoría y redefinir la relación emocional entre las personas y lo que comen.',
      italic: ' Que elegir salud nunca implique renunciar a placer, diseño ni seguridad.',
    },
    {
      key: 'valores',
      label: 'Valores',
      body: 'Honestidad. Inclusión. Excelencia. Confianza.',
      italic: ' Cuatro principios que guían cada decisión de KOKORO, desde el primer ingrediente hasta el último punto de contacto.',
    },
  ],
};

/* "Roadmap" — sección con tabs FASE 0-3 (Figma 104:516 / 151:201).
   Mismo patrón que SobreKokoro pero aplicado al plan a 2 años: del
   primer local KOKORO a la marca consolidada con producto propio y
   B2B activo. Bodies + italic alineados con la revisión de copy de
   2026-05 (KOKORO_copies.md). */
export const roadmap = {
  title: 'Roadmap',
  tabs: [
    {
      key: 'fase-0',
      label: 'Fase 0',
      body: 'Apertura del primer local en Madrid y desarrollo del blend KOKORO propio. Validación del modelo, primeras métricas reales y construcción de comunidad.',
      italic: ' El sitio donde KOKORO se vive por primera vez.',
    },
    {
      key: 'fase-1',
      label: 'Fase 1',
      body: 'Consolidación de la marca y operación estable. Primeros testeos con productos propios, empezando por las granolas.',
      italic: ' La fase donde la marca encuentra su voz definitiva.',
    },
    {
      key: 'fase-2',
      label: 'Fase 2',
      body: 'Lanzamiento oficial de la granola KOKORO al mercado e impulso al ecommerce como motor de crecimiento.',
      italic: ' El salto de un local a una marca con escala real.',
    },
    {
      key: 'fase-3',
      label: 'Fase 3',
      body: 'Expansión con nuevos lanzamientos y entrada de lleno al canal B2B.',
      italic: ' KOKORO consolidada como referente europeo en alimentación funcional inclusiva.',
    },
  ],
};

/* `problema`, `gap`, `mision`, `vision` y `valores` standalone son
   datos legacy del primer Home con TOC numerado. Los componentes que
   los consumen (Problema, Gap, Mision, Vision, Valores) NO se montan
   en ninguna ruta — el contenido vivo está en `sobreKokoro.tabs` y
   `negocio.resuelto`. Los dejamos sincronizados con la revisión de
   copy 2026-05 por si el dossier o un export PDF los lee. */
export const problema = {
  callout:
    'La categoría healthy & gourmet se construyó sobre ingredientes que excluyen a una parte enorme de la población. Vende inclusión en el discurso — la niega en la góndola.',
  bullets: [
    'Productos "healthy" con trazas o contaminación cruzada que convierten un desayuno en un riesgo real.',
    'Lo "rico y saludable" se construye sobre ingredientes que dejan fuera a alérgicos e intolerantes — sin avisar.',
    'Quien tiene restricciones termina renunciando, exponiéndose al riesgo o resignándose a opciones mediocres.',
  ],
};

export const gap = [
  'Porque la categoría premium-healthy ha crecido optimizando margen, no acceso.',
  'Porque las marcas de inclusión alimentaria suelen sacrificar diseño, sabor o estética.',
  'Porque la prevalencia de alergias e intolerancias está aumentando — sobre todo en adultos jóvenes — más rápido que la oferta capaz de atenderlas con altura.',
];

export const mision =
  'Crear alimentos premium, basados en comida real y libres de ultraprocesados, pensados desde el primer minuto para quien hoy come con miedo o resignación. Diseñamos cada producto con el estándar más alto en nutrición, seguridad y experiencia, para convertir el acto de comer en confianza, placer y pertenencia.';

export const vision =
  'Convertirnos en la marca europea de referencia en alimentación funcional libre de alérgenos. Elevar el estándar de la categoría y redefinir la relación emocional entre las personas y lo que comen. Que elegir salud nunca implique renunciar a placer, diseño ni seguridad.';

export const valores = [
  {
    glyph: '◎',
    title: 'Honestidad',
    desc: 'Trazabilidad real de cada ingrediente. Comunicación transparente. Nada que ocultar, nada que disfrazar.',
  },
  {
    glyph: '◈',
    title: 'Inclusión',
    desc: 'Comida real para todos los cuerpos. Apta para alergias, intolerancias y conciencia — por diseño, no por excepción.',
  },
  {
    glyph: '◇',
    title: 'Excelencia',
    desc: 'El estándar más alto en nutrición, sabor, textura y forma. Premium no es un adorno: es la regla.',
  },
  {
    glyph: '○',
    title: 'Confianza',
    desc: 'Cada producto pensado para que comer sea un acto seguro, placentero y consciente. La marca como promesa cumplida en cada bocado.',
  },
];

export const canvas = {
  segmentos: {
    label: 'Segmento de clientes',
    blocks: [
      {
        head: 'Mi cliente (hoy)',
        body: 'Personas con intolerancias o alergias severas que buscan llevar una alimentación alineada con sus objetivos (salud, sostenibilidad, calidad).',
      },
      {
        head: 'Nicho',
        body: 'Personas con cierto poder adquisitivo, interesadas en alimentación consciente, saludable y segura — posiblemente mujeres y hombres entre 30 y 55 años con hijos o condiciones alimentarias propias.',
      },
      {
        head: 'Distribución',
        body: 'Conseguir que terceros distribuyan nuestros productos: cafeterías de especialidad, establecimientos de comida real, etc.',
      },
    ],
  },
  propuesta: {
    label: 'Propuesta de valor',
    blocks: [
      {
        head: 'Problema',
        body: 'El mercado actual excluye a millones de personas con alergias e intolerancias alimentarias. Las opciones existentes son altamente procesadas, pobres nutricionalmente o directamente inexistentes en segmentos como snacks y productos gourmet.',
      },
      {
        head: 'Solución',
        body: 'Kokoro Foods desarrolla productos reales, funcionales y sabrosos, cuidadosamente diseñados para personas con restricciones alimentarias (alergias, intolerancias, sensibilidades). Nuestros primeros productos —granola sin frutos secos, café de especialidad— son el punto de partida para una línea inclusiva, saludable y sin atajos industriales.',
      },
      {
        head: 'Beneficios',
        body: '✦ Funcionales: seguridad alimentaria sin contaminación cruzada e ingredientes limpios.\n💪 Emocionales: confianza, tranquilidad y sensación de pertenencia al tener por fin "algo hecho para mí".\n👥 Sociales: inclusión sin resignar sabor, estética ni experiencia. Pertenecer a una marca consciente que los representa.',
      },
    ],
  },
  socios: [
    'Laboratorios o cocinas de co-manufactura con certificaciones',
    'Logística especializada (última milla, frío)',
    'Partners de pago y suscripción (Stripe, Shopify, Recharge, etc.)',
    'Nutricionistas o médicos que recomiendan el producto',
    'Embajadores con autoridad en salud, fitness o lifestyle',
  ],
  actividades: [
    'Desarrollo de producto con criterios nutricionales y sensoriales muy exigentes',
    'Certificaciones de alérgenos',
    'Branding y marketing de alto nivel',
    'Gestión logística de entregas exprés y cadena de frío',
    'Gestión del canal digital (web, suscripciones, CRM)',
  ],
  recursos: [
    'Know-how en formulación de alimentos funcionales',
    'Red de proveedores especializados',
    'Marca con identidad potente y aspiracional',
    'Plataforma tecnológica de gestión de suscripciones',
    'Red de influencers o embajadores de nicho',
  ],
  relacion: [
    'Comunicación de cercanía con un experto que cuida cada detalle',
    'Tono empático pero también estético, aspiracional y elegante',
    'Educativa y transparente: contenido sobre ingredientes, trazabilidad y cuidados reales',
    'Comunidad digital en redes, atención personalizada, newsletter con valor real, co-creación',
  ],
  canales: {
    b2c: [
      'Tienda online propia',
      'Instagram y TikTok (contenido educativo, storytelling, lanzamientos)',
      'Email marketing (newsletters con recetas, beneficios, lanzamientos)',
      'Influencers o microcreadores con restricciones alimentarias reales',
      'SEO/SEM (contenido en blog, búsqueda de productos sin alérgenos)',
      'Ferias de productos saludables, eventos de wellness o foodies',
    ],
    b2b: [
      'Hoteles boutique',
      'Concept stores',
      'Cafeterías de especialidad',
      'Clínicas de salud funcional',
    ],
  },
  costes: [
    'Producción bajo altos estándares',
    'Envíos rápidos',
    'Tecnología (hosting, CRM, mantenimiento web)',
    'Diseño, branding, packaging premium',
    'Paid media y marketing de adquisición',
    'Freelance especializado',
    'Cocina, materia prima, etc.',
  ],
  ingresos: [
    'Suscripción mensual configurable: ingreso recurrente, posiblemente el core del negocio',
    'Ventas unitarias en e-commerce: para quienes no quieren suscribirse',
    'Lanzamientos edición limitada / colaboraciones: productos especiales con ticket alto',
    'B2B selectivo: hoteles boutique, concept stores, clínicas de salud funcional',
  ],
};

/* =============================================================
   Página /modelo (Sobre el negocio) — Figma 104:425
   - Hero: pill "Business canvas" + Sobre el negocio + lead.
   - vacio (104:872): 3 cells eyebrow + body.
   - solucion (137:194): 3 cells icon + eyebrow + body.
   - revenue (137:100): 1 card grande + 2 cards apiladas.
   - ventaja (137:132): 3 items arrow + título + body.
   ============================================================= */
export const negocio = {
  hero: {
    eyebrow: 'Business canvas',
    title: 'Sobre el negocio',
    lead:
      'Propuesta de valor, segmentos, canales, costes e ingresos — la dirección estratégica que guía cada decisión de KOKORO, traducida en un modelo claro y replicable.',
  },
  /* "Por qué no está resuelto" — módulo nuevo de la página negocio (Figma
     194:2 desktop · 194:96 mobile). Mismo patrón tipográfico que los tabs
     de Sobre Kokoro: título display Host 120px a 2 líneas + body Mona Sans
     24px (3 frases que arrancan con "Porque…") + cierre Instrument Serif
     italic 24px (2 líneas). En móvil el body se compacta en un sólo
     párrafo y baja a 16px alineado con el resto de bodies del site.
     (P1 bajó de 28px a 24px en la revisión 2026-05). */
  resuelto: {
    title: ['Por qué no', 'está resuelto'],
    body: [
      'Porque la categoría premium-healthy ha crecido optimizando margen, no acceso.',
      'Porque las marcas de inclusión alimentaria suelen sacrificar diseño, sabor o estética.',
      'Porque la prevalencia de alergias e intolerancias está aumentando — sobre todo en adultos jóvenes — más rápido que la oferta capaz de atenderlas con altura.',
    ],
    italic: [
      'El mercado tiene el problema definido.',
      'Falta una marca que lo resuelva sin pedir perdón por hacerlo.',
    ],
  },
  // Split-screen físico: cada frase del vacío (izq, dark) tiene su
  // frase-espejo de respuesta (dcha, cream) en el MISMO índice del
  // array. Esa pareja por índice es la que usa PhysicsPile para el
  // mirror linking — agarrar una mueve la del otro lado en espejo.
  vacio: {
    eyebrow: 'el punto de dolor',
    /* Figma 104:872 — header propio: título grande "Situación / actual"
       a dos líneas + body Mona Sans 24px alineado a la derecha en
       columna de 508px (Figma 159:317). Body actualizado al copy
       definitivo: define la tesis (el mercado premium dejó fuera a
       millones de personas) y plantea la oportunidad que rellena
       KOKORO. */
    displayTitle: ['Situación', 'actual'],
    displayBody:
      'El mercado premium de alimentación dejó fuera a millones de personas. Lo hizo sin darse cuenta — y todavía no lo ha resuelto.',
    title: 'El vacío vs. la respuesta',
    /* Pills (Figma 104:872) — el PhysicsPile las apila desde arriba y
       el mirror linking las empareja por ÍNDICE entre left y right.
       Por eso el orden de los arrays importa: cada par i-i representa
       una transformación conceptual (problema → respuesta de KOKORO).
       Pasamos de 8 pills a 6 por lado siguiendo la revisión del
       cliente. Pairing actualizado:
         · Exclusión silenciosa  ↔  Inclusión por diseño
         · Miedo a comer         ↔  Comer sin miedo
         · Comunidad ignorada    ↔  Comunidad que ve
         · Trazas invisibles     ↔  Trazabilidad real
         · Opciones mediocres    ↔  Sabor sin compromiso
         · Industria sorda       ↔  Estándar nuevo */
    left: [
      'Exclusión silenciosa',
      'Miedo a comer',
      'Comunidad ignorada',
      'Trazas invisibles',
      'Opciones mediocres',
      'Industria sorda',
    ],
    right: [
      'Inclusión por diseño',
      'Comer sin miedo',
      'Comunidad que ve',
      'Trazabilidad real',
      'Sabor sin compromiso',
      'Estándar nuevo',
    ],
  },
  /* Solución disruptiva — versión revisada (Figma 159:318).
     Cambios respecto a la versión anterior:
       · title pasa a array a 2 líneas — "Solución / disruptiva"
       · cells dejan de ser eyebrow+body (mono uppercase + cafetería suelta)
         y pasan al patrón de filas con HR (mismo que Ventaja): title Host
         Medium 24px + body Mona Sans 20px alineado a la izquierda.
       · El campo `icon` desaparece — el nuevo diseño no lleva pictogramas
         y los bodies se han expandido a 2 líneas con más detalle.
       · El eyebrow de sección ("el producto") deja de usarse, pero lo
         mantenemos por compatibilidad con consumidores externos del data. */
  solucion: {
    eyebrow: 'el producto',
    title: ['Solución', 'disruptiva'],
    cells: [
      {
        title: 'Seguridad sin renuncias',
        body:
          'Productos funcionales y estéticos, con trazabilidad total y sin contaminación cruzada. No "para alérgicos" — sino con los alérgicos como punto de partida del diseño.',
      },
      {
        title: 'El punto de partida',
        body:
          'Una cafetería de especialidad en Madrid: el primer espacio donde el producto se prueba, la marca se vive y la comunidad se construye antes de escalar.',
      },
      {
        title: 'Alimentos con alma',
        body:
          'KOKORO es la unión entre el bienestar físico y el placer emocional de comer sin miedo. La marca traduce esa idea en cada formato, cada taza y cada caja.',
      },
    ],
  },
  /* Modelo de negocio (Figma 137:100) — antes "El motor de escala".
     Pasa de rule-block (3 cells separadas por línea vertical) a 3 GLASS
     CARDS rounded-24 con eyebrow IBM Plex Mono 16px al top y body Mona
     Sans 18px al bottom. El título ahora se renderiza centrado a 2 líneas
     "Modelo / de negocio". Bodies expandidos a párrafos más completos. */
  revenue: {
    eyebrow: 'revenue model',
    title: ['Modelo', 'de negocio'],
    main: {
      eyebrow: 'recurrencia',
      body:
        'Suscripción mensual configurable. Es el corazón del modelo: ingresos predecibles, retención alta, datos limpios sobre el cliente y un vínculo continuo que ningún canal puntual da. Es lo que convierte a KOKORO en un activo, no en un producto.',
    },
    side: [
      {
        eyebrow: 'venta directa',
        body:
          'Tienda online con ventas unitarias, lanzamientos de edición limitada y colaboraciones puntuales con ticket alto. Sirve para captar nuevos clientes, para mantener viva la conversación entre lanzamientos y para sostener el margen sin depender de retail.',
      },
      {
        eyebrow: 'b2b selectivo',
        body:
          'Distribución cuidada en hoteles boutique, concept stores, cafeterías de especialidad y clínicas de salud funcional. No buscamos volumen — buscamos contexto. Cada punto B2B funciona como un punto de marca: KOKORO se prueba antes de comprarse.',
      },
    ],
  },
  /* Nuestra ventaja (Figma 137:132 / 151:131) — versión revisada.
     Cambios respecto a la versión anterior:
       · Titles de cada fila acortados ("Activo intelectual" → "Activo",
         "Identidad aspiracional" → "Identidad", "Comunidad activa" →
         "Comunidad") para una jerarquía más limpia: una palabra fuerte
         que ancla el concepto y deja al body explicar.
       · Body alineado a la izquierda (antes a la derecha) y ocupando
         flex-1 en lugar de un ancho fijo. */
  ventaja: {
    eyebrow: 'activos estratégicos',
    title: 'Nuestra ventaja',
    items: [
      {
        title: 'Activo',
        body:
          'Know-how propio en formulación de alimentos funcionales con criterios sensoriales exigentes.',
      },
      {
        title: 'Identidad',
        body:
          'Una marca con identidad potente que transforma la restricción alimentaria en un estilo de vida elegante.',
      },
      {
        title: 'Comunidad',
        body:
          'Red de embajadores de nicho y una plataforma tecnológica preparada para la gestión masiva de suscripciones.',
      },
    ],
  },
};

/* "Para qué" — módulo de la página /mvp (Figma 194:61 desktop · 194:74
   mobile). Explica los tres motivos estratégicos por los que el primer
   local existe como formato. Visualmente IDÉNTICO a "Modelo de negocio":
   título Host 120px alineado a la izquierda + 3 glass cards rounded-24
   bg-white-5 con eyebrow mono arriba + body Mona Sans abajo. La
   revisión 2026-05 alineó las dos secciones al mismo layout (gap 90px,
   cards h-350) — antes "Para qué" iba centrada con gap 128. */
export const paraQue = {
  title: 'Para qué',
  cells: [
    {
      eyebrow: 'punto de adquisición',
      body:
        'Captar a los primeros clientes en un contexto premium, con experiencia controlada y conversación directa.',
    },
    {
      eyebrow: 'showroom de la experiencia',
      body:
        'Antes de pedirle al mercado que confíe en una caja por correo, le ofrecemos la marca en formato físico, completo y bien resuelto.',
    },
    {
      eyebrow: 'motor de contenido y comunidad',
      body:
        'Cada día en el local genera material — visual, narrativo, anecdótico — que alimenta redes, newsletter y construcción de marca.',
    },
  ],
};

/* Datos del primer local KOKORO (Fase 0 del roadmap a 2 años). Antes
   se llamaba "kiosco" en el copy; en la revisión 2026-05 pasamos a
   "primer local" / "local" para alinear con la dirección actual de
   la marca (local + café como producto inicial, granola y B2B en
   fases posteriores). La variable `kiosco` se mantiene como nombre
   técnico para no romper imports. */
export const kiosco = {
  intro:
    'KOKORO arranca como un primer local de specialty coffee de 10–15 m² en Madrid (Salamanca, Chamberí o Justicia). No es un local más: es la primera versión física de la marca — el sitio donde se valida el modelo, se generan los primeros datos reales, se construye comunidad y se demuestra el estándar KOKORO antes de escalar a retail y B2B.',
  concepto: [
    'Café de especialidad con origen conocido y certificado',
    'Bollería y pastelería de obrador artesanal con nombre propio',
    'Sin cocina · sin humos · sin obra mayor',
    'Operación limpia: 1–2 personas, apertura matinal',
    'Formato 10–15 m² · planta baja · fachada a calle',
  ],
  inquilino: [
    'Capital propio, sin dependencia bancaria',
    'Equipo con socios con experiencia en apertura de negocios',
    'Modelo validado financieramente, con break-even claro',
    'Mínimo riesgo operativo: sin licencia de cocina compleja',
    'Disposición a contrato de larga duración (mínimo 3 años)',
  ],
  escenarios: [
    {
      name: 'Conservador',
      tx: 90,
      sub: 'transacciones / día',
      result: 'Break-even',
      tone: 'cons',
    },
    {
      name: 'Realista',
      tx: 130,
      sub: 'transacciones / día',
      result: '+2.500 € / mes',
      tone: 'real',
    },
    {
      name: 'Óptimo',
      tx: 180,
      sub: 'transacciones / día',
      result: '+7.000 € / mes',
      tone: 'agres',
    },
  ],
  requisitos: [
    'Superficie: 10–20 m² en planta baja',
    'Fachada visible desde la acera, a pie de calle',
    'Zona: Salamanca, Chamberí o Justicia',
    'Tráfico peatonal matinal contrastado',
    'Instalación eléctrica suficiente (monofásica o trifásica)',
    'Contrato mínimo 3 años con opción de renovación',
  ],
};

export const fases = [
  {
    num: 'Fase 0 · Ahora',
    title: 'Local y blend propio',
    time: 'Meses 1–6',
    desc: 'Primer local en Madrid y desarrollo del blend de café KOKORO. Validación del modelo y generación de comunidad.',
    active: true,
  },
  {
    num: 'Fase 1',
    title: 'Consolidación',
    time: 'Meses 6–12',
    desc: 'Consolidación de la marca y operación estable. Primeros testeos con productos propios, empezando por las granolas.',
  },
  {
    num: 'Fase 2',
    title: 'Lanzamiento granola',
    time: 'Meses 12–18',
    desc: 'Lanzamiento oficial de la granola KOKORO. Impulso al ecommerce como motor de crecimiento.',
  },
  {
    num: 'Fase 3',
    title: 'Expansión y B2B',
    time: 'Meses 18–24',
    desc: 'Nuevos lanzamientos y entrada de lleno al canal B2B. Marca operando con escala real.',
  },
];

export const referencias = [
  {
    name: 'Huel',
    tag: 'Comida completa',
    note: 'Nutrición funcional, marca cohesiva y comunidad enorme. Referencia de packaging y narrativa.',
  },
  {
    name: 'AG1',
    tag: 'Suscripción premium',
    note: 'Suscripción mensual, posicionamiento aspiracional y excelencia en producto único.',
  },
  {
    name: 'B3tter Foods',
    tag: 'Snacks reales',
    note: 'Identidad gráfica fuerte y producto honesto. Cercanía a nuestra propuesta de valor.',
  },
  {
    name: 'Nomad Coffee',
    tag: 'Specialty coffee',
    note: 'Referencia para el lado físico: local minimal, café de especialidad y oficio.',
  },
  {
    name: 'East Crema Café',
    tag: 'Brand experience',
    note: 'Cómo construir una marca de café local que escala a retail y experiencia.',
  },
];

export const equipo = {
  /* El intro mezcla Mona Sans con un tramo intercalado en Instrument Serif
     Regular (no itálica) — replica Figma 162:7. Lo partimos en tres tramos
     para que el componente pueda renderizar el del medio con la fuente
     serif sin tener que parsear strings. Revisión 2026-05: alineado con
     la voz editorial del dossier ("Este es el equipo… nuestra mayor
     garantía es el compromiso con este proyecto"). */
  introLead: 'Este es el equipo que ',
  introEmph: 'sueña, diseña y ejecuta KOKORO día a día.',
  introTail:
    ' Nuestra mayor garantía es el compromiso con este proyecto.',
  /* Cada miembro: nombre + cargo + photo + linkedin. El orden importa: en
     desktop se renderizan en este mismo orden, izquierda → derecha,
     coincidiendo con Figma 162:32 (Iván, Candela, Olga). Bios revisadas
     2026-05 según KOKORO_copies.md. */
  members: [
    {
      name: 'Iván Cosmen',
      role: 'CFO',
      photo: '/team/ivan.webp',
      linkedin: 'https://www.linkedin.com/in/ivancosmen/',
      bio: 'Lidera disciplina financiera y estrategia de capital. Background en M&A y crecimiento de marcas de consumo. Garantiza que cada decisión — desde el primer m² hasta la primera ronda — se tome con criterio y sin improvisación.',
    },
    {
      name: 'Candela Pinteño',
      role: 'CEO',
      photo: '/team/candela.webp',
      linkedin: 'https://www.linkedin.com/in/candela-pinte%C3%B1o/',
      bio: 'Founder y CEO. Lidera marca, producto y experiencia. Background en branding premium y dirección creativa, con obsesión por la inclusión alimentaria y el diseño editorial. Sostiene la coherencia entre lo que KOKORO dice y lo que KOKORO entrega.',
    },
    {
      name: 'Olga Noblejas',
      role: 'COO',
      photo: '/team/olga.webp',
      linkedin: 'https://www.linkedin.com/in/olga-n-585437292/',
      bio: 'Lidera operaciones y producción. Background en gestión de cadena de suministro premium y apertura de puntos físicos. Responsable de que cada taza, cada formato y cada entrega lleguen con el estándar KOKORO — sin atajos.',
    },
  ],
};

export const contacto = {
  ask: 'Buscamos socio capital y/u operacional para acelerar Fase 0 y preparar Fase 1.',
  email: 'hola@kokorofoods.com',
  city: 'Madrid · España',
  status: 'Proyecto en fase de apertura',
};
