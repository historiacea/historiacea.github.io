import MDXComponents from '@theme-original/MDXComponents';
import EpocaTimeline from '@site/src/components/EpocaTimeline';
import CapitulosGrid from '@site/src/components/CapitulosGrid';
import ZoomImg from '@site/src/components/Lightbox/ZoomImg';
import FotoSlider from '@site/src/components/FotoSlider';
import MapaCea from '@site/src/components/MapaCea';
import Colaborar from '@site/src/components/Colaborar';
import GaleriaGrid from '@site/src/components/GaleriaGrid';
import GaleriaCinta from '@site/src/components/GaleriaCinta';
import CastilloPlantas from '@site/src/components/CastilloPlantas';
import VideoSlider from '@site/src/components/VideoSlider';

// Componentes disponibles en todos los .md/.mdx sin necesidad de importarlos.
export default {
  ...MDXComponents,
  EpocaTimeline,
  CapitulosGrid,
  FotoSlider,
  MapaCea,
  Colaborar,
  GaleriaGrid,
  GaleriaCinta,
  CastilloPlantas,
  VideoSlider,
  // Todas las imágenes de markdown abren el lightbox al clicar.
  img: ZoomImg,
};
