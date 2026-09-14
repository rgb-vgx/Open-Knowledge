export interface DocMeta {
  id: string;
  title: string;
  file: string;
  top: string;
  dir: string;
  date: string | null;
  categories: string[];
  tags: string[];
  excerpt: string;
}

export interface DocsIndex {
  total: number;
  tops: Record<string, number>;
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
  const enc = doc.file.split('/').map(encodeURIComponent).join('/');
  return `${import.meta.env.BASE_URL}docs/${enc}`;
}

/** Route trong app cho 1 bài viết. */
export function docRoute(doc: DocMeta): string {
  const enc = doc.id.split('/').map(encodeURIComponent).join('/');
  return `/docs/${enc}`;
}

export function stripFrontmatter(md: string): string {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

/** Tìm kiếm không dấu tiếng Việt trên title + excerpt + đường dẫn. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function searchDocs(docs: DocMeta[], q: string, limit = 60): DocMeta[] {
  const nq = norm(q.trim());
  if (!nq) return [];
  const terms = nq.split(/\s+/);
  const scored: Array<{ d: DocMeta; s: number }> = [];
  for (const d of docs) {
    const hay = norm(`${d.title} ${d.excerpt} ${d.file} ${d.dir}`);
    let score = 0;
    for (const t of terms) {
      if (norm(d.title).includes(t)) score += 3;
      else if (hay.includes(t)) score += 1;
      else { score = -1; break; }
    }
    if (score > 0) scored.push({ d, s: score });
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.d);
}

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
    const text = m[2].replace(/[#*`_~[\]()]/g, '').trim();
    if (!text) continue;
    toc.push({ depth: m[1].length, text, anchor: slugAnchor(text, used) });
  }
  return toc.slice(0, 80);
}
