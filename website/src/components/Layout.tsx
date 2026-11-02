import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  GithubLogo,
  List,
  MagnifyingGlass,
  Moon,
  Sun,
  X,
} from '@phosphor-icons/react';

function themeInit(): 'light' | 'dark' {
  const saved = localStorage.getItem('ok-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'light';
}

const NAV = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/series', label: 'Series' },
  { to: '/chu-de', label: 'Chủ đề' },
  { to: '/thu-vien', label: 'Thư viện' },
];

export default function Layout({
  children,
  total = 0,
}: {
  children: ReactNode;
  total?: number;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(themeInit);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('ok-theme', theme);
  }, [theme]);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [loc.pathname]);

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
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(q.trim() ? `/tim-kiem?q=${encodeURIComponent(q.trim())}` : '/tim-kiem');
    setOpen(false);
  };

  return (
    <div className="app">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('main');
          el?.focus();
          el?.scrollIntoView();
        }}
      >
        Bỏ qua tới nội dung
      </a>

      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="site-logo" aria-label="Open-Knowledge — trang chủ">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" width={34} height={34} />
            <span>Open-Knowledge</span>
          </Link>

          <nav className="site-nav" aria-label="Điều hướng chính">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <form className="nav-search" role="search" onSubmit={submitSearch}>
            <MagnifyingGlass size={17} aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              placeholder={total ? `Tìm trong ${total} bài…` : 'Tìm bài viết…'}
              aria-label="Tìm kiếm bài viết"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <kbd aria-hidden="true">Ctrl K</kbd>
          </form>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              title="Sáng / tối"
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a
              className="icon-btn nav-github"
              href="https://github.com/rgb-vgx/Open-Knowledge"
              target="_blank"
              rel="noopener"
              aria-label="GitHub repository"
              title="GitHub"
            >
              <GithubLogo size={19} />
            </a>
            <button
              className="icon-btn nav-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={open}
            >
              {open ? <X size={21} /> : <List size={21} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-menu">
            <form role="search" onSubmit={submitSearch} className="mobile-search">
              <MagnifyingGlass size={17} aria-hidden="true" />
              <input
                type="search"
                placeholder="Tìm bài viết…"
                aria-label="Tìm kiếm bài viết"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </form>
            <nav aria-label="Điều hướng di động">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end}>
                  {item.label}
                </NavLink>
              ))}
              <a
                href="https://github.com/rgb-vgx/Open-Knowledge"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="main" tabIndex={-1}>{children}</main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" width={40} height={40} />
              <span>Open-Knowledge</span>
            </Link>
            <p>
              Kho kiến thức kỹ thuật mở: AI, Backend, C++, Cloud, DevOps và System Design —
              được biên soạn lại từ các khóa học và tài liệu chuyên sâu.
            </p>
          </div>
          <div className="footer-links">
            <h4>Khám phá</h4>
            <Link to="/series">Series</Link>
            <Link to="/chu-de">Chủ đề</Link>
            <Link to="/thu-vien">Thư viện</Link>
            <Link to="/tim-kiem">Tìm kiếm</Link>
          </div>
          <div className="footer-links">
            <h4>Dự án</h4>
            <a href="https://github.com/rgb-vgx/Open-Knowledge" target="_blank" rel="noopener">
              GitHub
            </a>
            <a href="https://github.com/rgb-vgx/Open-Knowledge#readme" target="_blank" rel="noopener">
              README
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Open-Knowledge. Nội dung biên soạn cho mục đích học tập.</p>
          <p>React · Markdown render tại runtime</p>
        </div>
      </footer>
    </div>
  );
}
