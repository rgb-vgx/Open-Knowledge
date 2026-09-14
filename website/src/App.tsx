import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Topic from './pages/Topic';
import Search from './pages/Search';
import DocPage from './pages/DocPage';
import { fetchIndex, type DocsIndex } from './lib/docs';

function Shell({ index }: { index: DocsIndex }) {
  const loc = useLocation();
  const m = loc.pathname.match(/^\/docs\/(.+)$/);
  const activeId = m ? m[1].split('/').map(decodeURIComponent).join('/') : null;

  return (
    <Layout
      sidebar={<Sidebar docs={index.docs} tops={index.tops} activeId={activeId} />}
    >
      <Routes>
        <Route path="/" element={<Home index={index} />} />
        <Route path="/chu-de/:name" element={<Topic index={index} />} />
        <Route path="/tim-kiem" element={<Search index={index} />} />
        <Route path="/docs/*" element={<DocPage index={index} />} />
        <Route path="*" element={<Home index={index} />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  const [index, setIndex] = useState<DocsIndex | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchIndex().then(setIndex).catch((e) => setErr(String(e?.message ?? e)));
  }, []);

  if (err) {
    return (
      <div className="boot">
        <h1>Không tải được dữ liệu</h1>
        <p>{err}</p>
        <p className="muted">Hãy chạy <code>npm run build-index</code> trong thư mục <code>website/</code>.</p>
      </div>
    );
  }
  if (!index) return <div className="boot"><p>Đang tải mục lục…</p></div>;

  return (
    <HashRouter>
      <Shell index={index} />
    </HashRouter>
  );
}
