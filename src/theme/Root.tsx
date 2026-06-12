import LightboxProvider from '@site/src/components/Lightbox';

// theme/Root envuelve toda la app y persiste entre navegaciones SPA.
// Aquí montamos el proveedor del lightbox una sola vez para todo el sitio.
export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
  return <LightboxProvider>{children}</LightboxProvider>;
}
