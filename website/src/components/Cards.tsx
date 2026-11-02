import { Link } from 'react-router-dom';
import {
  docRoute,
  formatDate,
  readingTime,
  seriesRoute,
  topicRoute,
  type DocMeta,
  type SeriesMeta,
  type TopicMeta,
} from '../lib/docs';
import SeriesCover from './SeriesCover';
import { TopicIcon } from './topicIcons';

export function PostRow({ doc }: { doc: DocMeta }) {
  const category = doc.series || doc.topTitle;
  return (
    <Link className="post-row" to={docRoute(doc)}>
      <div className="post-row-body">
        <span className="post-row-cat">{category}</span>
        <h3 className="post-row-title">{doc.title}</h3>
        {doc.excerpt && <p className="post-row-sub">{doc.excerpt}</p>}
        <div className="post-row-meta">
          {doc.date ? (
            <>
              <time dateTime={doc.date}>{formatDate(doc.date)}</time>
              <span className="dot">·</span>
            </>
          ) : (
            <>
              <span>{doc.series ? `Chương ${doc.chapter || 1}` : doc.topTitle}</span>
              <span className="dot">·</span>
            </>
          )}
          <span>{readingTime(doc.minutes)}</span>
        </div>
      </div>
      <div className="post-row-thumb">
        <SeriesCover
          variant="thumb"
          topic={doc.top}
          title={doc.series || doc.topTitle}
        />
      </div>
    </Link>
  );
}

export function FeaturedCard({ doc }: { doc: DocMeta }) {
  return (
    <Link className="featured-card" to={docRoute(doc)}>
      <div className="featured-card-image">
        <SeriesCover
          topic={doc.top}
          title={doc.series || doc.topTitle}
          category={doc.seriesCategory || doc.topTitle}
        />
      </div>
      <div className="featured-card-body">
        <span className="featured-card-cat">{doc.series || doc.topTitle}</span>
        <h3 className="featured-card-title">{doc.title}</h3>
        {doc.excerpt && <p className="featured-card-sub">{doc.excerpt}</p>}
        <div className="featured-card-meta">
          {doc.date ? formatDate(doc.date) : `Bài ${doc.chapter || 1}`}
          <span className="dot">·</span>
          {readingTime(doc.minutes)}
        </div>
      </div>
    </Link>
  );
}

export function SeriesCard({ series }: { series: SeriesMeta }) {
  return (
    <Link className="series-card" to={seriesRoute(series.slug)}>
      <div className="series-card-cover">
        <SeriesCover
          topic={series.topic}
          title={series.title}
          category={series.category}
          count={series.count}
        />
      </div>
      <div className="series-card-body">
        <span className="series-card-cat">{series.category}</span>
        <h3 className="series-card-title">{series.title}</h3>
        <p className="series-card-desc">{series.description}</p>
        <div className="series-card-meta">
          <span className="series-card-count">{series.count} bài</span>
          <span className="series-card-link">Xem series →</span>
        </div>
      </div>
    </Link>
  );
}

export function TopicCard({ topic }: { topic: TopicMeta }) {
  return (
    <Link className={`topic-card topic-card--${topic.key === 'C++' ? 'cpp' : topic.key.toLowerCase().replace(/\s+/g, '-')}`} to={topicRoute(topic.key)}>
      <span className="topic-card-icon">
        <TopicIcon topic={topic.key} size={26} />
      </span>
      <span className="topic-card-body">
        <span className="topic-card-title">{topic.title}</span>
        <span className="topic-card-desc">{topic.description}</span>
        <span className="topic-card-meta">{topic.count} bài · {topic.series.length} series</span>
      </span>
    </Link>
  );
}

export function ChapterRow({ doc, showSection = true }: { doc: DocMeta; showSection?: boolean }) {
  return (
    <Link className="chapter-row" to={docRoute(doc)}>
      <span className="chapter-num">{String(doc.chapter).padStart(2, '0')}</span>
      <span className="chapter-body">
        <span className="chapter-title">{doc.title}</span>
        <span className="chapter-meta">
          {showSection && doc.section ? `${doc.section} · ` : ''}
          {readingTime(doc.minutes)}
        </span>
      </span>
      <span className="chapter-arrow" aria-hidden="true">→</span>
    </Link>
  );
}
