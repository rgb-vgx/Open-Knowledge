import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { docRoute, type DocsIndex } from '../lib/docs';
import { TopicIcon } from '../components/topicIcons';

export default function Home({ index }: { index: DocsIndex }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const cards = Object.entries(index.tops).sort((a, b) => b[1] - a[1]);
  // Gợi ý đọc: bài đầu tiên của 8 chủ đề lớn nhất (không dùng ngày tháng)
  const suggested = cards.slice(0, 8).map(([t]) => index.docs.find((d) => d.top === t)!).filter(Boolean);

  return (
    <div className="home">
      <section className="hero">
        <h1>Open-Knowledge</h1>
        <p>Kho kiến thức kỹ thuật — {index.total} bài viết: AI, Backend, DevOps, C++, System Programming…</p>
        <form
          className="hero-search"
          role="search"
          onSubmit={(e) => { e.preventDefault(); nav(q.trim() ? `/tim-kiem?q=${encodeURIComponent(q.trim())}` : '/tim-kiem'); }}
        >
          <input
            className="input"
            placeholder="Tìm bài viết… (gõ không dấu vẫn ra)"
            aria-label="Tìm kiếm bài viết"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn primary" type="submit">
            <MagnifyingGlass size={18} weight="bold" aria-hidden="true" /> Tìm
          </button>
        </form>
        <div className="hero-actions">
          <Link className="btn" to={index.docs.length ? docRoute(index.docs[0]) : '/'}>Bắt đầu đọc</Link>
          <Link className="btn" to="/tim-kiem">Tìm kiếm nâng cao</Link>
        </div>
        <p className="muted">{cards.length} chủ đề · cập nhật liên tục từ kho markdown</p>
      </section>

      <section aria-labelledby="topics-h">
        <h2 id="topics-h">Chủ đề</h2>
        <div className="grid">
          {cards.map(([t, c]) => (
            <Link key={t} className="card reveal" to={`/chu-de/${encodeURIComponent(t)}`}>
              <div className="card-icon"><TopicIcon topic={t} /></div>
              <div className="card-title">{t}</div>
              <div className="muted">{c} bài</div>
            </Link>
          ))}
        </div>
      </section>

      {suggested.length > 0 && (
        <section aria-labelledby="recent-h">
          <h2 id="recent-h">Gợi ý đọc</h2>
          <ul className="recent">
            {suggested.map((d) => (
              <li key={d.id}>
                <Link to={docRoute(d)}>{d.title}</Link>
                <span className="muted"> · {d.top}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
