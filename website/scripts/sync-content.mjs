/**
 * Sync content từ repo gốc Open-Knowledge vào website/docs (Docusaurus).
 * - Không sửa file gốc, chỉ copy + normalize frontmatter.
 * - Scope: TẤT CẢ (publish + draft + trash + transcript thô đều lên web,
 *   draft/transcript được gắn banner + tag để phân biệt).
 * Chạy: npm run sync
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import slugify from 'slugify';

/** Dump frontmatter thủ công: mọi string đều quote kiểu JSON (hợp lệ YAML),
 *  tránh mọi lỗi parse với ký tự đặc biệt (*, :, quote...). */
function dumpFrontmatter(data) {
  const lines = [];
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      lines.push(`${k}:`);
      for (const item of v) lines.push(`  - ${JSON.stringify(String(item))}`);
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      lines.push(`${k}: ${v}`);
    } else {
      lines.push(`${k}: ${JSON.stringify(String(v))}`);
    }
  }
  return `---\n${lines.join('\n')}\n---\n`;
}

/* MDX sanitizer: nội dung gốc là Markdown thuần (WordPress/transcript),
 * MDX sẽ sập khi gặp `{...}` (tưởng JS expression) hoặc `<...` (tưởng JSX).
 * Quy tắc: ngoài fenced code block và inline code span,
 * - escape `{`/`}` chưa escape thành `\{`/`\}` (render ra y hệt `{`/`}`),
 * - escape `<` thành `&lt;` trừ HTML tag an toàn, comment, autolink. */
const SAFE_HTML_TAGS = new Set([
  'a', 'abbr', 'b', 'blockquote', 'br', 'cite', 'code', 'dd', 'del', 'details',
  'div', 'dl', 'dt', 'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4',
  'h5', 'h6', 'hr', 'i', 'iframe', 'img', 'input', 'kbd', 'li', 'mark',
  'ol', 'p', 'pre', 'q', 's', 'small', 'source', 'span', 'strong', 'sub',
  'summary', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr',
  'u', 'ul', 'video',
]);

function sanitizeTextSegment(t) {
  // 1. Xử lý `<`: giữ comment, autolink, tag an toàn; còn lại escape.
  t = t.replace(/<(!)?(\/?)([A-Za-z][A-Za-z0-9-]*)?/g, (m, bang, slash, tag, offset, full) => {
    if (bang) return m; // <!-- comment
    if (!tag) return '&lt;'; // `<1`, `< `, `<>`, `<=`...
    const after = full.slice(offset + m.length);
    if (/^:\/\/[^<>\s]*>/.test(after)) return m; // autolink <https://...>
    if (/^@[^<>\s]+>/.test(after) && !slash) return m; // autolink email <a@b.c>
    if (SAFE_HTML_TAGS.has(tag.toLowerCase())) return m; // tag HTML quen thuộc
    return '&lt;';
  });
  // 2. Escape `{`/`}` chưa được escape (đếm số backslash đứng trước).
  t = t.replace(/(\\*)([{}])/g, (m, bs, br) => (bs.length % 2 === 1 ? m : `${bs}\\${br}`));
  return t;
}

function sanitizeLine(line) {
  // Bỏ qua inline code span (`...`): tách theo backtick, chỉ xử lý đoạn ngoài code.
  const parts = line.split(/(`+)/);
  let inCode = false;
  for (let i = 0; i < parts.length; i++) {
    if (/^`+$/.test(parts[i])) {
      inCode = !inCode;
      continue;
    }
    if (!inCode) parts[i] = sanitizeTextSegment(parts[i]);
  }
  return parts.join('');
}

function sanitizeMdx(body) {
  // Bỏ qua fenced code block (``` / ~~~): mermaid, code mẫu chứa đầy `{}` `<`.
  const lines = body.split('\n');
  let inFence = false;
  let fenceChar = '';
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)(`{3,}|~{3,})/);
    if (m) {
      const ch = m[2][0];
      if (!inFence) {
        inFence = true;
        fenceChar = ch;
      } else if (ch === fenceChar) {
        inFence = false;
      }
      continue;
    }
    if (!inFence) lines[i] = sanitizeLine(lines[i]);
  }
  return lines.join('\n');
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DOCS_ROOT = path.resolve(__dirname, '..', 'docs');

const EXCLUDE_DIRS = new Set(['website', '.git', 'node_modules', '.docusaurus', 'build', '.opencode']);

const TOP_DIR_MAP = {
  AI: 'ai',
  Algorithm: 'algorithm',
  'Asynchronous Programming': 'async-programming',
  'Back End': 'back-end',
  'C++': 'cpp',
  Concept: 'concept',
  'Cyber Security': 'cyber-security',
  DevOps: 'devops',
  'Distributed Systems': 'distributed-systems',
  IPC: 'ipc',
  MongoDB: 'mongodb',
  Network: 'network',
  Nvidia: 'nvidia',
  QML: 'qml',
  'Software Architecture': 'software-architecture',
  'System Programming': 'system-programming',
  Uncategorized: 'uncategorized',
  Virtualization: 'virtualization',
};

const usedOutputs = new Map(); // outRel -> srcRel (detect collision)
const stats = {copied: 0, draft: 0, transcript: 0, collisions: 0, skipped_wp: 0, skipped_meta: 0, skipped_wp_by_top: {}, warnings: []};

// Mô tả ngắn cho từng khóa học ở homepage (fallback: "N bài học").
const CATEGORY_DESC = {
  ai: 'LangChain & LangGraph: AI Agents engineering',
  devops: 'Docker & Kubernetes từ cơ bản đến production',
  kafka: 'Apache Kafka end-to-end: theory, Java, real-world',
};

const LABEL_MAP = {
  ai: 'AI', algorithm: 'Algorithm', 'async-programming': 'Async Programming',
  'back-end': 'Back End', cpp: 'C++', concept: 'Concept',
  'cyber-security': 'Cyber Security', devops: 'DevOps', kafka: 'Apache Kafka',
  ipc: 'IPC', mongodb: 'MongoDB', network: 'Network', nvidia: 'Nvidia', qml: 'QML',
  'software-architecture': 'Software Architecture', 'system-programming': 'System Programming',
  uncategorized: 'Khác', virtualization: 'Virtualization', 'distributed-systems': 'Distributed Systems',
  _draft: 'Bản nháp',
};

function kebab(s) {
  return slugify(s, {lower: true, strict: true, locale: 'vi'});
}

function cleanSegment(seg) {
  // "01. Kafka Introduction" -> "01-introduction"
  // "Apache Kafka" -> "apache-kafka"
  const m = seg.match(/^(\d+)\s*[.\-_]\s*(.*)$/);
  if (m) return `${m[1]}-${kebab(m[2]) || 'part'}`;
  return kebab(seg) || 'section';
}

function sidebarPositionFrom(name) {
  const m = name.match(/^(\d+)\s*[-.\s_]/);
  return m ? parseInt(m[1], 10) : undefined;
}

function splitDatePrefix(basename) {
  // "2025-12-05--back-end-1-tong-quan-khoa-hoc.md" -> {date, slug}
  const m = basename.match(/^(\d{4}-\d{2}-\d{2})--(.+)\.md$/);
  if (m) {
    try {
      return {date: m[1], slug: decodeURIComponent(m[2])};
    } catch {
      return {date: m[1], slug: m[2]};
    }
  }
  return null;
}

function parseSimpleFrontmatter(candidate) {
  // Parser tối giản, tránh sập YAML với ký tự đặc biệt (*, :, ...).
  // Chỉ đọc các key Docusaurus/WordPress cần thiết.
  const fm = {};
  const lines = candidate.split('\n');
  let currentListKey = null;
  for (let li = 0; li < lines.length; li++) {
    const rawLine = lines[li];
    const line = rawLine.replace(/\r$/, '');
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentListKey) {
      let v = listItem[1].trim().replace(/^['"]|['"]$/g, '');
      if (!Array.isArray(fm[currentListKey])) fm[currentListKey] = [];
      fm[currentListKey].push(v);
      continue;
    }
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    if (!kv) {
      currentListKey = null;
      continue;
    }
    const key = kv[1];
    let val = kv[2].trim();
    if (val === '' || val === '[]') {
      // Có thể là list nhiều dòng phía sau
      if (!(key in fm)) fm[key] = [];
      currentListKey = key;
      continue;
    }
    currentListKey = null;
    // Bỏ quote bao ngoài, xử lý folded ">-"/">" đơn giản
    if (/^['"]/.test(val)) {
      const q = val[0];
      // Title xuống dòng: gom các dòng indent tiếp theo tới khi gặp quote đóng
      while (!val.slice(1).includes(q) && li + 1 < lines.length && /^\s+\S/.test(lines[li + 1])) {
        li++;
        val += ' ' + lines[li].trim();
      }
      val = val.replace(/^['"]|['"]$/g, '');
    } else if (/^\[.*\]$/.test(val)) {
      fm[key] = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      continue;
    }
    if (['title', 'description', 'date', 'date_gmt', 'modified', 'slug', 'status', 'author', 'lecture', 'source'].includes(key)) {
      fm[key] = val;
    } else if (['tags', 'categories'].includes(key)) {
      fm[key] = [val];
    }
  }
  if (Array.isArray(fm.tags) && fm.tags.length === 0) delete fm.tags;
  if (Array.isArray(fm.categories) && fm.categories.length === 0) delete fm.categories;
  return fm;
}

function tryParseFrontmatter(raw, srcRel) {
  // Chỉ coi là frontmatter nếu khối --- đóng trong 50 dòng đầu
  // VÀ chứa key quen thuộc (title/slug/date/...). Tránh nhầm hr "---" với frontmatter.
  if (!raw.startsWith('---')) return {fm: {}, body: raw, hasFm: false, isWordPress: false};
  const lines = raw.split('\n');
  let closeIdx = -1;
  for (let i = 1; i < Math.min(lines.length, 50); i++) {
    if (lines[i].trim() === '---') {
      closeIdx = i;
      break;
    }
  }
  if (closeIdx === -1) return {fm: {}, body: raw, hasFm: false, isWordPress: false};
  const candidate = lines.slice(1, closeIdx).join('\n');
  // Bài export từ WordPress (blog) — KHÔNG đưa lên web bài học.
  // Dấu hiệu: wordpress_id hoặc original_url wordpress.com trong frontmatter.
  const isWordPress = /(^|\n)\s*wordpress_id\s*:|wordpress\.com/.test(candidate);
  if (!/^(title|slug|date|tags|categories|description|lecture|source|status|author)\s*:/m.test(candidate)) {
    return {fm: {}, body: raw, hasFm: false, isWordPress};
  }
  try {
    const fm = parseSimpleFrontmatter(candidate);
    if (fm && Object.keys(fm).length > 0) {
      return {fm, body: lines.slice(closeIdx + 1).join('\n'), hasFm: true, isWordPress};
    }
    return {fm: {}, body: raw, hasFm: false, isWordPress};
  } catch (err) {
    stats.warnings.push(`${srcRel}: frontmatter lỗi, giữ nguyên body (${String(err?.message || err).slice(0, 120)})`);
    // Cắt khối frontmatter hỏng, giữ body sau dòng --- đóng
    return {fm: {}, body: lines.slice(closeIdx + 1).join('\n'), hasFm: false, isWordPress};
  }
}

function firstH1(body) {
  const m = body.match(/^ {0,3}#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

/** Tiêu đề lấy từ H1 đôi khi bị bọc bởi dấu trang trí (vd `# ----- Stage 1: Build -----`).
 *  Gọt các run gạch/sao ở hai đầu; nếu còn rỗng thì coi như không có H1. */
function cleanH1Title(h1) {
  if (!h1) return null;
  const cleaned = h1.replace(/^[-—–_*~#\s]+|[-—–_*~#\s]+$/g, '').trim();
  return cleaned || null;
}

function prettyFromSlug(slug) {
  return slug.split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ').slice(0, 80);
}

function mapPathParts(relParts) {
  // relParts: path segments từ repo root, phần tử cuối là filename
  const file = relParts[relParts.length - 1];
  let dirs = relParts.slice(0, -1);
  const isDraftLike =
    dirs.some((d) => /^(draft|trash)$/i.test(d)) || /^__/.test(file) || /trashed/i.test(file);

  // Bỏ segment trung gian "publish"/"blog" để URL ngắn gọn:
  // Uncategorized/publish/x.md -> uncategorized/x.md
  // Kafka/01. X/blog/y.md -> kafka/01-x/y.md
  dirs = dirs.filter((d) => d !== 'publish' && d !== 'blog');

  // Map top-level + Kafka rút gọn
  const mapped = [];
  for (let i = 0; i < dirs.length; i++) {
    const d = dirs[i];
    if (TOP_DIR_MAP[d]) {
      // Distributed Systems/Apache Kafka -> kafka (bỏ distributed-systems)
      if (d === 'Distributed Systems') continue;
      mapped.push(TOP_DIR_MAP[d]);
      continue;
    }
    if (d === 'Apache Kafka') {
      mapped.push('kafka');
      continue;
    }
    if (/^(draft|trash)$/i.test(d)) {
      mapped.push('_draft');
      continue;
    }
    mapped.push(cleanSegment(d));
  }

  let folder = mapped.join('/');
  let slugBase;
  let date;
  let sidebarPos = sidebarPositionFrom(file);

  const dated = splitDatePrefix(file);
  if (dated) {
    date = dated.date;
    slugBase = kebab(dated.slug) || 'bai-viet';
  } else {
    const raw = file.replace(/\.md$/, '');
    try {
      slugBase = kebab(decodeURIComponent(raw)) || 'bai-viet';
    } catch {
      slugBase = kebab(raw) || 'bai-viet';
    }
  }
  if (slugBase === 'index') slugBase = `${slugBase}-bai-viet`;

  // folder cho file draft ở root của category: vd Algorithm/draft/x.md -> algorithm/_draft/x
  if (isDraftLike && !folder.includes('_draft')) folder = folder ? `${folder}/_draft` : '_draft';

  return {folder, slugBase, date, sidebarPos, isDraftLike};
}

function walk(dir, out = [], isRoot = true) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    if (EXCLUDE_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out, false);
    // Bỏ file .md nằm trực tiếp ở repo root (vd README.md):
    // - không thuộc category nào, writeIntro() đã đưa nó thành docs/intro.md;
    // - nếu sync, Docusaurus sẽ coi readme.md là docs home và chiếm route `/`.
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md') && !isRoot) out.push(full);
  }
  return out;
}

function uniqueOutRel(folder, slugBase) {
  let rel = folder ? `${folder}/${slugBase}.md` : `${slugBase}.md`;
  let i = 2;
  while (usedOutputs.has(rel)) {
    rel = folder ? `${folder}/${slugBase}-${i}.md` : `${slugBase}-${i}.md`;
    i++;
  }
  if (rel !== (folder ? `${folder}/${slugBase}.md` : `${slugBase}.md`)) stats.collisions++;
  return rel;
}

function normalizeFile(srcFull) {
  const srcRel = path.relative(REPO_ROOT, srcFull);
  const relParts = srcRel.split(path.sep);
  if (relParts[0] === 'website') return;

  // Đọc UTF-8, loại bỏ BOM (\uFEFF) và null byte:
  // BOM làm hỏng match `---` frontmatter và `^#` H1 ở dòng đầu.
  const raw = fs.readFileSync(srcFull, 'utf8').replace(/\0/g, '').replace(/^\uFEFF/, '');
  const {fm: parsedFm, body: parsedBody, hasFm, isWordPress} = tryParseFrontmatter(raw, srcRel);
  // Loại bài export WordPress (blog) khỏi web bài học — file gốc trong repo giữ nguyên.
  if (isWordPress) {
    stats.skipped_wp++;
    const top = relParts[0];
    stats.skipped_wp_by_top[top] = (stats.skipped_wp_by_top[top] || 0) + 1;
    return;
  }
  // Bỏ file meta bắt đầu bằng `_` (vd `_PROMPT ...md`) — không phải bài học.
  const baseName = relParts[relParts.length - 1];
  if (baseName.startsWith('_')) {
    stats.skipped_meta++;
    return;
  }
  let fm = parsedFm;
  let body = parsedBody;

  const {folder, slugBase, date, sidebarPos, isDraftLike} = mapPathParts(relParts);
  const isTranscript = !hasFm;
  if (isTranscript) stats.transcript++;
  if (isDraftLike) stats.draft++;

  const title = fm.title || cleanH1Title(firstH1(body)) || prettyFromSlug(slugBase);
  let tags = fm.tags || [];
  if (typeof tags === 'string') tags = [tags];
  tags = tags.map(String).filter(Boolean);
  if (isDraftLike && !tags.includes('draft')) tags.push('draft');
  if (isTranscript && !tags.includes('transcript')) tags.push('transcript');

  const outFm = {...fm};
  outFm.title = String(title).slice(0, 120);
  if (date && !outFm.date) outFm.date = date;
  if (tags.length) outFm.tags = tags;
  if (sidebarPos !== undefined && outFm.sidebar_position === undefined) outFm.sidebar_position = sidebarPos;

  let banner = '';
  if (isDraftLike) {
    banner = `:::info Bản nháp\nNội dung từ thư mục \`draft/trash\` trong repo gốc (\`${srcRel}\`). Vẫn hiển thị để tra cứu đầy đủ.\n:::\n\n`;
  } else if (isTranscript) {
    banner = `:::note Transcript thô\nBài này là transcript gốc (\`${srcRel}\`). Bản biên tập tiếng Việt (nếu có) nằm cùng thư mục.\n:::\n\n`;
  }
  const footer = `\n\n---\n*Nguồn: \`${srcRel}\`*`;

  const outRel = uniqueOutRel(folder, slugBase);
  usedOutputs.set(outRel, srcRel);
  const outFull = path.join(DOCS_ROOT, ...outRel.split('/'));
  fs.mkdirSync(path.dirname(outFull), {recursive: true});
  const safeBody = sanitizeMdx(body);
  const out = `${dumpFrontmatter(outFm)}\n${banner}${safeBody.trim()}${footer}\n`;
  fs.writeFileSync(outFull, out);
  stats.copied++;
}

function writeCategoryMeta() {
  // _category_.json cho từng folder để sidebar autogenerated có label + index page
  const walkDirs = (dir, depth) => {
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
      if (!e.isDirectory()) continue;
      const full = path.join(dir, e.name);
      const meta = {
        label: LABEL_MAP[e.name] || prettyFromSlug(e.name),
        link: {type: 'generated-index', description: `Tất cả bài viết trong ${e.name}`},
      };
      // Category cấp 1 -> slug tường minh (/ai, /kafka...) để URL đẹp
      // và khớp với homepage. Category lồng nhau giữ default (/category/...)
      // để tránh đụng độ slug (vd 01-introduction xuất hiện ở nhiều khóa học).
      if (depth === 1) meta.link.slug = `/${e.name}`;
      fs.writeFileSync(path.join(full, '_category_.json'), JSON.stringify(meta, null, 2));
      walkDirs(full, depth + 1);
    }
  };
  if (fs.existsSync(DOCS_ROOT)) walkDirs(DOCS_ROOT, 1);
}

function countMdRecursive(dir) {
  let n = 0;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) n += countMdRecursive(full);
    else if (e.isFile() && e.name.endsWith('.md')) n++;
  }
  return n;
}

/** Sinh src/data/categories.json cho homepage: chỉ các category cấp 1 còn bài học,
 *  kèm số bài để render cards động + kicker tổng số bài. */
function writeCategoriesJson() {
  const cats = [];
  if (!fs.existsSync(DOCS_ROOT)) return cats;
  for (const e of fs.readdirSync(DOCS_ROOT, {withFileTypes: true})) {
    if (!e.isDirectory() || e.name.startsWith('_')) continue;
    const count = countMdRecursive(path.join(DOCS_ROOT, e.name));
    if (count === 0) continue;
    cats.push({
      key: e.name,
      name: LABEL_MAP[e.name] || prettyFromSlug(e.name),
      desc: CATEGORY_DESC[e.name] || `${count} bài học`,
      to: `/${e.name}`,
      count,
    });
  }
  cats.sort((a, b) => b.count - a.count);
  const totalDocs = cats.reduce((s, c) => s + c.count, 0);
  const outDir = path.resolve(__dirname, '..', 'src', 'data');
  fs.mkdirSync(outDir, {recursive: true});
  fs.writeFileSync(path.join(outDir, 'categories.json'), JSON.stringify({categories: cats, totalDocs}, null, 2));
  return cats;
}

function writeIntro() {
  const readmePath = path.join(REPO_ROOT, 'README.md');
  if (!fs.existsSync(readmePath)) return;
  const readme = fs.readFileSync(readmePath, 'utf8');
  const fm = {
    title: 'Open-Knowledge — Tổng quan',
    sidebar_position: 0,
    tags: ['overview'],
  };
  const body = `${readme.trim()}\n\n---\n*Trang này được sync tự động từ \`README.md\` ở repo root.*\n`;
  fs.writeFileSync(path.join(DOCS_ROOT, 'intro.md'), `${dumpFrontmatter(fm)}\n${body}`);
}

// --- main ---
fs.rmSync(DOCS_ROOT, {recursive: true, force: true});
fs.mkdirSync(DOCS_ROOT, {recursive: true});

const files = walk(REPO_ROOT).sort();
for (const f of files) normalizeFile(f);
writeCategoryMeta();
writeIntro();
const cats = writeCategoriesJson();

console.log(`[sync] copied=${stats.copied} draft=${stats.draft} transcript=${stats.transcript} collisions=${stats.collisions} skipped_wp=${stats.skipped_wp} skipped_meta=${stats.skipped_meta}`);
console.log(`[sync] categories: ${cats.map((c) => `${c.key}(${c.count})`).join(', ') || '(none)'}`);
if (Object.keys(stats.skipped_wp_by_top).length) {
  console.log(`[sync] wordpress skipped by top dir: ${JSON.stringify(stats.skipped_wp_by_top)}`);
}
if (stats.warnings.length) {
  console.log(`[sync] warnings (${stats.warnings.length}):`);
  for (const w of stats.warnings.slice(0, 20)) console.log('  -', w);
}
