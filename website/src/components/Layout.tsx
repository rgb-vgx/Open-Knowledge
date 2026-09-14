import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, MagnifyingGlass, Moon, Sun } from '@phosphor-icons/react';

function themeInit(): string {
  const saved = localStorage.getItem('ok-theme');
  if (saved) return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function Layout({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  const [theme, setTheme] = useState(themeInit);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ok-theme', theme);
  }, [theme]);

  // Ctrl+K / "/" focus ô tìm kiếm
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="app">
      <a className="skip-link" href="#main">Bỏ qua tới nội dung</a>
      <header className="navbar">
        <button
          className="btn icon only-mobile"
          onClick={() => setOpen((o) => !o)}
          aria-label="Mở mục lục"
          aria-expanded={open}
        >
          <List size={20} aria-hidden="true" />
        </button>
        <Link to="/" className="brand" aria-label="Open-Knowledge trang chủ">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" width={26} height={26} />
          <span>Open-Knowledge</span>
        </Link>
        <form
          className="nav-search"
          role="search"
          onSubmit={(e) => { e.preventDefault(); nav(q.trim() ? `/tim-kiem?q=${encodeURIComponent(q.trim())}` : '/tim-kiem'); }}
        >
          <MagnifyingGlass size={16} aria-hidden="true" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }} />
          <input
            ref={searchRef}
            className="input"
            style={{ paddingLeft: 36 }}
            placeholder="Tìm trong 886 bài…"
            aria-label="Tìm kiếm toàn trang"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <kbd className="search-hint" aria-hidden="true">Ctrl K</kbd>
        </form>
        <button
          className="btn ghost icon"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
          title="Sáng / tối"
        >
          {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>
      </header>
      <div className="body">
        <aside className={open ? 'sidebar open' : 'sidebar'} aria-label="Mục lục tài liệu">
          <div onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}>
            {sidebar}
          </div>
        </aside>
        {open && <div className="overlay only-mobile" onClick={() => setOpen(false)} />}
        <main className="content" id="main">{children}</main>
      </div>
      <footer className="footer">
        <span>Open-Knowledge · web React thuần · markdown render ra HTML lúc chạy</span>
      </footer>
    </div>
  );
}
