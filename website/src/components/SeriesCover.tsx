import { TopicIcon } from './topicIcons';
import { topicClass } from '../lib/docs';

interface Props {
  topic: string;
  title: string;
  category?: string;
  count?: number;
  variant?: 'card' | 'hero' | 'thumb';
}

/** Cover nghệ thuật cho series/bài viết — không cần ảnh bitmap. */
export default function SeriesCover({
  topic,
  title,
  category,
  count,
  variant = 'card',
}: Props) {
  return (
    <div className={`series-cover series-cover--${variant} cover-${topicClass(topic)}`}>
      <span className="series-cover-glow" aria-hidden="true" />
      <span className="series-cover-grid" aria-hidden="true" />
      {category && <span className="series-cover-kicker">{category}</span>}
      <span className="series-cover-icon">
        <TopicIcon topic={topic} size={variant === 'hero' ? 52 : variant === 'thumb' ? 22 : 34} />
      </span>
      <span className="series-cover-title">{title}</span>
      {typeof count === 'number' && (
        <span className="series-cover-count">{count} bài học</span>
      )}
    </div>
  );
}
