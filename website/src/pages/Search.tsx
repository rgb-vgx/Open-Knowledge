import { useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchDocs, type DocsIndex } from '../lib/docs';
import { PostRow } from '../components/Cards';

const LIMIT = 80;

export default function Search({ index }: { index: DocsIndex }) {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const topic = params.get('topic') ?? 'all';
  const deferredQ = useDeferredValue(q);
  const results = useMemo(
    () => searchDocs(index.docs, deferredQ, LIMIT, topic === 'all' ? undefined : topic),
    [index.docs, deferredQ, topic],
  );
  const searching = q !== deferredQ;

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <div className="index-page search-page">
      <header className="page-hero">
        <span className="eyebrow">Tra cứu</span>
        <h1 className="page-title">Tìm kiếm</h1>
        <p className="page-lede">
          Tìm theo tiêu đề, series, phần hoặc nội dung. Gõ không dấu vẫn ra kết quả có dấu.
        </p>
      </header>

      <form className="search-hero" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          autoFocus
          className="input input--large"
          placeholder="Ví dụ: docker, kafka, context engineering, mutex…"
          aria-label="Từ khóa tìm kiếm"
          value={q}
          onChange={(e) => setParam('q', e.target.value)}
        />
      </form>

      <div className="filter-bar" role="group" aria-label="Lọc theo chủ đề">
        <button className={topic === 'all' ? 'filter-chip active' : 'filter-chip'} onClick={() => setParam('topic', '')}>
          Tất cả
        </button>
        {index.topics.map((t) => (
          <button
            key={t.key}
            className={topic === t.key ? 'filter-chip active' : 'filter-chip'}
            onClick={() => setParam('topic', t.key)}
          >
            {t.title}
          </button>
        ))}
      </div>

      {!q.trim() && (
        <div className="search-empty">
          <p>Nhập từ khóa để bắt đầu. Một vài gợi ý:</p>
          <div className="hero-quick">
            {['Docker', 'Kafka', 'agent', 'mutex', 'system design', 'AWS'].map((term) => (
              <button key={term} onClick={() => setParam('q', term)}>{term}</button>
            ))}
          </div>
        </div>
      )}

      {q.trim() && (
        <p className="search-count" aria-live="polite">
          {searching
            ? 'Đang tìm…'
            : results.length >= LIMIT
              ? `Hiển thị ${LIMIT} kết quả đầu tiên cho “${deferredQ}”`
              : `${results.length} kết quả cho “${deferredQ}”`}
          {topic !== 'all' && ` trong ${index.topics.find((t) => t.key === topic)?.title ?? topic}`}
        </p>
      )}

      {results.length > 0 && (
        <div className="post-list search-results">
          {results.map((d) => <PostRow key={d.id} doc={d} />)}
        </div>
      )}

      {q.trim() && !searching && results.length === 0 && (
        <p className="empty-state">
          Không tìm thấy bài nào khớp “{q}”. Thử từ khóa ngắn hơn hoặc bỏ bộ lọc chủ đề.
        </p>
      )}
    </div>
  );
}
