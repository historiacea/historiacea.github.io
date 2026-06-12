/**
 * Plugin remark: agrupa 2 o más imágenes consecutivas de un documento en un
 * componente <FotoSlider imgs='[...]'/>, sin necesidad de tocar el markdown.
 * Una imagen suelta se queda como está (y abre el lightbox al clicar).
 */

// ¿Es un párrafo que solo contiene imágenes (y espacios/saltos)?
function esParrafoDeImagenes(node) {
  if (node.type !== 'paragraph' || !node.children?.length) return false;
  let tieneImagen = false;
  for (const c of node.children) {
    if (c.type === 'image') tieneImagen = true;
    else if (c.type === 'text' && !c.value.trim()) continue;
    else if (c.type === 'break') continue;
    else return false;
  }
  return tieneImagen;
}

function imagenesDe(parrafos) {
  return parrafos.flatMap((p) => p.children.filter((c) => c.type === 'image').map((i) => i.url));
}

export default function remarkFotoSlider() {
  return (tree) => {
    const out = [];
    let run = [];

    const flush = () => {
      const imgs = imagenesDe(run);
      if (imgs.length >= 2) {
        out.push({
          type: 'mdxJsxFlowElement',
          name: 'FotoSlider',
          attributes: [{ type: 'mdxJsxAttribute', name: 'imgs', value: JSON.stringify(imgs) }],
          children: [],
        });
      } else {
        out.push(...run);
      }
      run = [];
    };

    for (const node of tree.children) {
      if (esParrafoDeImagenes(node)) {
        run.push(node);
      } else {
        flush();
        out.push(node);
      }
    }
    flush();
    tree.children = out;
  };
}
