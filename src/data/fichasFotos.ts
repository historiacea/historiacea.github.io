/**
 * Fichas de las fotos de las galerías (castillo, recuerdos, plantas).
 * Se muestran junto a la imagen al ampliarla en el lightbox.
 *
 * - La clave es el nombre de archivo SIN extensión (p. ej. "castillo-48").
 * - Todo es opcional: lo que no se sepa, no se muestra.
 * - Rellenar/corregir aquí a medida que se identifiquen fotos.
 */

export type FichaFoto = {
  titulo?: string;
  /** Año o época aproximada ("1933", "años 70", "2012"...). */
  anio?: string;
  lugar?: string;
  /** De dónde procede la imagen. */
  fuente?: string;
  /** Autor/a, si se conoce. */
  credito?: string;
  /** Enlace a la fuente original. */
  enlace?: string;
  desc?: string;
};

// ---- Fuentes habituales (editar URLs aquí) -------------------------------
// TODO: sustituir por la URL exacta de la página de Facebook de defensa
// del castillo cuando la tengamos.
export const FUENTES = {
  fbCastillo: {
    nombre: 'Página de Facebook por la defensa del Castillo de Cea',
    url: 'https://www.facebook.com/search/top?q=castillo%20de%20cea',
  },
  listaRoja: {
    nombre: 'Lista Roja del Patrimonio · Hispania Nostra',
    url: 'https://listarojapatrimonio.org/ficha/castillo-de-cea/',
  },
  ileon: {
    nombre: 'iLeón.com',
    url: 'https://ileon.eldiario.es/',
  },
};

// ---- Ficha por defecto de cada colección ---------------------------------
export const FICHAS_DEFECTO: Record<string, FichaFoto> = {
  castillo: {
    fuente: `Recopilación de fuentes públicas, en especial la ${FUENTES.fbCastillo.nombre}`,
    enlace: FUENTES.fbCastillo.url,
    desc: 'Imagen recopilada sin ánimo de lucro para preservar la memoria del castillo. Si es tuya y quieres crédito o retirada, escríbenos.',
  },
  recuerdos: {
    fuente: 'Álbum colectivo vecinal de Cea',
    desc: 'Foto del archivo familiar de algún vecino. Si sabes el año, el lugar o quiénes aparecen, escríbenos: cada dato suma.',
  },
  plantas: {
    fuente: 'Estudio «Castillo Actual de Cea» (PDF disponible en Reconstrucción 3D y planos)',
    desc: 'Plano de una de las plantas de la torre del castillo de Cea.',
  },
  ia: {
    fuente: 'Ilustración generada con IA para este proyecto · recreación sin valor documental, puede contener errores',
  },
};

// ---- Fichas individuales ---------------------------------------------------
export const FICHAS: Record<string, FichaFoto> = {
  'castillo-46': {
    titulo: 'El castillo en 1933',
    anio: '1933',
    desc: 'Una de las imágenes más antiguas que se conservan de la torre, cuando aún mantenía mayor altura en sus lienzos.',
    fuente: 'Archivo histórico, recopilada de fuentes públicas',
  },
  'castillo-48': {
    titulo: 'El derrumbe de 2012',
    anio: '2012',
    desc: 'Desprendimiento parcial de uno de los lienzos. El castillo está en la Lista Roja del Patrimonio desde 2008.',
    fuente: FUENTES.listaRoja.nombre,
    enlace: FUENTES.listaRoja.url,
  },
  'castillo-55': {
    titulo: 'Aviso de peligro (2012)',
    anio: '2012',
    desc: 'El deterioro progresivo de la estructura obligó a señalizar el riesgo de desprendimientos.',
  },
  'castillo-47': {
    titulo: 'El castillo en la prensa',
    fuente: FUENTES.ileon.nombre,
    enlace: FUENTES.ileon.url,
    desc: 'Imagen difundida por el diario digital iLeón en su cobertura sobre el estado del castillo.',
  },
  'castillo-53': {
    credito: 'Javier Fernández',
    desc: 'Vista del castillo sobre el cerro y la vega del Cea.',
  },
  'castillo-43': {
    fuente: 'Panoramio (archivo, servicio cerrado)',
    desc: 'Imagen del desaparecido servicio de fotos geolocalizadas Panoramio.',
  },
  'castillo-54': {
    fuente: 'Fotograma de vídeo (YouTube)',
    desc: 'Vista aérea de la torre y su entorno.',
  },
  'castillo-56': {
    titulo: 'El castillo en la bibliografía',
    fuente: 'Recorte bibliográfico compartido por vecinos (2017)',
    desc: 'Página de una publicación sobre el castillo leonés de Cea y sus «donjones», con una vista aérea antigua de la torre.',
  },
  'castillo-57': {
    titulo: 'El castillo en la bibliografía',
    fuente: 'Recorte bibliográfico compartido por vecinos (2017)',
  },
  'castillo-58': {
    titulo: 'El castillo en la bibliografía',
    fuente: 'Recorte bibliográfico compartido por vecinos (2017)',
  },
  'castillo-59': {
    titulo: 'La torre nueva en su esplendor (recreación)',
    anio: 'c. 1480',
    fuente: 'Recreación digital creada para este proyecto',
    desc: 'Así pudo verse la torre de los Sandoval recién terminada: artillería en el patio, carros de suministro y la vega del Cea al fondo.',
  },
  'castillo-60': {
    titulo: 'La torre y su recinto (recreación)',
    anio: 'c. 1480',
    fuente: 'Recreación digital creada para este proyecto',
    desc: 'Vista aérea de la fortaleza con la muralla del recinto y la vida cotidiana de la guarnición.',
  },
  'castillo-61': {
    titulo: 'La fortaleza en activo (recreación)',
    anio: 'c. 1480',
    fuente: 'Recreación digital creada para este proyecto',
    desc: 'La torre artillera en pleno funcionamiento, con sus banderas y el trajín de soldados y carros.',
  },
  'castillo-62': {
    titulo: 'La torre sobre el cerro (recreación)',
    anio: 'c. 1480',
    fuente: 'Recreación digital creada para este proyecto',
    desc: 'El conjunto fortificado dominando el valle, tal y como pudo lucir a finales del siglo XV.',
  },

  // ---- Ilustraciones de IA de los capítulos -------------------------------
  // El título resume la escena; la descripción es el pie usado en el capítulo.
  'vacceos-anibal': {
    titulo: 'Los vacceos y Aníbal',
    desc: 'El ejército cartaginés cruza tierras de la meseta norte camino de los Alpes.',
  },
  'paganismo-cristianismo': {
    titulo: 'Paganismo y cristianismo en el valle del Cea',
    desc: 'La transición religiosa entre los siglos II y V.',
  },
  'visigodoscea': {
    titulo: 'La caída de Roma y la llegada visigoda',
    desc: 'Los visigodos se asientan en el valle del Cea tras el fin del poder romano.',
  },
  'nodicia-kesos-monje': {
    titulo: 'La Nodicia de Kesos',
    desc: 'El monje que escribió la Nodicia de Kesos hacia el año 974 en un scriptorium del valle del Cea.',
  },
  'historia-castillo': {
    titulo: 'El primer castillo de Cea',
    desc: 'Reconstrucción del primer castillo de Alfonso III sobre el cerro del río Cea en el siglo IX.',
  },
  'castillo-historia': {
    titulo: 'Leyendas del castillo',
    desc: 'El rey García de Navarra prisionero en las mazmorras de la fortaleza leonesa hacia el año 1040.',
  },
  'condes-de-cea': {
    titulo: 'Los condes de Cea',
    desc: 'Un conde leonés a caballo contempla el territorio desde el cerro sobre el río Cea, en el siglo X.',
  },
  'cronicas-medievales': {
    titulo: 'Cea en las crónicas',
    desc: 'Un monje benedictino en el scriptorium de Sahagún anota los nombres de tierras y quesos del alfoz de Cea en el siglo X.',
  },
  'entre-dos-coronas': {
    titulo: 'Entre dos coronas',
    desc: 'Cea entre León y Castilla en el siglo XI: dos ejércitos se enfrentan a orillas del río con el castillo al fondo.',
  },
  'urraca-i': {
    titulo: 'Urraca I de León',
    desc: 'Primera reina de León y Castilla, en los adarves del castillo de Cea hacia 1115.',
  },
  'urraca-i-reina': {
    titulo: 'Urraca I, primera reina de Europa',
    desc: 'Recreación de Urraca I de León, primera reina por derecho propio de Europa, sobre los adarves de un castillo medieval con el valle del Cea al fondo.',
  },
  'auge-medieval-xii-xiii': {
    titulo: 'El auge medieval (siglos XII-XIII)',
    desc: 'Una iglesia románica en construcción sobre las cenizas de las guerras medievales.',
  },
  'monasterio-sahagun-medieval': {
    titulo: 'El Monasterio de Sahagún',
    desc: 'Vista aérea del gran centro cluniacense del valle del Cea en su esplendor medieval, en el siglo XII.',
  },
  'aljama-judia-cea': {
    titulo: 'La aljama judía de Cea',
    desc: 'El barrio judío medieval en el cerro de la Parba: calles estrechas y la sinagoga.',
  },
  'ducado-de-cea': {
    titulo: 'El Ducado de Cea y los Sandoval',
    desc: 'Fernando de Sandoval revisa los planos de la nueva torre artillera hacia 1480.',
  },
  'diseno-artillero-castillo': {
    titulo: 'El diseño artillero del castillo',
    desc: 'Sección de la planta con las cuatro torrecillas de flanqueo y las bóvedas para cañones del siglo XV.',
  },
  'reconstruccion-cuarta-torre': {
    titulo: 'La cuarta torrecilla (recreación)',
    desc: 'Reconstrucción especulativa de la cuarta torrecilla en pie, disparando el cañón desde la tronera.',
  },
  'guerras-dinasticas': {
    titulo: 'Las guerras dinásticas',
    desc: 'La guerra civil castellana de 1356: el incendio de Cea por las tropas de Enrique de Trastámara.',
  },
  'peste-negra-cea': {
    titulo: 'La Peste Negra en Cea',
    desc: 'La peste llega a Cea en 1349: calles vacías y supervivientes en una villa castellana devastada.',
  },
  'religion-vida-cotidiana': {
    titulo: 'Religión y vida cotidiana',
    desc: 'Procesión religiosa por las calles de piedra de la villa castellana en el siglo XVII.',
  },
  'feijoo-ilustracion': {
    titulo: 'La Ilustración llega a Cea',
    desc: 'Un cura ilustrado enseña a leer a niños en una escuela rural leonesa del siglo XVIII.',
  },
  'madoz-en-cea': {
    titulo: 'Cea según Madoz (1847)',
    desc: 'Recreación de la villa leonesa con sus molinos, hornos de pan y el puente medieval.',
  },
  'madoz-llega-cea': {
    titulo: 'Pascual Madoz llega a Cea',
    desc: 'El geógrafo a caballo ante el puente de ocho arcos y la torre en ruinas al fondo, en 1847.',
  },
  'guerras-carlistas': {
    titulo: 'Las guerras carlistas',
    desc: 'Soldados carlistas marchando por la meseta castellana en el siglo XIX.',
  },
  'desamortizacion-eslonza': {
    titulo: 'La desamortización de Eslonza',
    desc: 'Las ruinas del Monasterio de Eslonza tras la desamortización de Mendizábal en 1836: piedras vendidas y retablos dispersos.',
  },
  'iglesia-santa-maria': {
    titulo: 'La iglesia de Santa María',
    desc: 'En construcción en 1909, levantada con piedras del castillo medieval.',
  },
  'guerra-civil-cea': {
    titulo: 'La Guerra Civil en Cea',
    desc: 'Verano de 1936: soldados franquistas en la plaza del pueblo ante vecinos atemorizados.',
  },
  'reforestacion-riocamba': {
    titulo: 'La reforestación de Riocamba',
    desc: 'Trabajadores plantando pinos en la ladera junto a Cea hacia 1950.',
  },
  'exodo-rural': {
    titulo: 'El éxodo rural',
    desc: 'Años 60: una familia leonesa carga sus pertenencias para marcharse al norte de España.',
  },
  'candelas-cea': {
    titulo: 'La fiesta de Las Candelas',
    desc: 'La procesión con mantones y capas recorre las calles de la villa el 2 de febrero.',
  },
  'sahagun-trianos-eslonza': {
    titulo: 'Cea hoy',
    desc: 'Vista aérea de la villa leonesa al atardecer con la torre del castillo, el puente medieval y los campos de cereal.',
  },
  'castillo-estado-actual': {
    titulo: 'El estado actual del castillo',
    desc: 'La torre en ruina progresiva con los zunchos metálicos de la consolidación de 2015.',
  },
};

/** Obtiene la ficha de una imagen a partir de su URL y colección. */
export function fichaDe(src: string, coleccion: string): FichaFoto {
  const nombre = src.split('/').pop()?.replace(/\.[a-z]+$/i, '') ?? '';
  // Docusaurus añade hash al nombre (castillo-48-a1b2c3.jpg): probamos ambos.
  const sinHash = nombre.replace(/-[0-9a-f]{8,}$/i, '');
  const propia = FICHAS[nombre] ?? FICHAS[sinHash];
  const defecto = FICHAS_DEFECTO[coleccion] ?? {};
  return { ...defecto, ...propia };
}
