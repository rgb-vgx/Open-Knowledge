import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import {
  firstDocOfSeries,
  latestDocs,
  seriesRoute,
  type DocMeta,
  type DocsIndex,
} from '../lib/docs';
import { FeaturedCard, PostRow, SeriesCard, TopicCard } from '../components/Cards';
import SeriesCover from '../components/SeriesCover';

function pickPost(index: DocsIndex, slug: string): DocMeta | undefined {
  const dated = index.docs
    .filter((d) => d.seriesSlug === slug && d.kind === 'article' && d.date)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  return dated[0] ?? firstDocOfSeries(index, slug);
}

export default function Home({ index }: { index: DocsIndex }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const featured = index.series.filter((s) => s.featured);
  const hero = featured[0] ?? index.series[0];
  const latest = latestDocs(index, 6);
  const picks = ['docker-kubernetes', 'system-design-interview', 'langchain', 'apache-kafka']
    .map((slug) => pickPost(index, slug))
    .filter((d): d is DocMeta => Boolean(d));

  const goSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    nav(q.trim() ? `/tim-kiem?q=${encodeURIComponent(q.trim())}` : '/tim-kiem');
  };

  return (
    <div className="home-page">
      <section className="home-masthead">
        <span className="eyebrow">Kho kiến thức kỹ thuật mở</span>
        <h1 className="masthead-title">Open-Knowledge</h1>
        <p className="masthead-desc">
          Học sâu từ nền tảng đến production: AI agents, backend, C++,
          cloud, DevOps và thiết kế hệ thống.
        </p>

        <form className="hero-search" role="search" onSubmit={goSearch}>
          <MagnifyingGlass size={19} aria-hidden="true" />
          <input
            type="search"
            placeholder="Tìm bài viết, series, chủ đề…"
            aria-label="Tìm kiếm bài viết"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Tìm</button>
        </form>

        <div className="hero-stats">
          <span><strong>{index.articleCount.toLocaleString('vi-VN')}</strong> bài học</span>
          <span className="dot">·</span>
          <span><strong>{index.series.length}</strong> series</span>
          <span className="dot">·</span>
          <span><strong>{index.topics.length}</strong> chủ đề</span>
        </div>

        <div className="hero-quick">
          {['Docker', 'Kafka', 'Claude Code', 'System Design', 'C++'].map((term) => (
            <Link key={term} to={`/tim-kiem?q=${encodeURIComponent(term)}`}>
              {term}
            </Link>
          ))}
        </div>
      </section>

      {hero && (
        <section className="home-feature">
          <Link className="feature-series" to={seriesRoute(hero.slug)}>
            <div className="feature-series-media">
              <SeriesCover
                variant="hero"
                topic={hero.topic}
                title={hero.title}
                category={hero.category}
                count={hero.count}
              />
            </div>
            <div className="feature-series-body">
              <span className="eyebrow">Series nổi bật</span>
              <h2>{hero.title}</h2>
              <p>{hero.description}</p>
              <div className="feature-series-meta">
                <span>{hero.count} bài học</span>
                <span className="dot">·</span>
                <span>{hero.category}</span>
              </div>
              <span className="feature-series-cta">Khám phá series →</span>
            </div>
          </Link>
        </section>
      )}

      <section className="feed">
        <div className="feed-head">
          <h2 className="feed-heading">Mới cập nhật</h2>
          <Link className="section-link" to="/thu-vien">Tất cả bài viết →</Link>
        </div>
        <div className="post-list">
          {latest.map((doc) => <PostRow key={doc.id} doc={doc} />)}
        </div>
      </section>

      <section className="feed">
        <div className="feed-head">
          <h2 className="feed-heading">Series nổi bật</h2>
          <Link className="section-link" to="/series">Tất cả series →</Link>
        </div>
        <div className="series-grid">
          {featured.slice(1, 7).map((s) => <SeriesCard key={s.slug} series={s} />)}
        </div>
      </section>

      <section className="feed">
        <div className="feed-head">
          <h2 className="feed-heading">Khám phá theo chủ đề</h2>
          <Link className="section-link" to="/chu-de">Tất cả chủ đề →</Link>
        </div>
        <div className="topic-grid">
          {index.topics.map((t) => <TopicCard key={t.key} topic={t} />)}
        </div>
      </section>

      {picks.length > 0 && (
        <section className="feed feed--last">
          <div className="feed-head">
            <h2 className="feed-heading">Bài viết chọn lọc</h2>
          </div>
          <div className="featured-grid">
            {picks.map((doc) => <FeaturedCard key={doc.id} doc={doc} />)}
          </div>
        </section>
      )}
    </div>
  );
}
