const { algoliasearch } = require('algoliasearch');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

require('dotenv').config();

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_INDEX_NAME = 'historiacea';

console.log('🔧 Configuración de Algolia:');
console.log('App ID:', ALGOLIA_APP_ID);
console.log('Admin API Key:', ALGOLIA_ADMIN_API_KEY ? '***' + ALGOLIA_ADMIN_API_KEY.slice(-4) : 'NO ENCONTRADA');
console.log('Index Name:', ALGOLIA_INDEX_NAME);

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

function readMarkdownFiles(dir, baseUrl = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...readMarkdownFiles(fullPath, path.join(baseUrl, item)));
    } else if ((item.endsWith('.md') || item.endsWith('.mdx')) && item !== 'portada.md' && item !== 'portada.mdx') {
      files.push({ path: fullPath, url: path.join(baseUrl, item.replace(/\.(md|mdx)$/, '')) });
    }
  });
  return files;
}

function cleanMarkdown(text) {
  return text
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`(.*?)`/g, '$1')
    .replace(/:::[\w]*\n?/g, '')
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Genera registros en formato DocSearch que espera el widget de Docusaurus.
// Cada fichero produce un registro "lvl0" (sección) y uno por párrafo como "content".
function processFile(filePath, url) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(raw);

    const cleanUrl = 'https://historiacea.github.io/' + url.replace(/\\/g, '/');
    const title = frontmatter.title || path.basename(filePath, path.extname(filePath));

    // Extraer sección de nivel superior del path (castillo, historia, etc.)
    const parts = url.replace(/\\/g, '/').split('/');
    const section = parts.length > 1 ? parts[1] : parts[0];
    const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);

    const records = [];

    // Registro principal del documento (tipo lvl0 para DocSearch)
    records.push({
      objectID: cleanUrl,
      type: 'lvl1',
      url: cleanUrl,
      hierarchy: {
        lvl0: 'Historia de Cea',
        lvl1: title,
        lvl2: null,
        lvl3: null,
        lvl4: null,
        lvl5: null,
        lvl6: null,
      },
      content: null,
      weight: { pageRank: 1, level: 80, position: 0 },
      _tags: [sectionLabel, 'docs'],
    });

    // Registros de contenido por párrafo (tipo content para DocSearch)
    const paragraphs = markdownContent
      .split(/\n{2,}/)
      .map(p => cleanMarkdown(p))
      .filter(p => p.length > 40);

    paragraphs.slice(0, 10).forEach((paragraph, i) => {
      const chunk = paragraph.length > 2000 ? paragraph.slice(0, 2000) + '…' : paragraph;
      records.push({
        objectID: `${cleanUrl}#p${i}`,
        type: 'content',
        url: cleanUrl,
        hierarchy: {
          lvl0: 'Historia de Cea',
          lvl1: title,
          lvl2: null,
          lvl3: null,
          lvl4: null,
          lvl5: null,
          lvl6: null,
        },
        content: chunk,
        weight: { pageRank: 0, level: 10, position: i },
        _tags: [sectionLabel, 'docs'],
      });
    });

    return records;
  } catch (error) {
    console.error(`Error procesando ${filePath}:`, error.message);
    return [];
  }
}

async function indexContent() {
  console.log('🔍 Iniciando indexación de contenido...');

  try {
    const records = [];

    console.log('📚 Procesando documentación...');
    const docsFiles = readMarkdownFiles('./docs', 'docs');
    docsFiles.forEach(file => {
      records.push(...processFile(file.path, file.url));
    });

    if (fs.existsSync('./blog')) {
      console.log('📝 Procesando blog...');
      const blogFiles = readMarkdownFiles('./blog', 'blog');
      blogFiles.forEach(file => {
        records.push(...processFile(file.path, file.url));
      });
    }

    console.log(`📊 Total de registros a indexar: ${records.length}`);

    // Configurar el índice con los atributos que usa DocSearch
    console.log('⚙️ Configurando índice...');
    await client.setSettings({
      indexName: ALGOLIA_INDEX_NAME,
      indexSettings: {
        searchableAttributes: [
          'unordered(hierarchy.lvl0)',
          'unordered(hierarchy.lvl1)',
          'unordered(hierarchy.lvl2)',
          'unordered(hierarchy.lvl3)',
          'unordered(hierarchy.lvl4)',
          'unordered(hierarchy.lvl5)',
          'unordered(hierarchy.lvl6)',
          'content',
        ],
        attributesToSnippet: ['hierarchy.lvl1:10', 'hierarchy.lvl2:10', 'content:30'],
        attributesToHighlight: ['hierarchy', 'content'],
        attributesForFaceting: ['type', '_tags'],
        distinct: true,
        attributeForDistinct: 'url',
        customRanking: ['desc(weight.pageRank)', 'desc(weight.level)', 'asc(weight.position)'],
      },
    });

    if (records.length > 0) {
      // Borrar registros anteriores para evitar duplicados
      console.log('🗑️ Limpiando índice anterior...');
      await client.clearObjects({ indexName: ALGOLIA_INDEX_NAME });

      console.log('⬆️ Subiendo contenido a Algolia...');
      await client.saveObjects({ indexName: ALGOLIA_INDEX_NAME, objects: records });
      console.log(`✅ Indexación completada! ${records.length} registros indexados.`);
    } else {
      console.log('❌ No se encontraron registros para indexar.');
    }

  } catch (error) {
    console.error('❌ Error durante la indexación:', error);
  }
}

if (require.main === module) {
  indexContent();
}

module.exports = { indexContent };
