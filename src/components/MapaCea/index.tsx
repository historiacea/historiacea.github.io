import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';

// Coordenadas de Cea (León).
const CEA: [number, number] = [-5.0064, 42.4668];

// Coordenadas exactas del castillo (torre).
const CASTILLO: [number, number] = [-5.014586, 42.463532];

// Perímetro real del recinto del castillo (puntos ordenados en sentido horario).
const AREA_CASTILLO: [number, number][] = [
  [-5.015039, 42.463631], // NO
  [-5.014170, 42.463997], // NE
  [-5.013671, 42.463605], // SE
  [-5.014805, 42.463195], // SO
  [-5.015039, 42.463631], // cierre
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

      if (mostrarCastillo) {
        // Marcador del castillo en lugar de Cea.
        new maplibregl.Marker({ color: '#9a3b3f' })
          .setLngLat(CASTILLO)
          .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML('<strong>Castillo de Cea</strong> · siglo XV'))
          .addTo(map);

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
        // Comportamiento original: marcador de Cea.
        new maplibregl.Marker({ color: '#9a3b3f' })
          .setLngLat(CEA)
          .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML('<strong>Cea</strong> · León'))
          .addTo(map);
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
