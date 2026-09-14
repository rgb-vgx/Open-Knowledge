import { memo, useDeferredValue, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { docRoute, type DocMeta } from '../lib/docs';

interface Props {
  docs: DocMeta[];
  tops: Record<string, number>;
  activeId: string | null;
}

const PAGE = 120;

// Hàng mục lục pure + memo: chỉ render lại khi props đổi (theo guideline react)
const DocRow = memo(function DocRow({ d, active, num }: { d: DocMeta; active: boolean; num: number }) {
  return (
    <NavLink to={docRoute(d)} className={active ? 'doc-link active' : 'doc-link'} title={d.file}>
      <span className="doc-link-title"><span className="doc-num">{num}.</span> {d.title}</span>
      <span className="doc-link-dir">{d.dir || d.top}</span>
    </NavLink>
  );
});

export default function Sidebar({ docs, tops, activeId }: Props) {
  const [topic, setTopic] = useState<string>('all');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(PAGE);
  // Trì hoãn lọc theo nhịp render (tránh lọc 886 items mỗi keystroke)
  const deferredQ = useDeferredValue(q);
  const deferredTopic = useDeferredValue(topic);

  const topics = useMemo(() => Object.entries(tops).sort((a, b) => b[1] - a[1]), [tops]);

  const filtered = useMemo(() => {
    const nq = deferredQ.trim().toLowerCase();
    return docs.filter((d) => {
      if (deferredTopic !== 'all' && d.top !== deferredTopic) return false;
      if (nq && !`${d.title} ${d.file}`.toLowerCase().includes(nq)) return false;
      return true;
    });
  }, [docs, deferredTopic, deferredQ]);

  return (
    <div className="sidebar-inner">
      <input
        className="input"
        placeholder="Lọc trong mục lục…"
        aria-label="Lọc mục lục"
        value={q}
        onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
      />
      <div className="topic-list" role="group" aria-label="Lọc theo chủ đề">
        <button className={topic === 'all' ? 'topic active' : 'topic'} onClick={() => { setTopic('all'); setShown(PAGE); }} aria-pressed={topic === 'all'}>
          Tất cả ({docs.length})
        </button>
        {topics.map(([t, c]) => (
          <button
            key={t}
            className={topic === t ? 'topic active' : 'topic'}
            onClick={() => { setTopic(t); setShown(PAGE); }}
            aria-pressed={topic === t}
            title={t}
          >
            {t} ({c})
          </button>
        ))}
      </div>
      <nav className="doc-list" aria-label="Danh sách bài viết">
        {filtered.slice(0, shown).map((d, i) => (
          <DocRow key={d.id} d={d} active={d.id === activeId} num={i + 1} />
        ))}
        {filtered.length === 0 && <p className="muted">Không có bài nào khớp.</p>}
      </nav>
      {filtered.length > shown && (
        <button className="btn ghost" onClick={() => setShown((s) => s + PAGE)}>
          Hiện thêm ({filtered.length - shown})
        </button>
      )}
    </div>
  );
}
