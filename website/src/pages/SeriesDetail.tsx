import { Link, useParams } from 'react-router-dom';
import {
  docRoute,
  docsInSeries,
  groupBySection,
  seriesBySlug,
  seriesRoute,
  topicRoute,
  type DocsIndex,
} from '../lib/docs';
import { ChapterRow } from '../components/Cards';
import SeriesCover from '../components/SeriesCover';

export default function SeriesDetail({ index }: { index: DocsIndex }) {
  const { slug } = useParams();
  const series = slug ? seriesBySlug(index, slug) : undefined;
  const docs = series ? docsInSeries(index, series.slug) : [];

  if (!series) {
    return (
      <div className="index-page">
        <h1 className="page-title">Không tìm thấy series</h1>
        <p className="page-lede">Series này không tồn tại hoặc đã được đổi tên.</p>
        <Link className="btn-primary" to="/series">← Về danh sách series</Link>
      </div>
    );
  }

  const groups = groupBySection(docs);
  const totalMinutes = docs.reduce((sum, d) => sum + d.minutes, 0);
  const first = docs[0];

  return (
    <div className="series-detail">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>›</span>
        <Link to="/series">Series</Link>
        <span>›</span>
        <span className="breadcrumb-current">{series.title}</span>
      </nav>

      <header className="series-hero">
        <div className="series-hero-cover">
          <SeriesCover
            variant="hero"
            topic={series.topic}
            title={series.title}
            category={series.category}
            count={series.count}
          />
        </div>
        <div className="series-hero-body">
          <span className="eyebrow">{series.category}</span>
          <h1>{series.title}</h1>
          <p>{series.description}</p>
          <div className="series-hero-meta">
            <span><strong>{series.count}</strong> bài học</span>
            <span className="dot">·</span>
            <span><strong>{groups.length}</strong> phần</span>
            <span className="dot">·</span>
            <span>~{Math.round(totalMinutes / 60)} giờ đọc</span>
          </div>
          <div className="series-hero-actions">
            {first && (
              <Link className="btn-primary" to={docRoute(first)}>
                Bắt đầu đọc →
              </Link>
            )}
            <Link className="btn-ghost" to={topicRoute(series.topic)}>
              Xem chủ đề {series.topicTitle}
            </Link>
          </div>
        </div>
      </header>

      <div className="series-chapters">
        <div className="feed-head">
          <h2 className="feed-heading">Nội dung series</h2>
          <span className="section-count">{docs.length} chương</span>
        </div>

        {groups.map((group, i) => {
          const single = groups.length === 1 || group.name === 'Bài viết';
          if (single) {
            return (
              <section className="series-section" key={group.name}>
                <div className="chapter-list">
                  {group.docs.map((doc) => (
                    <ChapterRow key={doc.id} doc={doc} showSection={false} />
                  ))}
                </div>
              </section>
            );
          }
          return (
            <details className="series-section" key={group.name} open={i < 2}>
              <summary>
                <span className="series-section-title">{group.name}</span>
                <span className="series-section-count">{group.docs.length} bài</span>
              </summary>
              <div className="chapter-list">
                {group.docs.map((doc) => (
                  <ChapterRow key={doc.id} doc={doc} showSection={false} />
                ))}
              </div>
            </details>
          );
        })}
      </div>

      <div className="series-detail-footer">
        <Link className="back-link" to={seriesRoute(series.slug)}>↑ Về đầu series</Link>
        <Link className="back-link" to="/series">Tất cả series →</Link>
      </div>
    </div>
  );
}
