import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, ArrowRight, Clock, ListBullets } from '@phosphor-icons/react';
import Mermaid from '../components/Mermaid';
import { FeaturedCard } from '../components/Cards';
import {
  buildToc,
  chapterNeighbours,
  docContentUrl,
  docRoute,
  formatDate,
  readingTime,
  relatedDocs,
  seriesBySlug,
  seriesRoute,
  stripFrontmatter,
  stripLeadingH1,
  topicRoute,
  type DocsIndex,
} from '../lib/docs';

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

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

/** Chuyển link .md tương đối (MUC_LUC, series index) thành route trong app. */
function resolveDocLink(href: string, currentFile: string, index: DocsIndex): string | null {
  if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href)) return null;
  const clean = safeDecode(href.replace(/^<|>$/g, ''));
  if (!clean.toLowerCase().endsWith('.md')) return null;
  const base = currentFile.split('/').slice(0, -1);
  const stack = [...base];
  for (const part of clean.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') stack.pop();
    else stack.push(part);
  }
  const resolved = stack.join('/');
  const doc = index.docs.find(
    (d) => d.file === resolved || d.file.toLowerCase() === resolved.toLowerCase(),
  );
  return doc ? docRoute(doc) : null;
}

export default function DocPage({ index }: { index: DocsIndex }) {
  const { '*': splat } = useParams();
  const id = useMemo(() => (splat ?? '').split('/').map(safeDecode).join('/'), [splat]);
  const [md, setMd] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [activeAnchor, setActiveAnchor] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const doc = useMemo(() => index.docs.find((d) => d.id === id) ?? null, [index, id]);
  const series = doc?.seriesSlug ? seriesBySlug(index, doc.seriesSlug) : undefined;

  useEffect(() => {
    setMd(null);
    setErr(null);
    if (!doc) return;
    let alive = true;
    fetch(docContentUrl(doc))
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const type = r.headers.get('content-type') ?? '';
        if (type.includes('text/html')) {
          throw new Error('Máy chủ trả về HTML thay vì Markdown');
        }
        return r.text();
      })
      .then((t) => { if (alive) setMd(t); })
      .catch((e) => { if (alive) setErr(String(e?.message ?? e)); });
    return () => { alive = false; };
  }, [doc]);

  const toc = useMemo(() => (md ? buildToc(md) : []), [md]);

  // Gán id cho heading theo đúng thứ tự TOC, rồi theo dõi heading đang xem.
  useEffect(() => {
    const root = contentRef.current;
    if (!root || !md) return;
    const headings = Array.from(root.querySelectorAll<HTMLElement>('h2, h3'));
    headings.forEach((h, i) => {
      if (toc[i]) h.id = toc[i].anchor;
    });
    if (!toc.length) return;

    const links = new Map<string, HTMLAnchorElement>();
    document.querySelectorAll<HTMLAnchorElement>('.post-toc a[href^="#"]').forEach((a) => {
      links.set(a.getAttribute('href')!.slice(1), a);
    });

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const anchor = entry.target.id;
          setActiveAnchor(anchor);
        }
      },
      { rootMargin: '-96px 0px -68% 0px', threshold: 0 },
    );
    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [md, toc]);

  if (!doc) {
    return (
      <div className="index-page">
        <h1 className="page-title">Không tìm thấy bài viết</h1>
        <p className="page-lede">Đường dẫn này không tồn tại hoặc bài đã được di chuyển.</p>
        <Link className="btn-primary" to="/thu-vien">← Về thư viện</Link>
      </div>
    );
  }

  const neighbours = chapterNeighbours(index, doc);
  const related = relatedDocs(index, doc, 4);
  const category = doc.series || doc.topTitle;

  return (
    <div className="post-page">
      <div className="post-container">
        <nav className="post-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to={topicRoute(doc.top)}>{doc.topTitle}</Link>
          {doc.series && (
            <>
              <span className="breadcrumb-sep">›</span>
              <Link to={seriesRoute(doc.seriesSlug)}>{doc.series}</Link>
            </>
          )}
          {doc.kind === 'article' && doc.chapter > 0 && (
            <>
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-current">Chương {doc.chapter}</span>
            </>
          )}
        </nav>

        <header className="post-header">
          <span className="post-eyebrow">{category}</span>
          <h1 className="post-title">{doc.title}</h1>
          {doc.excerpt && <p className="post-subtitle">{doc.excerpt}</p>}

          <div className="post-byline">
            <img
              className="post-avatar"
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt=""
              width={44}
              height={44}
            />
            <div className="post-byline-meta">
              <span className="post-author-name">Open-Knowledge</span>
              <span className="post-byline-sub">
                {doc.date ? (
                  <time dateTime={doc.date}>{formatDate(doc.date)}</time>
                ) : doc.series ? (
                  <>Chương {doc.chapter} · {doc.series}</>
                ) : (
                  'Tài liệu'
                )}
                <span className="dot">·</span>
                <Clock size={13} aria-hidden="true" /> {readingTime(doc.minutes)}
              </span>
            </div>
          </div>

          <div className="post-tags">
            <Link className="post-tag" to={topicRoute(doc.top)}>{doc.topTitle}</Link>
            {doc.series && (
              <Link className="post-tag post-tag--series" to={seriesRoute(doc.seriesSlug)}>
                {doc.series}
              </Link>
            )}
            {doc.section && <span className="post-tag post-tag--muted">{doc.section}</span>}
          </div>
        </header>

        <hr className="post-divider" />

        {toc.length > 1 && (
          <aside className="post-toc" aria-label="Mục lục">
            <p className="post-toc-title"><ListBullets size={14} /> Trong bài này</p>
            <nav className="post-toc-nav">
              <ul className="post-toc-list">
                {toc.map((t) => (
                  <li key={t.anchor} className={t.depth === 3 ? 'post-toc-h3' : 'post-toc-h2'}>
                    <a
                      href={`#${t.anchor}`}
                      className={activeAnchor === t.anchor ? 'active' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(t.anchor)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {err && <p className="error">Không tải được nội dung: {err}</p>}
        {!md && !err && <p className="loading">Đang tải bài viết…</p>}

        {md && (
          <div className="post-content" ref={contentRef}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                pre: Pre,
                blockquote: ({ children }) => {
                  const text = textOf(children).trim();
                  if (/^Nguồn\s*:/i.test(text)) {
                    return <aside className="source-note">{children}</aside>;
                  }
                  return <blockquote>{children}</blockquote>;
                },
                a: ({ href, children }) => {
                  const internal = href ? resolveDocLink(href, doc.file, index) : null;
                  if (internal) return <Link to={internal}>{children}</Link>;
                  if (href && /^https?:/.test(href)) {
                    return <a href={href} target="_blank" rel="noopener">{children}</a>;
                  }
                  return <a href={href}>{children}</a>;
                },
              }}
            >
              {stripLeadingH1(stripFrontmatter(md))}
            </ReactMarkdown>
          </div>
        )}

        {(neighbours.prev || neighbours.next) && (
          <nav className="chapter-nav" aria-label="Chương trước / kế tiếp">
            {neighbours.prev ? (
              <Link className="chapter-nav-link chapter-nav-prev" to={docRoute(neighbours.prev)}>
                <span className="chapter-nav-dir"><ArrowLeft size={13} /> Chương trước</span>
                <span className="chapter-nav-title">{neighbours.prev.title}</span>
              </Link>
            ) : <span className="chapter-nav-empty" />}
            {neighbours.next ? (
              <Link className="chapter-nav-link chapter-nav-next" to={docRoute(neighbours.next)}>
                <span className="chapter-nav-dir">Chương kế tiếp <ArrowRight size={13} /></span>
                <span className="chapter-nav-title">{neighbours.next.title}</span>
              </Link>
            ) : <span className="chapter-nav-empty" />}
          </nav>
        )}

        {related.length > 0 && (
          <section className="post-related">
            <div className="feed-head">
              <h2 className="post-related-heading">Bài viết liên quan</h2>
              {series && <Link className="section-link" to={seriesRoute(series.slug)}>Xem series →</Link>}
            </div>
            <div className="featured-grid">
              {related.map((d) => <FeaturedCard key={d.id} doc={d} />)}
            </div>
          </section>
        )}

        <footer className="post-footer">
          <Link className="back-link" to={series ? seriesRoute(series.slug) : '/thu-vien'}>
            ← {series ? `Về series ${series.title}` : 'Về thư viện'}
          </Link>
          <Link className="back-link" to="/">Trang chủ</Link>
        </footer>
      </div>
    </div>
  );
}
