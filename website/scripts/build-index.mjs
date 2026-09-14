/**
 * Quét toàn bộ *.md ở repo gốc -> public/docs-index.json + copy .md vào public/docs/.
 * Chạy: node scripts/build-index.mjs (tự chạy qua predev / prebuild).
 * Không sửa file gốc. Không cần dependency ngoài.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'docs');
const INDEX_OUT = path.resolve(__dirname, '..', 'public', 'docs-index.json');

const EXCLUDE_DIRS = new Set(['website', '.git', 'node_modules', 'build', 'dist', '.docusaurus', '.opencode', '.vscode']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (EXCLUDE_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name), out);
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}

/** Parse frontmatter tối giản, chịu được ký tự đặc biệt (*, :, quote...). */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let listKey = null;
  for (const rawLine of m[1].split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    const li = line.match(/^\s*-\s+(.*)$/);
    if (li && listKey) {
      let v = li[1].trim().replace(/^['"]|['"]$/g, '');
      if (!Array.isArray(data[listKey])) data[listKey] = [];
      data[listKey].push(v);
      continue;
    }
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    if (!kv) { listKey = null; continue; }
    let val = kv[2].trim().replace(/^['"]|['"]$/g, '');
    if (val === '' || val === '[]') { data[kv[1]] = []; listKey = kv[1]; continue; }
    listKey = null;
    if (val.startsWith('[') && val.endsWith(']')) {
      data[kv[1]] = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    } else {
      data[kv[1]] = val;
    }
  }
  return { data, body: raw.slice(m[0].length) };
}

function stripDatePrefix(base) {
  const m = base.match(/^(\d{4}-\d{2}-\d{2})--(.+)\.md$/i);
  if (m) return { date: m[1], rest: m[2] };
  return { date: null, rest: base.replace(/\.md$/i, '') };
}

function fallbackTitle(body, base) {
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/[#*`_~]/g, '').trim().slice(0, 140);
  const { rest } = stripDatePrefix(base);
  return rest.replace(/[-_]+/g, ' ').trim().slice(0, 140) || 'Untitled';
}

function excerptOf(body, len = 220) {
  const t = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_\-~|+]/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return t.slice(0, len);
}

const files = walk(REPO_ROOT);
const docs = [];

for (const abs of files) {
  const rel = path.relative(REPO_ROOT, abs).split(path.sep).join('/');
  let raw;
  try {
    raw = fs.readFileSync(abs, 'utf8');
  } catch {
    continue;
  }
  const { data, body } = parseFrontmatter(raw);
  const base = rel.split('/').pop();
  const { date: prefixDate } = stripDatePrefix(base);
  const title = (typeof data.title === 'string' && data.title.trim()) || fallbackTitle(body, base);
  const parts = rel.split('/');
  const top = parts.length > 1 ? parts[0] : 'Tổng quan';
  const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  const id = rel.replace(/\.md$/i, '');
  docs.push({
    id,
    title,
    file: rel,
    top,
    dir,
    date: (typeof data.date === 'string' && data.date) || prefixDate || null,
    categories: Array.isArray(data.categories) ? data.categories : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: excerptOf(body),
  });

  // Copy nguyên file .md sang public/docs giữ nguyên cây thư mục
  const dest = path.join(OUT_DIR, ...rel.split('/'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(abs, dest);
}

docs.sort((a, b) => a.file.localeCompare(b.file, 'vi'));

const tops = {};
for (const d of docs) tops[d.top] = (tops[d.top] || 0) + 1;

fs.mkdirSync(path.dirname(INDEX_OUT), { recursive: true });
fs.writeFileSync(INDEX_OUT, JSON.stringify({ total: docs.length, tops, docs }, null, 1), 'utf8');

console.log(`[build-index] ${docs.length} markdown -> public/docs + docs-index.json`);
console.log(`[build-index] topics: ${Object.entries(tops).map(([k, v]) => `${k}(${v})`).join(', ')}`);
