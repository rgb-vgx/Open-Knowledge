import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { seriesRoute, type DocsIndex } from '../lib/docs';
import { SeriesCard } from '../components/Cards';

export default function Series({ index }: { index: DocsIndex }) {
  const [topic, setTopic] = useState('all');

  const list = useMemo(
    () => index.series.filter((s) => topic === 'all' || s.topic === topic),
    [index.series, topic],
  );

  return (
    <div className="index-page">
      <header className="page-hero">
        <span className="eyebrow">Thư viện series</span>
        <h1 className="page-title">Series</h1>
        <p className="page-lede">
          Những bộ bài giảng dài kỳ, đi từ nền tảng đến thực hành. Mỗi series là một
          khóa học được biên soạn lại thành các chương đọc độc lập.
        </p>
        <div className="page-stats">
          <span><strong>{index.series.length}</strong> series</span>
          <span className="dot">·</span>
          <span><strong>{index.articleCount.toLocaleString('vi-VN')}</strong> bài học</span>
        </div>
      </header>

      <div className="filter-bar" role="group" aria-label="Lọc series theo chủ đề">
        <button className={topic === 'all' ? 'filter-chip active' : 'filter-chip'} onClick={() => setTopic('all')}>
          Tất cả
        </button>
        {index.topics.map((t) => (
          <button
            key={t.key}
            className={topic === t.key ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setTopic(t.key)}
          >
            {t.title} <span>{t.count}</span>
          </button>
        ))}
      </div>

      <div className="series-grid">
        {list.map((s) => <SeriesCard key={s.slug} series={s} />)}
      </div>

      {list.length === 0 && (
        <p className="empty-state">
          Chưa có series nào trong chủ đề này. <Link to="/series" onClick={() => setTopic('all')}>Xem tất cả</Link>
        </p>
      )}
    </div>
  );
}
