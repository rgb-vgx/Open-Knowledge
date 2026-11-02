export type DocKind = 'article' | 'meta';

export interface DocMeta {
  id: string;
  contentFile: string;
  title: string;
  file: string;
  top: string;
  topTitle: string;
  dir: string;
  date: string | null;
  categories: string[];
  tags: string[];
  excerpt: string;
  series: string;
  seriesSlug: string;
  seriesCategory: string;
  section: string;
  chapter: number;
  words: number;
  minutes: number;
  kind: DocKind;
}

export interface SeriesMeta {
  slug: string;
  title: string;
  topic: string;
  topicTitle: string;
  category: string;
  description: string;
  count: number;
  order: number;
  featured: boolean;
}

export interface TopicMeta {
  key: string;
  title: string;
  description: string;
  order: number;
  count: number;
  series: string[];
}

export interface DocsIndex {
  total: number;
  articleCount: number;
  metaCount: number;
  generatedAt: string;
  topics: TopicMeta[];
  series: SeriesMeta[];
  docs: DocMeta[];
}

let cache: DocsIndex | null = null;

export async function fetchIndex(): Promise<DocsIndex> {
  if (cache) return cache;
  const res = await fetch(`${import.meta.env.BASE_URL}docs-index.json`);
  if (!res.ok) throw new Error('Không tải được docs-index.json. Hãy chạy `npm run build-index`.');
  cache = (await res.json()) as DocsIndex;
  return cache;
}

/** URL fetch nội dung .md gốc (render ra HTML lúc chạy). */
export function docContentUrl(doc: DocMeta): string {
  return `${import.meta.env.BASE_URL}docs/${doc.contentFile}`;
}

/** Route trong app cho 1 bài viết. */
export function docRoute(doc: DocMeta): string {
  const enc = doc.id.split('/').map(encodeURIComponent).join('/');
  return `/docs/${enc}`;
}

export function seriesRoute(slug: string): string {
  return `/series/${encodeURIComponent(slug)}`;
}

export function topicRoute(key: string): string {
  return `/chu-de/${encodeURIComponent(key)}`;
}

export function stripFrontmatter(md: string): string {
  return md
    .replace(/^\uFEFF/, '')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

/** Bỏ H1 đầu bài vì tiêu đề đã được render ở header của trang. */
export function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+[^\n]*\n+/, '');
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */
const DATE_FMT = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatDate(date: string | null): string {
  if (!date) return '';
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return DATE_FMT.format(d);
}

export function readingTime(minutes: number): string {
  return `${minutes} phút đọc`;
}

/* ------------------------------------------------------------------ */
/* Collections                                                        */
/* ------------------------------------------------------------------ */
export function topicByKey(index: DocsIndex, key: string): TopicMeta | undefined {
  return index.topics.find((t) => t.key === key);
}

export function seriesBySlug(index: DocsIndex, slug: string): SeriesMeta | undefined {
  return index.series.find((s) => s.slug === slug);
}

export function docsInSeries(index: DocsIndex, slug: string): DocMeta[] {
  return index.docs
    .filter((d) => d.seriesSlug === slug && d.kind === 'article')
    .sort((a, b) => a.chapter - b.chapter);
}

export function docsInTopic(index: DocsIndex, key: string): DocMeta[] {
  return index.docs.filter((d) => d.top === key && d.kind === 'article');
}

export function seriesOfTopic(index: DocsIndex, key: string): SeriesMeta[] {
  return index.series.filter((s) => s.topic === key);
}

export function firstDocOfSeries(index: DocsIndex, slug: string): DocMeta | undefined {
  return docsInSeries(index, slug)[0];
}

/** Các bài mới nhất theo ngày biên soạn, mỗi series tối đa 1 bài. */
export function latestDocs(index: DocsIndex, limit = 8): DocMeta[] {
  const sorted = index.docs
    .filter((d) => d.kind === 'article' && d.date)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || b.chapter - a.chapter);
  const seen = new Set<string>();
  const out: DocMeta[] = [];
  for (const d of sorted) {
    const key = d.seriesSlug || d.top;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(d);
    if (out.length >= limit) break;
  }
  return out;
}

/** Bài liên quan: cùng series trước, sau đó cùng chủ đề. */
export function relatedDocs(index: DocsIndex, doc: DocMeta, limit = 4): DocMeta[] {
  const sameSeries = index.docs
    .filter(
      (d) =>
        d.kind === 'article' &&
        d.id !== doc.id &&
        d.seriesSlug === doc.seriesSlug &&
        d.seriesSlug !== '',
    )
    .sort((a, b) => Math.abs(a.chapter - doc.chapter) - Math.abs(b.chapter - doc.chapter));
  const sameTopic = index.docs
    .filter(
      (d) =>
        d.kind === 'article' &&
        d.id !== doc.id &&
        d.top === doc.top &&
        d.seriesSlug !== doc.seriesSlug,
    )
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  return [...sameSeries, ...sameTopic].slice(0, limit);
}

/** Bài kế tiếp / trước đó trong cùng series. */
export function chapterNeighbours(
  index: DocsIndex,
  doc: DocMeta,
): { prev: DocMeta | null; next: DocMeta | null } {
  if (!doc.seriesSlug) return { prev: null, next: null };
  const list = docsInSeries(index, doc.seriesSlug);
  const pos = list.findIndex((d) => d.id === doc.id);
  if (pos < 0) return { prev: null, next: null };
  return {
    prev: pos > 0 ? list[pos - 1] : null,
    next: pos < list.length - 1 ? list[pos + 1] : null,
  };
}

/** Nhóm bài trong series theo section, giữ đúng thứ tự chapter. */
export interface SectionGroup {
  name: string;
  docs: DocMeta[];
}

export function groupBySection(docs: DocMeta[]): SectionGroup[] {
  const groups: SectionGroup[] = [];
  for (const d of docs) {
    const name = d.section || 'Bài viết';
    let g = groups.find((x) => x.name === name);
    if (!g) {
      g = { name, docs: [] };
      groups.push(g);
    }
    g.docs.push(d);
  }
  return groups;
}

/* ------------------------------------------------------------------ */
/* Search                                                             */
/* ------------------------------------------------------------------ */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function searchDocs(
  docs: DocMeta[],
  q: string,
  limit = 60,
  topic?: string,
): DocMeta[] {
  const nq = norm(q.trim());
  if (!nq) return [];
  const terms = nq.split(/\s+/).filter(Boolean);
  const scored: Array<{ d: DocMeta; s: number }> = [];
  for (const d of docs) {
    if (d.kind === 'meta') continue;
    if (topic && d.top !== topic) continue;
    const title = norm(d.title);
    const series = norm(`${d.series} ${d.seriesCategory}`);
    const hay = norm(`${d.excerpt} ${d.file} ${d.section} ${d.topTitle}`);
    let score = 0;
    for (const t of terms) {
      if (title.includes(t)) score += 6;
      else if (series.includes(t)) score += 3;
      else if (hay.includes(t)) score += 1;
      else {
        score = -1;
        break;
      }
    }
    if (score > 0) scored.push({ d, s: score });
  }
  return scored
    .sort((a, b) => b.s - a.s || (b.d.date ?? '').localeCompare(a.d.date ?? ''))
    .slice(0, limit)
    .map((x) => x.d);
}

/* ------------------------------------------------------------------ */
/* Table of contents                                                   */
/* ------------------------------------------------------------------ */
export interface TocItem {
  depth: number;
  text: string;
  anchor: string;
}

export function slugAnchor(text: string, used: Set<string>): string {
  let s = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\u00C0-\u024F\u1E00-\u1EFF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
  if (!s) s = 'muc';
  let out = s;
  let i = 2;
  while (used.has(out)) out = `${s}-${i++}`;
  used.add(out);
  return out;
}

/** Mục lục từ các heading ## / ### trong markdown. */
export function buildToc(md: string): TocItem[] {
  const body = stripFrontmatter(md).replace(/```[\s\S]*?```/g, '');
  const used = new Set<string>();
  const toc: TocItem[] = [];
  for (const line of body.split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const text = m[2]
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[#*`_~[\]()]/g, '')
      .trim();
    if (!text) continue;
    toc.push({ depth: m[1].length, text, anchor: slugAnchor(text, used) });
  }
  return toc.slice(0, 80);
}

/* ------------------------------------------------------------------ */
/* Presentation helpers                                               */
/* ------------------------------------------------------------------ */
const TOPIC_CLASS: Record<string, string> = {
  AI: 'ai',
  BackEnd: 'backend',
  'C++': 'cpp',
  Cloud: 'cloud',
  DevOps: 'devops',
  'Distributed Systems': 'distributed',
  Golang: 'golang',
  Nvidia: 'nvidia',
  'System Design': 'system',
};

export function topicClass(topic: string): string {
  return TOPIC_CLASS[topic] ?? 'default';
}
