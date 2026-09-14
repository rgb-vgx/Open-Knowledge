import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import Mermaid from '../components/Mermaid';
import { buildToc, docContentUrl, docRoute, slugAnchor, stripFrontmatter, type DocsIndex } from '../lib/docs';

/** Lấy text thô từ cây React (code đã qua highlight vẫn giữ nguyên text). */
function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement(node)) {
    return textOf((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

/** Khối ```mermaid -> render SVG, các code khác giữ nguyên. */
function Pre(props: { children?: React.ReactNode }) {
  const kids = React.Children.toArray(props.children);
  if (kids.length === 1 && React.isValidElement(kids[0])) {
    const cp = kids[0].props as { className?: string; children?: React.ReactNode };
    if (/language-mermaid/.test(cp.className ?? '')) {
      return <Mermaid chart={textOf(cp.children).replace(/\n$/, '')} />;
    }
  }
  return <pre>{props.children}</pre>;
}

export default function DocPage({ index }: { index: DocsIndex }) {
  const { '*': splat } = useParams();
  const id = useMemo(() => (splat ?? '').split('/').map(decodeURIComponent).join('/'), [splat]);
  const [md, setMd] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const meta = useMemo(() => index.docs.find((d) => d.id === id) ?? null, [index, id]);

  useEffect(() => {
    setMd(null);
    setErr(null);
    if (!meta) return;
    let alive = true;
    fetch(docContentUrl(meta))
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then((t) => { if (alive) setMd(t); })
      .catch((e) => { if (alive) setErr(String(e?.message ?? e)); });
    return () => { alive = false; };
  }, [meta]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const toc = useMemo(() => (md ? buildToc(md) : []), [md]);

  // Gán id cho heading để TOC nhảy được (đồng bộ thuật toán với buildToc)
  const used = useMemo(() => new Set<string>(), [md]);
  const h = (Tag: 'h2' | 'h3') => function H(props: { children?: React.ReactNode }) {
    const kids = props.children;
    const text = Array.isArray(kids) ? kids.map((k) => String(k)).join('') : String(kids ?? '');
    const anchor = slugAnchor(text.replace(/[#*`_~[\]()]/g, ''), used);
    return <Tag id={anchor}>{props.children}</Tag>;
  };

  if (!meta) {
    return (
      <div className="page">
        <h1>Không tìm thấy bài viết</h1>
        <p className="muted">{id}</p>
        <p><Link to="/">Về trang chủ</Link></p>
      </div>
    );
  }

  const siblings = index.docs.filter((d) => d.top === meta.top);
  const pos = siblings.findIndex((d) => d.id === meta.id);
  const prev = pos > 0 ? siblings[pos - 1] : null;
  const next = pos >= 0 && pos < siblings.length - 1 ? siblings[pos + 1] : null;

  return (
    <div className="doc-layout">
      <article className="page doc">
        <p className="breadcrumb">
          <Link to="/">Trang chủ</Link> / <Link to={`/chu-de/${encodeURIComponent(meta.top)}`}>{meta.top}</Link>
          {meta.dir ? ` / ${meta.dir}` : ''}
        </p>
        <h1>{meta.title}</h1>
        <p className="muted meta">
          {meta.date ? `${String(meta.date).slice(0, 10)} · ` : ''}{meta.file}
        </p>
        {err && <p className="error">Không tải được nội dung: {err}</p>}
        {!md && !err && <p className="muted">Đang tải markdown và render ra HTML…</p>}
        {md && (
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{ h2: h('h2'), h3: h('h3'), pre: Pre }}
            >
              {stripFrontmatter(md)}
            </ReactMarkdown>
          </div>
        )}
        <nav className="prevnext">
          {prev ? <Link to={docRoute(prev)}>← {prev.title}</Link> : <span />}
          {next ? <Link to={docRoute(next)}>{next.title} →</Link> : <span />}
        </nav>
      </article>
      {toc.length > 0 && (
        <aside className="toc">
          <strong>Mục lục</strong>
          <ul>
            {toc.map((t) => (
              <li key={t.anchor} className={t.depth === 3 ? 'sub' : ''}>
                <a href={`#${t.anchor}`}>{t.text}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
