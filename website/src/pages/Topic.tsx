import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  docsInTopic,
  groupBySection,
  norm,
  seriesOfTopic,
  topicByKey,
  topicRoute,
  type DocMeta,
  type DocsIndex,
} from '../lib/docs';
import { ChapterRow, SeriesCard } from '../components/Cards';
import { TopicIcon } from '../components/topicIcons';

export default function Topic({ index }: { index: DocsIndex }) {
  const { name } = useParams();
  const key = name ? decodeURIComponent(name) : '';
  const topic = topicByKey(index, key);
  const [q, setQ] = useState('');

  const docs = useMemo(() => {
    const all = docsInTopic(index, key);
    const nq = norm(q.trim());
    if (!nq) return all;
    return all.filter((d) =>
      norm(`${d.title} ${d.excerpt} ${d.section} ${d.series}`).includes(nq),
    );
  }, [index, key, q]);

  const series = useMemo(() => seriesOfTopic(index, key), [index, key]);

  // Gom theo series, giữ thứ tự series trong registry.
  const bySeries = useMemo(() => {
    const map = new Map<string, DocMeta[]>();
    for (const d of docs) {
      if (!d.seriesSlug) continue;
      if (!map.has(d.seriesSlug)) map.set(d.seriesSlug, []);
      map.get(d.seriesSlug)!.push(d);
    }
    return series
      .map((s) => ({ series: s, docs: map.get(s.slug) ?? [] }))
      .filter((g) => g.docs.length > 0);
  }, [docs, series]);

  if (!topic) {
    return (
      <div className="index-page">
        <h1 className="page-title">Không tìm thấy chủ đề</h1>
        <Link className="btn-primary" to="/chu-de">← Về danh sách chủ đề</Link>
      </div>
    );
  }

  const searching = q.trim().length > 0;

  return (
    <div className="index-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>›</span>
        <Link to="/chu-de">Chủ đề</Link>
        <span>›</span>
        <span className="breadcrumb-current">{topic.title}</span>
      </nav>

      <header className="topic-hero">
        <span className={`topic-hero-icon topic-hero-icon--${topic.key === 'C++' ? 'cpp' : topic.key.toLowerCase().replace(/\s+/g, '-')}`}>
          <TopicIcon topic={topic.key} size={34} />
        </span>
        <div>
          <h1 className="page-title">{topic.title}</h1>
          <p className="page-lede">{topic.description}</p>
          <div className="page-stats">
            <span><strong>{topic.count}</strong> bài học</span>
            <span className="dot">·</span>
            <span><strong>{topic.series.length}</strong> series</span>
          </div>
        </div>
      </header>

      {!searching && (
        <section className="feed">
          <div className="feed-head">
            <h2 className="feed-heading">Series trong chủ đề</h2>
          </div>
          <div className="series-grid">
            {series.map((s) => <SeriesCard key={s.slug} series={s} />)}
          </div>
        </section>
      )}

      <section className="feed feed--last">
        <div className="feed-head">
          <h2 className="feed-heading">Tất cả bài viết</h2>
          <span className="section-count">{docs.length} bài</span>
        </div>

        <div className="search-inline">
          <input
            type="search"
            className="input"
            placeholder={`Lọc trong ${topic.title}…`}
            aria-label={`Lọc bài viết trong ${topic.title}`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {bySeries.map(({ series: s, docs: list }) => {
          const groups = groupBySection(list);
          return (
            <section className="topic-series-block" key={s.slug}>
              <div className="topic-series-head">
                <div>
                  <span className="eyebrow">{s.category}</span>
                  <h3><Link to={`/series/${s.slug}`}>{s.title}</Link></h3>
                </div>
                <Link className="section-link" to={`/series/${s.slug}`}>
                  Xem series →
                </Link>
              </div>
              {groups.map((g) => (
                <div key={g.name} className="topic-section-group">
                  {groups.length > 1 && <h4 className="topic-section-name">{g.name}</h4>}
                  <div className="chapter-list">
                    {g.docs.map((d) => <ChapterRow key={d.id} doc={d} showSection={false} />)}
                  </div>
                </div>
              ))}
            </section>
          );
        })}

        {docs.length === 0 && (
          <p className="empty-state">Không có bài nào khớp “{q}”.</p>
        )}
      </section>

      <p className="page-footer-link">
        <Link to={topicRoute(topic.key)}>↑ Về đầu chủ đề</Link>
        <Link to="/chu-de">Tất cả chủ đề →</Link>
      </p>
    </div>
  );
}
