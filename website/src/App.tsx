import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Topic from './pages/Topic';
import Topics from './pages/Topics';
import Series from './pages/Series';
import SeriesDetail from './pages/SeriesDetail';
import Search from './pages/Search';
import Library from './pages/Library';
import DocPage from './pages/DocPage';
import { fetchIndex, type DocsIndex } from './lib/docs';

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
  if (!index) {
    return (
      <div className="boot">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" width={44} height={44} />
        <p>Đang tải mục lục…</p>
      </div>
    );
  }

  return (
    <HashRouter>
      <Layout total={index.articleCount}>
        <Routes>
          <Route path="/" element={<Home index={index} />} />
          <Route path="/series" element={<Series index={index} />} />
          <Route path="/series/:slug" element={<SeriesDetail index={index} />} />
          <Route path="/chu-de" element={<Topics index={index} />} />
          <Route path="/chu-de/:name" element={<Topic index={index} />} />
          <Route path="/thu-vien" element={<Library index={index} />} />
          <Route path="/tim-kiem" element={<Search index={index} />} />
          <Route path="/docs/*" element={<DocPage index={index} />} />
          <Route path="*" element={<Home index={index} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
