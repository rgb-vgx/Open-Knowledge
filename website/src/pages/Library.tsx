import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  docRoute,
  norm,
  seriesRoute,
  topicRoute,
  type DocMeta,
  type DocsIndex,
} from '../lib/docs';
import { ChapterRow } from '../components/Cards';

const PAGE = 80;

export default function Library({ index }: { index: DocsIndex }) {
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState('all');
  const [series, setSeries] = useState('all');
  const [shown, setShown] = useState(PAGE);
  const deferredQ = useDeferredValue(q);

  const docs = useMemo(
    () => index.docs.filter((d) => d.kind === 'article'),
    [index.docs],
  );

  const metaDocs = useMemo(
    () => index.docs.filter((d) => d.kind === 'meta').sort((a, b) => a.file.localeCompare(b.file)),
    [index.docs],
  );

  const filtered = useMemo(() => {
    const nq = norm(deferredQ.trim());
    return docs.filter((d) => {
      if (topic !== 'all' && d.top !== topic) return false;
      if (series !== 'all' && d.seriesSlug !== series) return false;
      if (nq && !norm(`${d.title} ${d.series} ${d.section} ${d.excerpt}`).includes(nq)) return false;
      return true;
    });
  }, [docs, topic, series, deferredQ]);

  const isFiltering = deferredQ.trim() !== '' || topic !== 'all' || series !== 'all';

  const groups = useMemo(() => {
    const map = new Map<string, DocMeta[]>();
    for (const d of filtered) {
      const key = d.seriesSlug || '__other__';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    }
    return index.series
      .map((s) => ({ series: s, docs: map.get(s.slug) ?? [] }))
      .filter((g) => g.docs.length > 0);
  }, [filtered, index.series]);

  return (
    <div className="index-page">
      <header className="page-hero">
        <span className="eyebrow">Toàn bộ nội dung</span>
        <h1 className="page-title">Thư viện</h1>
        <p className="page-lede">
          Tra cứu toàn bộ {index.articleCount.toLocaleString('vi-VN')} bài học theo
          chủ đề, series hoặc từ khóa. Mọi nội dung đều đọc trực tiếp trên trình duyệt,
          không cần cài đặt thêm.
        </p>
        <div className="page-stats">
          <span><strong>{index.articleCount.toLocaleString('vi-VN')}</strong> bài</span>
          <span className="dot">·</span>
          <span><strong>{index.series.length}</strong> series</span>
          <span className="dot">·</span>
          <span><strong>{index.topics.length}</strong> chủ đề</span>
        </div>
      </header>

      <div className="library-controls">
        <input
          type="search"
          className="input library-search"
          placeholder="Tìm theo tiêu đề, series, phần, nội dung…"
          aria-label="Tìm trong thư viện"
          value={q}
          onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
        />
        <div className="library-selects">
          <label>
            <span>Chủ đề</span>
            <select value={topic} onChange={(e) => { setTopic(e.target.value); setShown(PAGE); }}>
              <option value="all">Tất cả chủ đề</option>
              {index.topics.map((t) => <option key={t.key} value={t.key}>{t.title} ({t.count})</option>)}
            </select>
          </label>
          <label>
            <span>Series</span>
            <select value={series} onChange={(e) => { setSeries(e.target.value); setShown(PAGE); }}>
              <option value="all">Tất cả series</option>
              {index.series.map((s) => <option key={s.slug} value={s.slug}>{s.title} ({s.count})</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="library-summary">
        <span><strong>{filtered.length.toLocaleString('vi-VN')}</strong> kết quả</span>
        {isFiltering && (
          <button
            className="text-btn"
            onClick={() => { setQ(''); setTopic('all'); setSeries('all'); setShown(PAGE); }}
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {isFiltering ? (
        <>
          <div className="chapter-list library-list">
            {filtered.slice(0, shown).map((d) => <ChapterRow key={d.id} doc={d} />)}
          </div>
          {filtered.length > shown && (
            <button className="btn-ghost library-more" onClick={() => setShown((s) => s + PAGE)}>
              Hiện thêm {Math.min(PAGE, filtered.length - shown)} bài
            </button>
          )}
          {filtered.length === 0 && <p className="empty-state">Không có bài nào khớp bộ lọc.</p>}
        </>
      ) : (
        <div className="library-groups">
          {groups.map(({ series: s, docs: list }) => (
            <section className="library-group" key={s.slug}>
              <div className="library-group-head">
                <div>
                  <span className="eyebrow">{s.category}</span>
                  <h2><Link to={seriesRoute(s.slug)}>{s.title}</Link></h2>
                  <p>{s.description}</p>
                </div>
                <div className="library-group-meta">
                  <span>{list.length} bài</span>
                  <span className="dot">·</span>
                  <span>{Math.round(list.reduce((n, d) => n + d.minutes, 0) / Math.max(list.length, 1))} phút / bài</span>
                </div>
              </div>
              <div className="chapter-list">
                {list.slice(0, 6).map((d) => <ChapterRow key={d.id} doc={d} />)}
              </div>
              {list.length > 6 && (
                <Link className="library-group-link" to={seriesRoute(s.slug)}>
                  Xem tất cả {list.length} bài trong series →
                </Link>
              )}
            </section>
          ))}
        </div>
      )}

      {!isFiltering && metaDocs.length > 0 && (
        <details className="library-meta">
          <summary>
            <span>Tài liệu dự án</span>
            <span>{metaDocs.length} tệp</span>
          </summary>
          <ul className="meta-doc-list">
            {metaDocs.map((d) => (
              <li key={d.id}>
                <Link to={docRoute(d)}>{d.title}</Link>
                <span>{d.dir || d.file}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      <p className="page-footer-link">
        <Link to={topicRoute(index.topics[0]?.key ?? 'AI')}>Khám phá theo chủ đề →</Link>
      </p>
    </div>
  );
}
