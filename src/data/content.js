// Contenido extraído del dossier oficial (PDF) + dossier comercial (HTML)
// Editar aquí cambia el contenido de toda la web sin tocar componentes.

export const brand = {
  name: 'KOKORO',
  tagline: 'El corazón de las cosas',
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
  { id: 'kiosco', label: '09 · Fase 0 — el kiosco' },
  { id: 'fases', label: '10 · Plan a 3 años' },
  { id: 'referencias', label: '11 · Referencias' },
  { id: 'contacto', label: '12 · Contacto' },
];

export const kokoroMeaning = {
  jp: '心',
  body: 'En japonés puede llegar a significar corazón, mente, alma, sentimientos. Por lo general el título se traduce como',
  italic: '"El corazón de las cosas".',
};

export const ejecutivo = {
  intro: 'Kokoro Foods es una marca de alimentos basada en comida real, diseñada para incluir a todos.',
  italic: 'Creamos productos saludables, seguros y transparentes, aptos para personas con alergias, intolerancias o restricciones alimentarias.',
  closer: 'Apostamos por la trazabilidad total, ingredientes limpios y una promesa clara: alimentos reales para todos los cuerpos. Inclusión, salud y confianza, sin compromisos.',
};

/* "Sobre Kokoro" — sección con tabs (Figma 104:487 / 151:192).
   Título grande a dos líneas + 4 tabs (Por qué Kokoro / Misión / Visión /
   Valores). Cada tab carga su body en formato Mona Sans 28px con frase
   en Instrument Serif italic intercalada. */
export const sobreKokoro = {
  title: ['Sobre', 'Kokoro'],
  tabs: [
    {
      key: 'por-que',
      label: 'Por qué Kokoro',
      body: 'En japonés puede llegar a significar corazón, mente, alma, sentimientos. Por lo general el título se traduce como',
      italic: ' "El corazón de las cosas".',
    },
    {
      key: 'mision',
      label: 'Misión',
      body: 'En Kokoro Foods creamos alimentos premium basados en comida real sin ingredientes ultraprocesados, pensados para personas con intolerancias, alergias o estilos de vida conscientes.',
      italic: ' Diseñamos cada producto con el más alto estándar nutricional, sensorial y estético, para transformar la experiencia de comer en un acto de confianza, placer y bienestar.',
    },
    {
      key: 'vision',
      label: 'Visión',
      body: 'Aspiramos a convertirnos en la marca de referencia en alimentación saludable y libre de alérgenos en Europa, elevando el estándar de la industria.',
      italic: ' Que elegir salud nunca implique resignar placer, diseño ni seguridad.',
    },
    {
      key: 'valores',
      label: 'Valores',
      body: 'Honestidad. Inclusión. Excelencia. Confianza.',
      italic: ' Cuatro principios que guían cada decisión de KOKORO, desde la formulación hasta la experiencia de marca.',
    },
  ],
};

/* "Roadmap" — sección con tabs FASE 1-4 (Figma 104:516 / 151:201).
   Mismo patrón que SobreKokoro pero aplicado al plan a 3 años. */
export const roadmap = {
  title: 'Roadmap',
  tabs: [
    {
      key: 'fase-1',
      label: 'Fase 1',
      body: 'Kiosco de specialty coffee de 10–15 m² en Madrid. Validación del modelo, primeras métricas reales y construcción de comunidad.',
      italic: ' El primer punto físico donde KOKORO se vive por primera vez.',
    },
    {
      key: 'fase-2',
      label: 'Fase 2',
      body: 'Operación estable y cash flow positivo. Refinamos procesos, identidad de marca y cultura interna.',
      italic: ' La fase donde la marca encuentra su voz definitiva.',
    },
    {
      key: 'fase-3',
      label: 'Fase 3',
      body: 'Apertura del segundo punto y desarrollo del blend KOKORO propio. Primeras ventas B2B y lanzamiento del ecommerce.',
      italic: ' El salto de un local a una marca con escala real.',
    },
    {
      key: 'fase-4',
      label: 'Fase 4',
      body: 'Tostador propio, línea retail y proveedor B2B consolidado. Marca completa operando de forma autosuficiente y escalable.',
      italic: ' KOKORO Foods consolidada como referente europeo.',
    },
  ],
};

export const problema = {
  callout: 'Las personas con alergias e intolerancias no tienen acceso a desayunos ricos, nutritivos, seguros y de calidad.',
  bullets: [
    'Los productos existentes no priorizan la seguridad alimentaria: hay trazas, contaminación cruzada, recetas no pensadas para alérgicos.',
    'Se asocia lo "rico y saludable" con ingredientes que excluyen a una parte del público (almendras, anacardos, granolas industriales).',
    'Estas personas terminan renunciando a comer ciertos productos, exponiéndose al riesgo o resignándose a opciones mediocres.',
  ],
};

export const gap = [
  'Porque a pesar de que otros hacen granola y café, nadie lo está haciendo pensando primero en la inclusión alimentaria con disfrute y calidad.',
  'Porque el auge del café de especialidad, la granola artesanal y los snacks saludables deja fuera a una porción significativa del mercado.',
  'Porque la prevalencia de alergias alimentarias está en aumento, especialmente en jóvenes adultos.',
];

export const mision =
  'En Kokoro Foods creamos alimentos premium basados en comida real sin ingredientes ultraprocesados, pensados para personas con intolerancias, alergias o estilos de vida conscientes. Diseñamos cada producto con el más alto estándar nutricional, sensorial y estético, para transformar la experiencia de comer en un acto de confianza, placer y bienestar.';

export const vision =
  'Aspiramos a convertirnos en la marca de referencia en alimentación saludable y libre de alérgenos en Europa, elevando el estándar de la industria y redefiniendo el vínculo emocional entre las personas y los alimentos funcionales. Queremos que elegir salud nunca implique resignar placer, diseño ni seguridad.';

export const valores = [
  {
    glyph: '◎',
    title: 'Honestidad',
    desc: 'Trazabilidad total y comunicación transparente. Nada que ocultar en cada ingrediente.',
  },
  {
    glyph: '◈',
    title: 'Inclusión',
    desc: 'Comida real para todos los cuerpos. Aptos para alergias, intolerancias y conciencia.',
  },
  {
    glyph: '◇',
    title: 'Excelencia',
    desc: 'El estándar más alto en nutrición, sabor, textura y diseño. Sin compromisos.',
  },
  {
    glyph: '○',
    title: 'Confianza',
    desc: 'Cada producto pensado para que comer sea un acto seguro, placentero y consciente.',
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
      'Business Model Canvas. Una mirada estructurada a propuesta de valor, segmentos, canales, costes e ingresos — con la dirección estratégica que guía cada decisión de KOKORO.',
  },
  // Split-screen físico: cada frase del vacío (izq, dark) tiene su
  // frase-espejo de respuesta (dcha, cream) en el MISMO índice del
  // array. Esa pareja por índice es la que usa PhysicsPile para el
  // mirror linking — agarrar una mueve la del otro lado en espejo.
  vacio: {
    eyebrow: 'el punto de dolor',
    /* Figma 104:872 — header propio: título grande "Situación / actual"
       a dos líneas + body Mona Sans 20px alineado a la derecha en columna
       de 508px (Figma 159:317). El body se actualizó al copy que pide
       el cliente — antes era una frase sobre el vacío del mercado, ahora
       habla del compromiso del equipo (mismo párrafo que aparece en la
       sección Equipo, intencionalmente reutilizado). */
    displayTitle: ['Situación', 'actual'],
    displayBody:
      'Estos somos los que soñamos, diseñamos y ejecutamos Kokoro Foods día a día. Nuestra mayor garantía es nuestro compromiso con este proyecto.',
    title: 'El vacío vs. la respuesta',
    left: [
      'Trazas invisibles',
      'Exclusión silenciosa',
      'Miedo a comer',
      'Opciones mediocres',
      'Industria sorda',
      'Comunidad ignorada',
      'Etiquetas confusas',
      'Renuncia diaria',
    ],
    right: [
      'Trazabilidad real',
      'Inclusión por diseño',
      'Comer sin miedo',
      'Sabor sin compromiso',
      'Comunidad que ve',
      'Diseño que abraza',
      'Ingredientes limpios',
      'Estándar nuevo',
    ],
  },
  /* Solución — textos literales del Figma 159:318:
     · title 159:319: "Solución"
     · cell 159:337: eyebrow "seguridad sin renuncias" + body 159:340
     · cell 159:341: eyebrow "el punto de partida" + body 159:344
     · cell 159:345: eyebrow "alimentos con alma" + body 159:348 (el
       body lleva un doble espacio entre `"Kokoro"` y `representa` que
       Figma preserva con whitespace-pre-wrap; aquí lo guardamos tal
       cual, aunque la renderización HTML por defecto lo colapsa a uno) */
  solucion: {
    eyebrow: 'el producto',
    title: 'Solución',
    cells: [
      {
        icon: 'repeat',
        eyebrow: 'seguridad sin renuncias',
        body:
          'Productos funcionales, sabrosos y estéticos diseñados bajo una promesa de trazabilidad total y sin contaminación cruzada.',
      },
      {
        icon: 'tag',
        eyebrow: 'el punto de partida',
        body: 'Una cafetería de especialidad',
      },
      {
        icon: 'intersect',
        eyebrow: 'alimentos con alma',
        body:
          '"Kokoro"  representa la unión entre el bienestar físico y el placer emocional de comer sin miedo.',
      },
    ],
  },
  revenue: {
    eyebrow: 'revenue model',
    title: 'El motor de escala',
    main: {
      eyebrow: 'recurrencia',
      body:
        'Modelo de suscripción mensual configurable para asegurar ingresos predecibles y alta fidelización.',
    },
    side: [
      {
        eyebrow: 'venta directa',
        body:
          'E-commerce para ventas unitarias y colaboraciones exclusivas de alto ticket.',
      },
      {
        eyebrow: 'b2b selectivo',
        body:
          'Expansión estratégica a través de hoteles boutique, concept stores y clínicas de salud funcional.',
      },
    ],
  },
  ventaja: {
    eyebrow: 'activos estratégicos',
    title: 'Nuestra ventaja',
    items: [
      {
        title: 'Activo intelectual',
        body:
          'Know-how propio en formulación de alimentos funcionales con criterios sensoriales exigentes.',
      },
      {
        title: 'Identidad aspiracional',
        body:
          'Una marca con identidad potente que transforma la restricción alimentaria en un estilo de vida elegante.',
      },
      {
        title: 'Comunidad activa',
        body:
          'Red de embajadores de nicho y una plataforma tecnológica preparada para la gestión masiva de suscripciones.',
      },
    ],
  },
};

// Sección "Fase 0 - el kiosco MVP" (datos del HTML)
export const kiosco = {
  intro:
    'KOKORO arranca como un kiosco de specialty coffee de 10–15 m² en Madrid (Salamanca, Chamberí o Justicia). Es el punto físico donde la marca se vive por primera vez, se valida el modelo y se construye comunidad antes de escalar a retail y B2B.',
  concepto: [
    'Café de especialidad con origen conocido y certificado',
    'Bollería y pastelería de obrador artesanal con nombre',
    'Sin cocina · sin humos · sin obra mayor',
    'Operación limpia: 1–2 personas, apertura matinal',
    'Formato 10–15 m² · planta baja · fachada a calle',
  ],
  inquilino: [
    'Capital propio sin financiación bancaria',
    'Equipo con socios con experiencia en apertura de negocios',
    'Modelo validado financieramente con break-even claro',
    'Mínimo riesgo operativo: sin licencia de cocina compleja',
    'Disposición a contrato de larga duración (mín. 3 años)',
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
    title: 'Primer local MVP',
    time: 'Meses 1–6',
    desc: 'Kiosco de especialidad. Validación del modelo y generación de comunidad.',
    active: true,
  },
  {
    num: 'Fase 1',
    title: 'Consolidación',
    time: 'Meses 6–18',
    desc: 'Operación estable. Cash flow positivo. Construcción de marca e identidad.',
  },
  {
    num: 'Fase 2',
    title: 'Escala local',
    time: 'Meses 18–30',
    desc: 'Segundo punto. Blend propio KOKORO. Primeras ventas B2B y ecommerce.',
  },
  {
    num: 'Fase 3',
    title: 'Marca completa',
    time: 'Meses 30–36',
    desc: 'Tostador propio. Línea retail. Proveedor B2B consolidado.',
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
    note: 'Referencia para el lado físico: kiosco minimal, café de especialidad y oficio.',
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
     serif sin tener que parsear strings. */
  introLead: 'Estos somos los que ',
  introEmph: 'soñamos, diseñamos y ejecutamos Kokoro Foods día a día.',
  introTail:
    ' Nuestra mayor garantía es nuestro compromiso con este proyecto.',
  /* Cada miembro: nombre + cargo + photo + linkedin. El orden importa: en
     desktop se renderizan en este mismo orden, izquierda → derecha,
     coincidiendo con Figma 162:32 (Iván, Candela, Olga). */
  members: [
    {
      name: 'Iván Cosmen',
      role: 'CFO',
      photo: '/team/ivan.webp',
      linkedin: 'https://www.linkedin.com/in/ivancosmen/',
      bio: 'Lidera la disciplina financiera y la estrategia de capital. Background en M&A y crecimiento de marcas de consumo. Garantiza decisiones con criterio desde el primer día.',
    },
    {
      name: 'Candela Pinteño',
      role: 'CEO',
      photo: '/team/candela.webp',
      linkedin: 'https://www.linkedin.com/in/candela-pinte%C3%B1o/',
      bio: 'Founder y CEO. Dirige marca, producto y experiencia. Background en branding premium y dirección creativa, con foco obsesivo en inclusión alimentaria y diseño editorial.',
    },
    {
      name: 'Olga Noblejas',
      role: 'COO',
      photo: '/team/olga.webp',
      linkedin: 'https://www.linkedin.com/in/olga-n-585437292/',
      bio: 'Lidera operaciones y producción. Background en gestión de cadena de suministro premium y apertura de puntos físicos. Responsable de que cada producto llegue con el estándar KOKORO.',
    },
  ],
};

export const contacto = {
  ask: 'Buscamos socio capital y/o operacional para acelerar Fase 0 y preparar Fase 1.',
  email: 'hola@kokorofoods.com',
  city: 'Madrid · España',
  status: 'Proyecto en fase de apertura',
};
