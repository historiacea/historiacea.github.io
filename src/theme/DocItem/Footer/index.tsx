import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import Colaborar from '@site/src/components/Colaborar';

type Props = WrapperProps<typeof FooterType>;

// Añade la llamada a colaborar al pie de todos los capítulos/documentos.
export default function FooterWrapper(props: Props): JSX.Element {
  return (
    <>
      <Colaborar compact />
      <Footer {...props} />
    </>
  );
}
