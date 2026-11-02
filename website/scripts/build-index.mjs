/**
 * Quét toàn bộ *.md ở repo gốc -> public/docs-index.json + copy .md vào public/docs/.
 * Chạy: node scripts/build-index.mjs (tự chạy qua predev / prebuild).
 * Không sửa file gốc. Không cần dependency ngoài.
 *
 * Ngoài metadata cơ bản, script suy ra:
 *  - series / seriesSlug / section / chapter: để gom bài theo khóa học
 *  - topic / topicTitle: nhóm cấp cao (AI, BackEnd, Cloud...)
 *  - kind: article | meta (bỏ MUC_LUC, style guide, README khỏi feed)
 *  - words / minutes: thời lượng đọc
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'docs');
const INDEX_OUT = path.resolve(__dirname, '..', 'public', 'docs-index.json');

const EXCLUDE_DIRS = new Set([
  'website',
  '.git',
  'node_modules',
  'build',
  'dist',
  '.docusaurus',
  '.opencode',
  '.vscode',
]);

/* ------------------------------------------------------------------ */
/* Series registry                                                     */
/* ------------------------------------------------------------------ */
// Thứ tự trong mảng cũng là thứ tự ưu tiên hiển thị trên trang Series.
const SERIES = [
  {
    prefix: 'AI/Claude Code',
    slug: 'claude-code',
    title: 'Claude Code & MCP',
    topic: 'AI',
    category: 'AI · AI Agents',
    description:
      'Prompt engineering, custom commands, MCP, subagents, CI/CD và context engineering — bộ bài thực chiến về Claude Code.',
    featured: true,
  },
  {
    prefix: 'AI/Langchain',
    slug: 'langchain',
    title: 'LangChain & Agentic AI',
    topic: 'AI',
    category: 'AI · LangChain',
    description:
      'Từ ReAct, function calling, RAG đến MCP và deep agents — khóa Agentic AI Engineering với LangChain và LangGraph.',
    featured: true,
  },
  {
    prefix: 'AI/LangGraph',
    slug: 'langgraph',
    title: 'LangGraph',
    topic: 'AI',
    category: 'AI · LangGraph',
    description:
      'Xây dựng agent graph, persistence, async, human-in-the-loop và đưa agent lên production với LangGraph.',
    featured: false,
  },
  {
    prefix: 'BackEnd',
    slug: 'backend-engineering',
    title: 'Fundamentals of Backend Engineering',
    topic: 'BackEnd',
    category: 'Backend · Protocols',
    description:
      'Giao tiếp backend, protocol, proxy, load balancing và execution patterns — khóa học nền tảng của Hussein Nasser.',
    featured: false,
  },
  {
    prefix: 'C++/C++ Multithreading',
    slug: 'cpp-multithreading',
    title: 'C++ Multithreading',
    topic: 'C++',
    category: 'C++ · Concurrency',
    description:
      'Thread, mutex, condition variable, atomic, lock-free và những bài toán kinh điển của lập trình đa luồng trong C++.',
    featured: true,
  },
  {
    prefix: 'C++/Modern C++',
    slug: 'modern-cpp',
    title: 'Modern C++',
    topic: 'C++',
    category: 'C++ · Modern',
    description:
      'Value semantics, move semantics, smart pointer, container và các tính năng C++11/14/17 qua ví dụ thực tế.',
    featured: false,
  },
  {
    prefix: 'Cloud/AWS/Ultimate AWS Certified Cloud Practitioner CLF',
    slug: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    topic: 'Cloud',
    category: 'Cloud · AWS',
    description:
      'Toàn bộ lộ trình CLF-C02: IAM, EC2, S3, VPC, database, security, billing và các dịch vụ AWS cốt lõi.',
    featured: true,
  },
  {
    prefix: 'DevOps/Docker K8s',
    slug: 'docker-kubernetes',
    title: 'Docker & Kubernetes',
    topic: 'DevOps',
    category: 'DevOps · Containers',
    description:
      'Từ Docker image, volume, compose đến Kubernetes, EKS và deployment thực chiến trên cloud.',
    featured: true,
  },
  {
    prefix: 'Distributed Systems/Apache Kafka',
    slug: 'apache-kafka',
    title: 'Apache Kafka',
    topic: 'Distributed Systems',
    category: 'Distributed Systems · Streaming',
    description:
      'Kafka fundamentals, producer/consumer, CLI, Java API, OpenSearch và vận hành Kafka trong production.',
    featured: false,
  },
  {
    prefix: 'Golang/Learn Go for Beginners Crash Course',
    slug: 'learn-go',
    title: 'Learn Go for Beginners',
    topic: 'Golang',
    category: 'Golang · Fundamentals',
    description:
      'Go từ con số không: types, flow control, strings, web app và bài tập thực hành cho người mới.',
    featured: false,
  },
  {
    prefix: 'Golang/Working with Concurrency in Go',
    slug: 'concurrency-in-go',
    title: 'Concurrency in Go',
    topic: 'Golang',
    category: 'Golang · Concurrency',
    description:
      'Goroutine, channel, race condition, dining philosophers và dự án subscription service hoàn chỉnh.',
    featured: false,
  },
  {
    prefix: 'Nvidia/CUDA programming',
    slug: 'cuda-programming',
    title: 'CUDA Programming',
    topic: 'Nvidia',
    category: 'NVIDIA · GPU',
    description:
      'CPU vs GPU, kiến trúc NVIDIA và tư duy lập trình song song với CUDA.',
    featured: false,
  },
  {
    prefix: 'Nvidia/Nvidia NeMo Agent Toolkit',
    slug: 'nemo-agent-toolkit',
    title: 'NVIDIA NeMo Agent Toolkit',
    topic: 'Nvidia',
    category: 'NVIDIA · Agents',
    description:
      'Thực hành xây dựng và triển khai agent đầu tiên với NVIDIA NeMo Agent Toolkit.',
    featured: false,
  },
  {
    prefix: 'System Design/Mastering System Design From Basics to Cracking Interviews',
    slug: 'system-design-interview',
    title: 'Mastering System Design',
    topic: 'System Design',
    category: 'System Design · Interview',
    description:
      'Từ networking, storage, scalability đến 13 bài thiết kế hệ thống kinh điển và lộ trình phỏng vấn.',
    featured: true,
  },
  {
    prefix: 'System Design/The Complete Microservices & Event-Driven Architecture',
    slug: 'microservices-event-driven',
    title: 'Microservices & Event-Driven Architecture',
    topic: 'System Design',
    category: 'System Design · Architecture',
    description:
      'Migration, event-driven patterns, testing, observability và deployment microservices trong production.',
    featured: false,
  },
];

const TOPIC_META = {
  AI: {
    title: 'AI & Agents',
    description: 'Claude Code, LangChain, LangGraph, MCP và agentic AI.',
    order: 1,
  },
  BackEnd: {
    title: 'Backend Engineering',
    description: 'Giao tiếp backend, protocol, proxy và execution patterns.',
    order: 2,
  },
  'C++': {
    title: 'C++',
    description: 'Modern C++ và lập trình đa luồng.',
    order: 3,
  },
  Cloud: {
    title: 'Cloud & AWS',
    description: 'AWS Cloud Practitioner từ nền tảng đến các dịch vụ cốt lõi.',
    order: 4,
  },
  DevOps: {
    title: 'DevOps',
    description: 'Docker, Kubernetes, deployment và vận hành hệ thống.',
    order: 5,
  },
  'Distributed Systems': {
    title: 'Distributed Systems',
    description: 'Kafka, event streaming và hệ phân tán.',
    order: 6,
  },
  Golang: {
    title: 'Golang',
    description: 'Go căn bản và concurrency thực chiến.',
    order: 7,
  },
  Nvidia: {
    title: 'NVIDIA & GPU',
    description: 'CUDA và NVIDIA NeMo Agent Toolkit.',
    order: 8,
  },
  'System Design': {
    title: 'System Design',
    description: 'Thiết kế hệ thống, microservices và event-driven architecture.',
    order: 9,
  },
};

const TOPIC_FALLBACK = {
  title: 'Tổng quan',
  description: 'Các bài viết tổng hợp.',
  order: 99,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
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
function parseFrontmatter(input) {
  const raw = input.replace(/^\uFEFF/, '');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let listKey = null;
  for (const rawLine of m[1].split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    const li = line.match(/^\s*-\s+(.*)$/);
    if (li && listKey) {
      const v = li[1].trim().replace(/^['"]|['"]$/g, '');
      if (!Array.isArray(data[listKey])) data[listKey] = [];
      data[listKey].push(v);
      continue;
    }
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/);
    if (!kv) {
      listKey = null;
      continue;
    }
    let val = kv[2].trim().replace(/^['"]|['"]$/g, '');
    if (val === '' || val === '[]') {
      data[kv[1]] = [];
      listKey = kv[1];
      continue;
    }
    listKey = null;
    if (val.startsWith('[') && val.endsWith(']')) {
      data[kv[1]] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
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

function decodeEntities(value) {
  return String(value ?? '')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&');
}

function cleanTitle(value) {
  return decodeEntities(value)
    .replace(/^#+\s*/, '')
    .replace(/^[\p{Extended_Pictographic}\u200d\uFE0F\s]+/gu, '')
    .replace(/^Bài\s+\d+\s*[-—–:]\s*/iu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function fallbackTitle(body, base) {
  const outsideCode = body.replace(/```[\s\S]*?```/g, '');
  const h1 = outsideCode.match(/^#\s+(.+)$/m);
  if (h1) return cleanTitle(h1[1]).slice(0, 160);
  const { rest } = stripDatePrefix(base);
  return (
    rest
      .replace(/^\d+\s*[-.]?\s*/, '')
      .replace(/[-_]+/g, ' ')
      .trim()
      .slice(0, 160) || 'Untitled'
  );
}

function excerptOf(body, len = 240) {
  const t = decodeEntities(
    body
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/^>\s*Nguồn:.*$/gm, ' ')
      .replace(/^#\s+.*$/gm, ' ')
      .replace(/^>\s*.*$/gm, ' ')
      .replace(/`[^`]*`/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[#>*_\-~|+]/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
  return t.slice(0, len);
}

function countWords(body) {
  const t = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .trim();
  if (!t) return 0;
  return t.split(/\s+/u).filter(Boolean).length;
}

function isMetaFile(rel, base) {
  const b = base.toLowerCase();
  const r = rel.toLowerCase();
  return (
    b === 'readme.md' ||
    b.startsWith('muc_luc') ||
    b.startsWith('_style') ||
    b.startsWith('_prompt') ||
    b.startsWith('_runbook') ||
    r.includes('style guide')
  );
}

function sectionOf(rel, prefix) {
  const rest = rel.slice(prefix.length + 1);
  const parts = rest.split('/');
  parts.pop();
  if (!parts.length) return '';
  const raw = parts[parts.length - 1];
  return raw
    .replace(/^\d+\.\s*/, '')
    .replace(/^Section\s+\d+\s*/i, '')
    .replace(/^\d+\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function naturalCompare(a, b) {
  return a.localeCompare(b, 'vi', { numeric: true, sensitivity: 'base' });
}

function seriesFor(rel) {
  let best = null;
  for (const s of SERIES) {
    if (rel === s.prefix || rel.startsWith(`${s.prefix}/`)) {
      if (!best || s.prefix.length > best.prefix.length) best = s;
    }
  }
  return best;
}

/* ------------------------------------------------------------------ */
/* Scan                                                                */
/* ------------------------------------------------------------------ */
const files = walk(REPO_ROOT);
const docs = [];

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const abs of files) {
  const rel = path.relative(REPO_ROOT, abs).split(path.sep).join('/');
  let raw;
  try {
    raw = fs.readFileSync(abs, 'utf8');
  } catch {
    continue;
  }

  const { data, body } = parseFrontmatter(raw);
  const base = rel.split('/').pop() ?? rel;
  const { date: prefixDate } = stripDatePrefix(base);
  const parts = rel.split('/');
  const topic = parts.length > 1 ? parts[0] : 'Tổng quan';
  const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  const series = seriesFor(rel);
  const kind = isMetaFile(rel, base) ? 'meta' : 'article';
  const rawTitle = (typeof data.title === 'string' && data.title.trim()) || '';
  const title = cleanTitle(rawTitle) || fallbackTitle(body, base);
  const words = countWords(body);
  const fmDate =
    (typeof data.date === 'string' && data.date) || prefixDate || null;
  const date = fmDate ? String(fmDate).slice(0, 10) : null;
  const id = rel.replace(/\.md$/i, '');
  // Tên file an toàn cho URL: hash ngắn, tránh khoảng trắng, &, +, dấu phẩy...
  const contentFile = `${crypto.createHash('sha1').update(id).digest('hex').slice(0, 16)}.md`;

  docs.push({
    id,
    contentFile,
    title,
    file: rel,
    top: series?.topic ?? topic,
    topTitle: TOPIC_META[series?.topic ?? topic]?.title ?? topic,
    dir,
    date,
    categories: Array.isArray(data.categories) ? data.categories : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: excerptOf(body),
    series: series?.title ?? '',
    seriesSlug: series?.slug ?? '',
    seriesCategory: series?.category ?? '',
    section: series ? sectionOf(rel, series.prefix) : dir,
    chapter: 0,
    words,
    minutes: Math.max(1, Math.round(words / 220)),
    kind,
  });

  // Copy file .md sang public/docs với tên an toàn (hash) để mọi path đều fetch được.
  fs.copyFileSync(abs, path.join(OUT_DIR, contentFile));
}

docs.sort((a, b) => naturalCompare(a.file, b.file));

/* ------------------------------------------------------------------ */
/* Chapter numbering + series stats                                    */
/* ------------------------------------------------------------------ */
const bySeries = new Map();
for (const d of docs) {
  if (!d.seriesSlug) continue;
  if (!bySeries.has(d.seriesSlug)) bySeries.set(d.seriesSlug, []);
  bySeries.get(d.seriesSlug).push(d);
}

const seriesOut = SERIES.map((s, index) => {
  const list = (bySeries.get(s.slug) ?? [])
    .filter((d) => d.kind === 'article')
    .sort((a, b) => naturalCompare(a.file, b.file));
  list.forEach((d, i) => {
    d.chapter = i + 1;
  });
  return {
    slug: s.slug,
    title: s.title,
    topic: s.topic,
    topicTitle: TOPIC_META[s.topic]?.title ?? s.topic,
    category: s.category,
    description: s.description,
    count: list.length,
    order: index + 1,
    featured: Boolean(s.featured),
  };
}).filter((s) => s.count > 0);

// Meta docs without a series (README, prompt, runbook) have chapter 0.
const seriesBySlug = new Map(seriesOut.map((s) => [s.slug, s]));

const topicsOut = Object.entries(TOPIC_META)
  .map(([key, meta]) => {
    const list = docs.filter((d) => d.top === key && d.kind === 'article');
    return {
      key,
      title: meta.title,
      description: meta.description,
      order: meta.order,
      count: list.length,
      series: seriesOut.filter((s) => s.topic === key).map((s) => s.slug),
    };
  })
  .filter((t) => t.count > 0)
  .sort((a, b) => a.order - b.order);

// Any topic not covered by the registry (future folders) still shows up.
const known = new Set(topicsOut.map((t) => t.key));
for (const d of docs) {
  if (d.kind !== 'article' || known.has(d.top)) continue;
  known.add(d.top);
  const meta = TOPIC_META[d.top] ?? TOPIC_FALLBACK;
  topicsOut.push({
    key: d.top,
    title: meta.title,
    description: meta.description,
    order: meta.order,
    count: docs.filter((x) => x.top === d.top && x.kind === 'article').length,
    series: seriesOut.filter((s) => s.topic === d.top).map((s) => s.slug),
  });
}

const articleCount = docs.filter((d) => d.kind === 'article').length;
const metaCount = docs.length - articleCount;

const payload = {
  total: docs.length,
  articleCount,
  metaCount,
  generatedAt: new Date().toISOString(),
  topics: topicsOut,
  series: seriesOut,
  docs,
};

fs.mkdirSync(path.dirname(INDEX_OUT), { recursive: true });
fs.writeFileSync(INDEX_OUT, JSON.stringify(payload), 'utf8');

console.log(
  `[build-index] ${docs.length} markdown (${articleCount} bài, ${metaCount} meta) -> public/docs + docs-index.json`,
);
console.log(
  `[build-index] series: ${seriesOut.map((s) => `${s.slug}(${s.count})`).join(', ')}`,
);
console.log(
  `[build-index] topics: ${topicsOut.map((t) => `${t.key}(${t.count})`).join(', ')}`,
);

// Sanity: warn about series slugs with no docs (helps when a course folder moves).
for (const s of SERIES) {
  if (!seriesBySlug.has(s.slug)) console.warn(`[build-index] bỏ qua series rỗng: ${s.slug}`);
}
