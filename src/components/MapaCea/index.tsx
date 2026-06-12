import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';

/**
 * Mapa interactivo centrado en Cea (León). Usa MapLibre GL (API compatible
 * con Mapbox GL) con tiles vectoriales gratuitos de OpenFreeMap, así no se
 * necesita token. Vista inclinada para dar sensación 3D.
 *
 * Uso en markdown:  <MapaCea />  o  <MapaCea zoom={12} alto={380} />
 * `marcadores` admite puntos extra: [{lng, lat, titulo, color?}]
 */

// Coordenadas de Cea (León). Ajustables si hiciera falta afinar.
const CEA: [number, number] = [-5.0064, 42.4668];

type Marcador = { lng: number; lat: number; titulo: string; color?: string };

type Props = {
  lng?: number;
  lat?: number;
  zoom?: number;
  pitch?: number;
  alto?: number;
  marcadores?: Marcador[];
};

export default function MapaCea({
  lng = CEA[0],
  lat = CEA[1],
  zoom = 13.5,
  pitch = 55,
  alto = 440,
  marcadores = [],
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import('maplibre-gl').Map | undefined;
    let cancelado = false;

    // Carga diferida: maplibre toca window, así evitamos problemas de SSR.
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
      map.scrollZoom.disable(); // evita robar el scroll de la página
      map.on('click', () => map?.scrollZoom.enable());

      // Marcador principal: Cea.
      new maplibregl.Marker({ color: '#9a3b3f' })
        .setLngLat(CEA)
        .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML('<strong>Cea</strong> · León'))
        .addTo(map);

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
