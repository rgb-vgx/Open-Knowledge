import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { docRoute, norm, type DocsIndex } from '../lib/docs';

export default function Topic({ index }: { index: DocsIndex }) {
  const { name } = useParams();
  const topic = name ? decodeURIComponent(name) : '';
  const [q, setQ] = useState('');

  const docs = useMemo(() => {
    const nq = norm(q.trim());
    return index.docs.filter((d) => {
      if (d.top !== topic) return false;
      if (nq && !norm(`${d.title} ${d.excerpt} ${d.dir}`).includes(nq)) return false;
      return true;
    });
  }, [index, topic, q]);

  // Gom theo thư mục con để dễ duyệt (giữ số thứ tự theo toàn chủ đề)
  const groups = useMemo(() => {
    const numOf = new Map(docs.map((d, i) => [d.id, i + 1]));
    const m = new Map<string, typeof docs>();
    for (const d of docs) {
      const g = d.dir || topic;
      if (!m.has(g)) m.set(g, []);
      m.get(g)!.push(d);
    }
    return { groups: [...m.entries()].sort((a, b) => a[0].localeCompare(b[0], 'vi')), numOf };
  }, [docs, topic]);

  if (!topic || !(topic in index.tops)) {
    return (
      <div className="page">
        <h1>Không tìm thấy chủ đề</h1>
        <p><Link to="/">Về trang chủ</Link></p>
      </div>
    );
  }

  return (
    <div className="page">
      <p className="breadcrumb"><Link to="/">Trang chủ</Link> / {topic}</p>
      <h1>{topic} <span className="muted">({docs.length} bài)</span></h1>
      <input className="input" placeholder={`Lọc trong ${topic}…`} value={q} onChange={(e) => setQ(e.target.value)} />
      {groups.groups.map(([g, list]) => (
        <section key={g}>
          <h3 className="group-title">{g}</h3>
          <ul className="doc-index">
            {list.map((d) => (
              <li key={d.id}>
                <Link to={docRoute(d)}><span className="doc-num">{groups.numOf.get(d.id)}.</span> {d.title}</Link>
                {d.excerpt && <p className="muted excerpt">{d.excerpt.slice(0, 160)}…</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
