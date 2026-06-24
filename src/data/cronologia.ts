/**
 * Datos de la cronología de Cea para <CronologiaTimeline>.
 * - Hito: fecha + título descriptivo + texto, si es crucial, enlace e imagen.
 * - Epoca: icono, título, rango, un párrafo de contexto y sus hitos.
 */
export type Hito = {
  fecha: string;
  titulo: string;
  texto: string;
  crucial?: boolean;
  href?: string;
  img?: string;
};

export type Epoca = {
  id: string;
  icono: string;
  titulo: string;
  rango: string;
  /** Texto informativo que enmarca la época antes de sus hitos. */
  contexto: string;
  hitos: Hito[];
};

export const CRONOLOGIA: Epoca[] = [
  {
    id: 'prehistoria',
    icono: '🗿',
    titulo: 'Prehistoria y Edad del Hierro',
    rango: 's. V a.C. – 133 a.C.',
    contexto:
      'Mucho antes de que Cea tuviera nombre, la meseta era el corazón de un pueblo agrícola y guerrero: los **vacceos**. En estos siglos, el valle del Cea pasa de ser una tierra de trigales indígenas a convertirse en escenario del choque entre las comunidades celtibéricas y la maquinaria militar de **Roma**.',
    hitos: [
      {
        fecha: 'Siglo V a.C.',
        titulo: 'Origen de la cultura vaccea',
        texto: 'Heredera de la **Cultura del Soto de Medinilla**. Primeros asentamientos agrícolas en la zona de Cea.',
        crucial: true,
        href: '/docs/historia/parte-1/cap-4-vacceos-y-astures-frontera-y-fusion',
        img: '/img/libro/img-007.png',
      },
      {
        fecha: '220 a.C.',
        titulo: 'Primera mención histórica',
        texto: 'El historiador **Polibio** menciona por primera vez a los **vacceos** como pueblo organizado.',
        href: '/docs/historia/parte-1/cap-5-los-vacceos-entran-en-la-historia-anibal',
      },
      {
        fecha: '161 a.C.',
        titulo: 'Control romano',
        texto: 'Llega el **cónsul Ático** a la guarnición romana de Cea para controlar la producción de cereal.',
        crucial: true,
        href: '/docs/historia/parte-2/cap-8-la-via-romana-de-clunia-a-legio',
      },
      {
        fecha: '151 a.C.',
        titulo: 'Resistencia indígena',
        texto: 'Combate singular entre **Publio Cornelio Escipión Emiliano** y un guerrero intercatiense; símbolo del choque entre Roma y los pueblos indígenas.',
        href: '/docs/historia/parte-2/cap-8-la-via-romana-de-clunia-a-legio',
      },
      {
        fecha: '133 a.C.',
        titulo: 'Caída de Numancia',
        texto: 'Evento clave para la **romanización** del valle del Cea.',
        crucial: true,
      },
    ],
  },
  {
    id: 'romana',
    icono: '🏛️',
    titulo: 'Época Romana',
    rango: 's. I a.C. – V d.C.',
    contexto:
      'Roma no llega de golpe: se filtra en el valle como el agua entre la caliza. Durante cinco siglos, Cea se integra en la **red logística del Imperio** —calzadas, villas, mansiones— y el latín va sustituyendo poco a poco a la vieja toponimia céltica.',
    hitos: [
      {
        fecha: 'Siglo I a.C.',
        titulo: 'La vía romana',
        texto: 'Construcción de la **vía romana Clunia–Legio**, que pasa cerca de Cea y convierte la zona en un nodo estratégico.',
        crucial: true,
        href: '/docs/historia/parte-2/cap-8-la-via-romana-de-clunia-a-legio',
        img: '/img/libro/img-023.png',
      },
      {
        fecha: 'Siglos I–IV d.C.',
        titulo: 'Integración imperial',
        texto: 'Cea se integra en la red imperial: **producción agrícola, villas, mansiones de descanso, miliarios** y toponimia latina.',
        href: '/docs/historia/parte-2/cap-9-villas-termas-puentes-romanizacion-en-la-comarca',
        img: '/img/libro/img-026.png',
      },
    ],
  },
  {
    id: 'altaedad',
    icono: '⛪',
    titulo: 'Alta Edad Media',
    rango: 's. VI – X',
    contexto:
      'Con la caída de Roma, el valle del Cea se convierte en **tierra de frontera** entre el mundo cristiano del norte y al-Ándalus. Es la época en que Cea entra de lleno en la historia escrita: la repoblación de Alfonso III, los primeros condes y el nacimiento de la villa fortificada.',
    hitos: [
      {
        fecha: '476',
        titulo: 'Caída del Imperio Romano',
        texto: 'Cea queda bajo **dominio visigodo**.',
        href: '/docs/historia/parte-3/cap-13-caida-de-roma-y-llegada-visigoda',
        img: '/img/libro/img-033.png',
      },
      {
        fecha: 'Siglo VII',
        titulo: 'Fundación religiosa',
        texto: 'Fundación de **cenobios y ermitas** en los valles del Cea.',
      },
      {
        fecha: '711',
        titulo: 'Invasión musulmana',
        texto: 'Cea se convierte en **zona fronteriza** tras la invasión musulmana.',
        href: '/docs/historia/parte-3/cap-14-la-invasion-musulmana-la-linea-del-cea-y-witiza',
        img: '/img/libro/img-035.png',
      },
      {
        fecha: 'Siglo VIII',
        titulo: 'Refugio de Pelayo',
        texto: 'La tradición local relata que **Pelayo** se refugió en Cea tras enfrentarse a Witiza.',
        crucial: true,
        href: '/docs/historia/parte-3/cap-14-la-invasion-musulmana-la-linea-del-cea-y-witiza',
      },
      {
        fecha: '866–910',
        titulo: 'Reinado de Alfonso III',
        texto: 'Periodo de **Alfonso III el Magno** y consolidación del reino asturleonés.',
      },
      {
        fecha: 'Hacia 880',
        titulo: 'Repoblación',
        texto: 'Repoblación de Cea: «_Et populavit Cejam civitatem mirificam_» (Crónica Albeldense).',
        crucial: true,
        href: '/docs/historia/parte-3/cap-15-alfonso-iii-y-la-civitas-mirifica',
        img: '/img/libro/img-038.png',
      },
      {
        fecha: '904',
        titulo: 'Primera mención documentada',
        texto: 'Donación de Alfonso III al monasterio de Sahagún: **primera mención documentada** de Cea como nodo de comunicaciones.',
        href: '/docs/historia/parte-4/cap-19-documentos-caminos-y-monasterios-cea-en-las-cronicas',
        img: '/img/libro/img-046.png',
      },
      {
        fecha: '909',
        titulo: 'Presura en Vega del Cea',
        texto: 'Presura en Vega del Cea por **Sarracino y Faliquito**.',
      },
      {
        fecha: '916',
        titulo: 'In riuulo Ceia, subtus Castro Abaiub',
        texto: '**Ordoño II** delimita la diócesis de León: _“in riuulo Ceia, subtus Castro **Abaiub**”_ —en el río Cea, bajo el **Castro Abaiub**—, nombre del cerro fortificado donde se alzaría el castillo.',
        crucial: true,
        href: '/docs/historia/parte-4/cap-19-documentos-caminos-y-monasterios-cea-en-las-cronicas',
      },
      {
        fecha: '937',
        titulo: 'Donación de molinos',
        texto: 'Donación de **molinos** sobre el río Cea al monasterio de Sahagún.',
      },
      {
        fecha: '947',
        titulo: 'Venta junto a Santa María y el Castro Abayub',
        texto: '**Lupe** y sus hermanos **Hakam** y **Ayub** venden al abad **Iquila** unas tierras a orillas del Cea, junto a la **iglesia de Santa María**, al lado del **Castro Abayub**.',
        href: '/docs/historia/parte-4/cap-19-documentos-caminos-y-monasterios-cea-en-las-cronicas',
      },
      {
        fecha: '950',
        titulo: 'Primer conde documentado',
        texto: '**Bermudo Núñez** es el primer conde documentado.',
        href: '/docs/historia/parte-4/cap-17-los-condes-de-cea-genealogia-de-un-poder-territorial',
      },
      {
        fecha: '951',
        titulo: 'Donación de Bermudo',
        texto: 'Bermudo dona **tierras y una corte** en Cea a Sahagún.',
      },
      {
        fecha: '978',
        titulo: 'Fallecimiento de Fernando Bermúdez',
        texto: 'Fallece **Fernando Bermúdez de Cea**, hijo de Bermudo.',
      },
      {
        fecha: '988',
        titulo: 'Aceifa de Almanzor',
        texto: 'Cea es **saqueada e incendiada** durante la aceifa de Almanzor.',
        crucial: true,
        href: '/docs/historia/parte-4/cap-18-las-aceifas-de-almanzor-devastacion-y-reconstruccion',
        img: '/img/libro/img-044.png',
      },
    ],
  },
  {
    id: 'plena',
    icono: '🏰',
    titulo: 'Plena Edad Media',
    rango: 's. XI – XIII',
    contexto:
      'La frontera se estabiliza y Cea florece al amparo de su castillo y de un poderoso **cordón de monasterios**. Linajes nobles, órdenes militares y abades se disputan el control de una villa cada vez más codiciada.',
    hitos: [
      {
        fecha: '1040–1053',
        titulo: 'Prisión real',
        texto: 'El **castillo de Cea** funciona como prisión real; alberga reclusos como **Sancho IV de Navarra**.',
        crucial: true,
        href: '/docs/historia/parte-4/cap-26-la-fortaleza-primigenia-del-castro-al-castillo-viejo',
        img: '/img/libro/img-051.png',
      },
      {
        fecha: '1081–1126',
        titulo: 'Urraca I, reina de León',
        texto: '**Urraca I de León**, primera mujer en reinar plenamente sobre León, Galicia y Castilla, gobierna Cea como **enclave estratégico** en la frontera entre León y Castilla.',
        crucial: true,
        href: '/docs/historia/parte-4/cap-21-urraca-i-origen-de-una-leyenda',
        img: '/img/libro/img-048.png',
      },
      {
        fecha: '1109',
        titulo: 'Pogrom antisemita',
        texto: 'Tristemente documentado **pogrom antisemita** en Cea.',
        href: '/docs/historia/parte-4/cap-25-judios-en-la-parba-una-aljama-medieval',
      },
      {
        fecha: '1111',
        titulo: 'Batalla de Candespina',
        texto: 'Durante la guerra entre **Urraca** y su esposo **Alfonso I de Aragón**, Cea y su castillo caen temporalmente en manos de la alianza aragonesa-portuguesa.',
        href: '/docs/historia/parte-4/cap-21-urraca-i-origen-de-una-leyenda',
      },
      {
        fecha: '1113',
        titulo: 'Urraca recupera Cea',
        texto: 'Con tropas gallegas, **Urraca** recupera Sahagún, Carrión y el **castillo de Cea**, mientras el abad de Sahagún actúa en la villa.',
        href: '/docs/historia/parte-4/cap-21-urraca-i-origen-de-una-leyenda',
      },
      {
        fecha: '1115',
        titulo: 'Defensa de Cea',
        texto: 'El adelantado **Giraldo**, lugarteniente de **Alfonso I el Batallador** (esposo de Urraca), defiende con éxito la villa en el marco de la guerra entre ambos reyes.',
        href: '/docs/historia/parte-4/cap-23-de-la-posguerra-al-auge-medieval-siglos-xii-y-xiii',
      },
      {
        fecha: '1117',
        titulo: 'Urraca se refugia en Cea',
        texto: '**Urraca** se refugia en Cea junto al arzobispo **Gelmírez**, en esa ocasión aliado de la reina.',
        href: '/docs/historia/parte-4/cap-21-urraca-i-origen-de-una-leyenda',
      },
      {
        fecha: '1127',
        titulo: 'Alfonso VII reorganiza',
        texto: '**Alfonso VII** amnistía a Tello Fernández y reorganiza poderes locales.',
      },
      {
        fecha: '1128',
        titulo: 'Donaciones a Trianos',
        texto: 'Donaciones reales a **Trianos**: tierras de Cea pasan bajo influencia monástica.',
        href: '/docs/historia/parte-4/cap-24-sahagun-trianos-y-eslonza-el-cordon-monastico',
      },
      {
        fecha: '1181',
        titulo: 'Control monástico',
        texto: 'El **monasterio de Sahagún** y la **Orden de Santiago** adquieren control sobre Cea.',
        href: '/docs/historia/parte-4/cap-24-sahagun-trianos-y-eslonza-el-cordon-monastico',
      },
      {
        fecha: '1182–1185',
        titulo: 'Consolidación familiar',
        texto: '**Tello Pérez** y su familia consolidan tierras y donaciones.',
      },
      {
        fecha: '1187–1188',
        titulo: 'Pactos de Alfonso VIII',
        texto: 'Pactos de **Alfonso VIII** fortalecen la zona.',
      },
      {
        fecha: '1191',
        titulo: 'Cesión de iglesias',
        texto: 'Cesión de las iglesias de **San Esteban y Villa Mofol** a los monjes de Trianos.',
      },
    ],
  },
  {
    id: 'bajaedad',
    icono: '⚔️',
    titulo: 'Baja Edad Media y Renacimiento',
    rango: 's. XIV – XVII',
    contexto:
      'La prosperidad medieval se quiebra entre **guerras dinásticas, peste y hambre**. El viejo castillo arde, pero de sus ruinas nace el poder de los **Sandoval**, que levantan una torre revolucionaria y elevan Cea a la categoría de ducado.',
    hitos: [
      {
        fecha: '1354',
        titulo: 'Pedro I toma Cea',
        texto: '**Pedro I de Castilla** toma Cea y ordena **derribar la fortaleza**.',
        crucial: true,
        href: '/docs/historia/parte-5/cap-28-cea-en-las-guerras-dinasticas-pedro-i-vs-enrique-ii',
        img: '/img/libro/img-053.png',
      },
      {
        fecha: '1383',
        titulo: 'Intercambio con Juan I',
        texto: '**Leonor de Alburquerque** intercambia Cea con Juan I.',
      },
      {
        fecha: '1388',
        titulo: 'Entrega a Ramiro Núñez',
        texto: 'Juan I entrega Cea a **Ramiro Núñez de Guzmán**.',
      },
      {
        fecha: '1418',
        titulo: 'Venta a los Sandoval',
        texto: 'Venta de Cea a **Diego Gómez de Sandoval**, inicio del señorío.',
        crucial: true,
        href: '/docs/historia/parte-5/cap-30-el-ducado-de-cea-y-la-nobleza-cortesana',
        img: '/img/libro/img-055.png',
      },
      {
        fecha: '1419',
        titulo: 'Consolidación del dominio',
        texto: 'Compra de la parte de Sahagún: los **Sandoval consolidan el dominio**.',
      },
      {
        fecha: '1448',
        titulo: 'Confiscación temporal',
        texto: '**Juan II** confisca temporalmente Cea a favor del marqués de Villena.',
      },
      {
        fecha: '1456',
        titulo: 'Retorno a los Sandoval',
        texto: 'Cea vuelve a los **Sandoval**.',
      },
      {
        fecha: '1466–1467',
        titulo: 'Guerra civil',
        texto: 'Guerra civil entre el **infante Alfonso** y **Enrique IV**: Cea sufre ocupaciones sucesivas.',
        crucial: true,
        href: '/docs/historia/parte-5/cap-28-cea-en-las-guerras-dinasticas-pedro-i-vs-enrique-ii',
      },
      {
        fecha: '1470–1480',
        titulo: 'Torre Nueva',
        texto: 'Construcción de la **Torre Nueva de Cea** bajo los Sandoval y Rojas, adelantada a su tiempo.',
        crucial: true,
        href: '/docs/historia/parte-5/cap-32-la-nueva-torre-de-cea-una-fortaleza-adelantada-a-su-t',
      },
      {
        fecha: '1503',
        titulo: 'Campaña del Rosellón',
        texto: 'Los **Sandoval** participan en la Campaña del Rosellón.',
      },
      {
        fecha: '1602',
        titulo: 'Reconstrucción del puente',
        texto: 'Reconstrucción del **puente de piedra** por Diego de la Cajiga, Juan de Hermosa y Juan de Nates.',
        href: '/docs/historia/parte-2/cap-10-el-puente-de-cea-entre-mito-y-mamposteria',
      },
      {
        fecha: '1604',
        titulo: 'Ducado de Cea',
        texto: '**Felipe III** crea el Ducado de Cea, concedido a **Cristóbal Gómez de Sandoval y Rojas**.',
        crucial: true,
        href: '/docs/historia/parte-5/cap-30-el-ducado-de-cea-y-la-nobleza-cortesana',
      },
      {
        fecha: '1620',
        titulo: 'Finalización del puente',
        texto: 'Finalización de las obras del puente por **Pedro de Llánez**.',
      },
      {
        fecha: '1625',
        titulo: 'Censo parroquial',
        texto: 'El censo parroquial registra **1.172 habitantes** en Cea.',
      },
      {
        fecha: '1632–1633',
        titulo: 'Riadas destructivas',
        texto: 'Riadas destruyen **cuatro arcos** del puente.',
      },
      {
        fecha: '1638',
        titulo: 'Reconstrucción definitiva',
        texto: '**Reconstrucción definitiva** del puente por Pedro Cayón.',
        crucial: true,
        href: '/docs/historia/parte-2/cap-10-el-puente-de-cea-entre-mito-y-mamposteria',
      },
    ],
  },
  {
    id: 'contemporanea',
    icono: '💡',
    titulo: 'Edad Moderna y Contemporánea',
    rango: 's. XVIII – XXI',
    contexto:
      'El estruendo de las guerras da paso a las **ideas ilustradas**, las desamortizaciones y un siglo XX marcado por la Guerra Civil y el **éxodo rural**. Hoy, la memoria y el patrimonio son las herramientas para que Cea siga teniendo nombre propio.',
    hitos: [
      {
        fecha: 'Siglo XVIII',
        titulo: 'Reformas del puente',
        texto: 'Reformas y refuerzos del **puente de piedra** por daños de riadas.',
      },
      {
        fecha: '1767',
        titulo: 'Expulsión de los jesuitas',
        texto: 'Sus bienes en Cea pasan a la **Corona**.',
        href: '/docs/historia/parte-6/cap-33-feijoo-jovellanos-y-el-despertar-de-las-ideas',
      },
      {
        fecha: 'Finales s. XVIII',
        titulo: 'Primeras desamortizaciones',
        texto: 'Primeras **desamortizaciones parciales** de tierras monásticas.',
      },
      {
        fecha: '1808–1814',
        titulo: 'Guerra de la Independencia',
        texto: 'Paso de **tropas francesas** y saqueos.',
      },
      {
        fecha: '1833–1876',
        titulo: 'Guerras Carlistas',
        texto: 'Cea es **zona estratégica**, con movimientos de tropas y requisas.',
        href: '/docs/historia/parte-6/cap-35-carlistas-liberales-y-el-siglo-del-cambio',
      },
      {
        fecha: '1845–1850',
        titulo: 'Diccionario de Madoz',
        texto: '**Pascual Madoz** describe Cea, su puente y su castillo en su diccionario.',
        crucial: true,
        href: '/docs/historia/parte-6/cap-34-madoz-en-cea-el-retrato-de-1847',
        img: '/img/libro/img-058.png',
      },
      {
        fecha: '1836–1855',
        titulo: 'Desamortización de Mendizábal',
        texto: 'La desamortización de **Mendizábal** (1836) pone en venta las **tierras eclesiásticas**; la posterior de 1855 alcanzará también las comunales.',
        href: '/docs/historia/parte-6/cap-36-de-senorio-a-ayuntamiento-constitucional',
      },
      {
        fecha: 'Finales s. XIX',
        titulo: 'Crisis cerealista',
        texto: '**Crisis cerealista** y fuerte emigración.',
      },
      {
        fecha: '1936–1939',
        titulo: 'Guerra Civil',
        texto: 'Cea queda bajo control sublevado; **detenciones, fusilamientos** y refuerzo del puente.',
        crucial: true,
        href: '/docs/historia/parte-7/cap-38-cea-en-la-guerra-civil-datos-y-silencios',
        img: '/img/libro/img-063.png',
      },
      {
        fecha: '1940–1950',
        titulo: 'Reconstrucción y expolio',
        texto: 'Reconstrucción parcial del pueblo; el **castillo es expoliado** para materiales.',
      },
      {
        fecha: '1950–1970',
        titulo: 'Éxodo rural',
        texto: 'Plan de repoblación forestal en **Riocamba** y fuerte emigración.',
        href: '/docs/historia/parte-7/cap-40-anos-60-80-el-exodo-rural-y-el-pan-del-olvido',
        img: '/img/libro/img-065.png',
      },
      {
        fecha: '1970–1980',
        titulo: 'Turismo rural',
        texto: 'Inicio del **turismo rural** y estudios sobre patrimonio.',
      },
      {
        fecha: '1983',
        titulo: 'Declaración BIC',
        texto: 'El **puente de Cea** es declarado **Bien de Interés Cultural**.',
        crucial: true,
        href: '/docs/historia/parte-2/cap-10-el-puente-de-cea-entre-mito-y-mamposteria',
      },
      {
        fecha: '2010',
        titulo: 'Prospección arqueológica',
        texto: 'Una **prospección arqueológica** en el castillo documenta **restos medievales**.',
      },
      {
        fecha: '2014',
        titulo: 'Deterioro del puente y del castillo',
        texto: 'Se denuncia el **deterioro** del puente histórico.',
      },
      {
        fecha: '2015',
        titulo: 'Iluminación ornamental',
        texto: 'Instalación de **iluminación ornamental** en el puente.',
      },
      {
        fecha: '2022',
        titulo: 'Debate sobre el castillo',
        texto: '**Reconstrucción parcial** del castillo.',
        href: '/docs/historia/parte-8/cap-42-cea-hacia-el-futuro-memoria-patrimonio-y-comunidad',
      },
    ],
  },
];
