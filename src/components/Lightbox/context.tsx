import { createContext, useContext } from 'react';
import type { FichaFoto } from '@site/src/data/fichasFotos';

export type LightboxImage = {
  src: string;
  alt?: string;
  ficha?: FichaFoto;
  /** Si es true, `src` apunta a un vídeo y se reproduce en el lightbox. */
  video?: boolean;
};

type LightboxCtx = {
  open: (img: LightboxImage, list?: LightboxImage[], index?: number) => void;
};

export const LightboxContext = createContext<LightboxCtx>({ open: () => {} });

export const useLightbox = () => useContext(LightboxContext);
