const { algoliasearch } = require('algoliasearch');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Cargar variables de entorno
require('dotenv').config();

// Configuración de Algolia (reemplaza con tus credenciales)
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_INDEX_NAME = 'historiacea';

console.log('🔧 Configuración de Algolia:');
console.log('App ID:', ALGOLIA_APP_ID);
console.log('Admin API Key:', ALGOLIA_ADMIN_API_KEY ? '***' + ALGOLIA_ADMIN_API_KEY.slice(-4) : 'NO ENCONTRADA');
console.log('Index Name:', ALGOLIA_INDEX_NAME);

// Inicializar cliente de Algolia
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

// Función para leer archivos markdown recursivamente
function readMarkdownFiles(dir, baseUrl = '') {
  const files = [];
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...readMarkdownFiles(fullPath, path.join(baseUrl, item)));
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      files.push({
        path: fullPath,
        url: path.join(baseUrl, item.replace(/\.(md|mdx)$/, ''))
      });
    }
  });

  return files;
}

// Función para procesar contenido markdown
function processMarkdownContent(filePath, url) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    const { data: frontmatter, content: markdownContent } = parsed;

    // Limpiar el contenido markdown (remover sintaxis básica)
    const cleanContent = markdownContent
      .replace(/#{1,6}\s+/g, '') // Remover headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remover bold
      .replace(/\*(.*?)\*/g, '$1') // Remover italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remover links, mantener texto
      .replace(/```[\s\S]*?```/g, '') // Remover code blocks
      .replace(/`(.*?)`/g, '$1') // Remover inline code
      .replace(/\n+/g, ' ') // Convertir saltos de línea a espacios
      .trim();

    // Algolia limita los registros a ~10.000 bytes; truncamos el contenido
    // dejando margen para el resto de campos (~7.000 chars ≈ 7 KB en UTF-8)
    const MAX_CONTENT = 7000;
    const truncatedContent = cleanContent.length > MAX_CONTENT
      ? cleanContent.slice(0, MAX_CONTENT) + '…'
      : cleanContent;

    return {
      objectID: url.replace(/\\/g, '/'),
      title: frontmatter.title || path.basename(filePath, path.extname(filePath)),
      content: truncatedContent,
      url: `/${url.replace(/\\/g, '/')}`,
      type: filePath.includes('blog') ? 'blog' : 'docs',
      ...frontmatter
    };
  } catch (error) {
    console.error(`Error procesando ${filePath}:`, error.message);
    return null;
  }
}

// Función principal
async function indexContent() {
  console.log('🔍 Iniciando indexación de contenido...');

  try {
    const records = [];

    // Procesar documentación
    console.log('📚 Procesando documentación...');
    const docsFiles = readMarkdownFiles('./docs', 'docs');
    docsFiles.forEach(file => {
      const record = processMarkdownContent(file.path, file.url);
      if (record) records.push(record);
    });

    // Procesar blog (solo si existe la carpeta)
    if (fs.existsSync('./blog')) {
      console.log('📝 Procesando blog...');
      const blogFiles = readMarkdownFiles('./blog', 'blog');
      blogFiles.forEach(file => {
        const record = processMarkdownContent(file.path, file.url);
        if (record) records.push(record);
      });
    }

    console.log(`📊 Total de registros a indexar: ${records.length}`);

    // Subir a Algolia
    if (records.length > 0) {
      console.log('⬆️ Subiendo contenido a Algolia...');
      const result = await client.saveObjects({
        indexName: ALGOLIA_INDEX_NAME,
        objects: records
      });
      console.log(`✅ Indexación completada! ${records.length} objetos indexados.`);
      console.log('📋 Resultado:', result);
    } else {
      console.log('❌ No se encontraron registros para indexar.');
    }

  } catch (error) {
    console.error('❌ Error durante la indexación:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  indexContent();
}

module.exports = { indexContent };