import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';

// Coordenadas de Cea (León).
const CEA: [number, number] = [-5.0064, 42.4668];

// Coordenadas exactas del castillo (torre).
const CASTILLO: [number, number] = [-5.014586, 42.463532];

// Perímetro real del recinto del castillo (6 puntos GPS exactos).
const AREA_CASTILLO: [number, number][] = [
  [-5.014934915592952, 42.46365645136357],
  [-5.014607686100145, 42.463290394325455],
  [-5.014022964547425, 42.46402052759204],
  [-5.013773519114383, 42.463763300041414],
  [-5.01430996090587,  42.46384244709264],
  [-5.013894218517468, 42.46370393968734],
  [-5.014934915592952, 42.46365645136357], // cierre
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
        style: {
          version: 8,
          sources: {
            esri: {
              type: 'raster',
              tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
              tileSize: 256,
              attribution: '© Esri, Maxar, Earthstar Geographics',
            },
          },
          layers: [{ id: 'esri-satellite', type: 'raster', source: 'esri' }],
        },
        center: [lng, lat],
        zoom,
        pitch,
        bearing,
        attributionControl: { compact: true },
      });

      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.scrollZoom.disable();
      map.on('click', () => map?.scrollZoom.enable());

      // Crea un marcador con el icono PNG del castillo.
      function crearIcono(lngLat: [number, number], popup: string) {
        const el = document.createElement('div');
        el.style.cssText = 'width:40px;height:40px;cursor:pointer;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))';
        const img = document.createElement('img');
        img.src = '/img/logo-icono.png';
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
          `<strong>Castillo de Cea</strong><br><span style="font-size:0.82rem;color:#666">Torre artillera · siglo XV</span><br>
          <a href="https://www.google.com/maps?q=42.463532,-5.014586" target="_blank" rel="noopener noreferrer"
             style="display:inline-block;margin-top:6px;font-size:0.8rem;color:#9a3b3f;font-weight:600">
            📍 Ver en Google Maps
          </a>`
        );

        // Polígono del recinto cuando el mapa cargue.
        map.on('load', () => {
          map!.addSource('castillo-area', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [AREA_CASTILLO],
              },
              properties: {},
            },
          });

          map!.addLayer({
            id: 'castillo-fill',
            type: 'fill',
            source: 'castillo-area',
            paint: {
              'fill-color': '#9a3b3f',
              'fill-opacity': 0.18,
            },
          });

          map!.addLayer({
            id: 'castillo-border',
            type: 'line',
            source: 'castillo-area',
            paint: {
              'line-color': '#9a3b3f',
              'line-width': 2.5,
              'line-dasharray': [4, 2],
            },
          });
        });
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
