import { useLightbox } from './context';
import styles from './zoomimg.module.css';

/**
 * Reemplazo del <img> de markdown: misma imagen, pero al clicar se abre en
 * el lightbox a pantalla completa. Se registra como `img` en MDXComponents,
 * así afecta a todas las imágenes de los capítulos sin tocar el contenido.
 */
export default function ZoomImg(props: JSX.IntrinsicElements['img']): JSX.Element {
  const { open } = useLightbox();
  const { src, alt, ...rest } = props;

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      loading="lazy"
      className={styles.zoomable}
      role="button"
      tabIndex={0}
      onClick={() => src && open({ src: String(src), alt: alt ? String(alt) : undefined })}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && src) {
          e.preventDefault();
          open({ src: String(src), alt: alt ? String(alt) : undefined });
        }
      }}
    />
  );
}
