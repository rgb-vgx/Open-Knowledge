import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { docRoute, searchDocs, type DocsIndex } from '../lib/docs';

export default function Search({ index }: { index: DocsIndex }) {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const deferredQ = useDeferredValue(q);
  const results = useMemo(() => searchDocs(index.docs, deferredQ), [index, deferredQ]);
  const searching = q !== deferredQ;

  return (
    <div className="page">
      <h1>Tìm kiếm</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="input large"
          autoFocus
          placeholder="Nhập từ khóa… (gõ không dấu vẫn tìm ra có dấu)"
          aria-label="Từ khóa tìm kiếm"
          value={q}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        />
      </form>
      {!q.trim() && <p className="muted">Ví dụ: “docker”, “kafka”, “context engineering”, “mutex”…</p>}
      {q.trim() && (
        <p className="muted" aria-live="polite">
          {searching ? 'Đang tìm…' : `${results.length} kết quả cho “${deferredQ}”`}
        </p>
      )}
      <ul className="doc-index">
        {results.map((d) => (
          <li key={d.id}>
            <Link to={docRoute(d)}>{d.title}</Link>
            <span className="muted"> · {d.top}</span>
            {d.excerpt && <p className="muted excerpt">{d.excerpt.slice(0, 180)}…</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
