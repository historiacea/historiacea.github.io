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
