import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';

const MAPTILER_KEY = 'lHhxlYuJjTH7DBRZ3lUu';

// Coordenadas de Cea (León) — posición del castillo como referencia del pueblo.
const CEA: [number, number] = [-5.014586, 42.463532];

// Coordenadas exactas del castillo (torre).
const CASTILLO: [number, number] = [-5.014586, 42.463532];

// Perímetro del recinto — 5 puntos ordenados en sentido horario desde el NO.
const AREA_CASTILLO: [number, number][] = [
  [-5.014934915592952, 42.46365645136357],  // NO
  [-5.014022964547425, 42.46402052759204],  // N
  [-5.013773519114383, 42.463763300041414], // NE
  [-5.013894218517468, 42.46370393968734],  // E
  [-5.014607686100145, 42.463290394325455], // S
  [-5.014934915592952, 42.46365645136357],  // cierre
];

type Marcador = { lng: number; lat: number; titulo: string; color?: string };

type Props = {
  lng?: number;
  lat?: number;
  zoom?: number;
  pitch?: number;
  bearing?: number;
  alto?: number;
  marcadores?: Marcador[];
  mostrarCastillo?: boolean;
};

export default function MapaCea({
  lng = CEA[0],
  lat = CEA[1],
  zoom = 13.5,
  pitch = 55,
  bearing = -12,
  alto = 440,
  marcadores = [],
  mostrarCastillo = false,
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import('maplibre-gl').Map | undefined;
    let cancelado = false;

    import('maplibre-gl').then((maplibregl) => {
      if (cancelado || !ref.current) return;

      map = new maplibregl.Map({
        container: ref.current,
        style: `https://api.maptiler.com/maps/satellite/style.json?key=${MAPTILER_KEY}`,
        center: [lng, lat],
        zoom,
        pitch,
        bearing,
        attributionControl: { compact: true },
      });

      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.scrollZoom.disable();
      map.on('click', () => map?.scrollZoom.enable());

      // Terreno 3D con DEM de MapTiler
      map.on('load', () => {
        map!.addSource('terrain-dem', {
          type: 'raster-dem',
          url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${MAPTILER_KEY}`,
          tileSize: 256,
        });

        map!.setTerrain({ source: 'terrain-dem', exaggeration: 1.8 });

        // Polígono del castillo (solo en modo castillo)
        if (mostrarCastillo) {
          map!.addSource('castillo-area', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'Polygon', coordinates: [AREA_CASTILLO] },
              properties: {},
            },
          });
          map!.addLayer({
            id: 'castillo-fill',
            type: 'fill',
            source: 'castillo-area',
            paint: { 'fill-color': '#9a3b3f', 'fill-opacity': 0.2 },
          });
          map!.addLayer({
            id: 'castillo-border',
            type: 'line',
            source: 'castillo-area',
            paint: { 'line-color': '#9a3b3f', 'line-width': 2.5, 'line-dasharray': [4, 2] },
          });
        }
      });

      // Marcador con icono PNG
      function crearIcono(lngLat: [number, number], popup: string) {
        const el = document.createElement('div');
        el.style.cssText = 'width:42px;height:42px;cursor:pointer;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6))';
        const img = document.createElement('img');
        img.src = '/img/marker-castillo.png';
        img.style.cssText = 'width:100%;height:100%;object-fit:contain';
        el.appendChild(img);
        new maplibregl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat(lngLat)
          .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML(popup))
          .addTo(map!);
      }

      if (mostrarCastillo) {
        crearIcono(
          CASTILLO,
          `<strong>Castillo de Cea</strong><br>
          <span style="font-size:0.82rem;color:#666">Torre artillera · siglo XV</span><br>
          <a href="https://www.google.com/maps?q=42.463532,-5.014586" target="_blank" rel="noopener noreferrer"
             style="display:inline-block;margin-top:6px;font-size:0.8rem;color:#9a3b3f;font-weight:600">
            📍 Ver en Google Maps
          </a>`
        );
      } else {
        crearIcono(
          CEA,
          `<strong>Cea</strong> · León<br>
          <a href="https://www.google.com/maps?q=42.4668,-5.0064" target="_blank" rel="noopener noreferrer"
             style="display:inline-block;margin-top:6px;font-size:0.8rem;color:#9a3b3f;font-weight:600">
            📍 Ver en Google Maps
          </a>`
        );
      }

      for (const m of marcadores) {
        new maplibregl.Marker({ color: m.color ?? '#a9852f' })
          .setLngLat([m.lng, m.lat])
          .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML(`<strong>${m.titulo}</strong>`))
          .addTo(map);
      }
    });

    return () => {
      cancelado = true;
      map?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.marco} style={{ height: alto }}>
      <div ref={ref} className={styles.mapa} />
    </div>
  );
}
