import { type DocsIndex } from '../lib/docs';
import { TopicCard } from '../components/Cards';

export default function Topics({ index }: { index: DocsIndex }) {
  return (
    <div className="index-page">
      <header className="page-hero">
        <span className="eyebrow">Bản đồ kiến thức</span>
        <h1 className="page-title">Chủ đề</h1>
        <p className="page-lede">
          Chín mảng kiến thức lớn, được sắp xếp thành series và chương. Chọn một
          chủ đề để xem toàn bộ lộ trình học.
        </p>
        <div className="page-stats">
          <span><strong>{index.topics.length}</strong> chủ đề</span>
          <span className="dot">·</span>
          <span><strong>{index.series.length}</strong> series</span>
          <span className="dot">·</span>
          <span><strong>{index.articleCount.toLocaleString('vi-VN')}</strong> bài học</span>
        </div>
      </header>

      <div className="topic-grid topic-grid--large">
        {index.topics.map((t) => <TopicCard key={t.key} topic={t} />)}
      </div>
    </div>
  );
}
