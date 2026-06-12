import { createContext, useContext } from 'react';
import type { FichaFoto } from '@site/src/data/fichasFotos';

export type LightboxImage = {
  src: string;
  alt?: string;
  /** Ficha de archivo opcional: se muestra junto a la imagen. */
  ficha?: FichaFoto;
};

type LightboxCtx = {
  open: (img: LightboxImage) => void;
};

export const LightboxContext = createContext<LightboxCtx>({ open: () => {} });

export const useLightbox = () => useContext(LightboxContext);
