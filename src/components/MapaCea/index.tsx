import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';

// Coordenadas de Cea (León).
const CEA: [number, number] = [-5.0064, 42.4668];

// Coordenadas del castillo (torre).
const CASTILLO: [number, number] = [-5.00555, 42.46815];

// Perímetro aproximado del recinto del castillo (muralla exterior + foso).
const AREA_CASTILLO: [number, number][] = [
  [-5.00635, 42.46870],
  [-5.00555, 42.46905],
  [-5.00455, 42.46870],
  [-5.00415, 42.46810],
  [-5.00435, 42.46750],
  [-5.00515, 42.46710],
  [-5.00620, 42.46730],
  [-5.00665, 42.46790],
  [-5.00635, 42.46870],
];

type Marcador = { lng: number; lat: number; titulo: string; color?: string };

type Props = {
  lng?: number;
  lat?: number;
  zoom?: number;
  pitch?: number;
  alto?: number;
  marcadores?: Marcador[];
  mostrarCastillo?: boolean;
};

export default function MapaCea({
  lng = CEA[0],
  lat = CEA[1],
  zoom = 13.5,
  pitch = 55,
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
        style: 'https://tiles.openfreemap.org/styles/positron',
        center: [lng, lat],
        zoom,
        pitch,
        bearing: -12,
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
