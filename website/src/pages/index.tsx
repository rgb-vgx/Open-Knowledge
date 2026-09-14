import {useMemo, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Sinh tự động bởi scripts/sync-content.mjs — chỉ các khóa học còn bài học.
const {categories, totalDocs} = require('../data/categories.json') as {
  categories: {key: string; name: string; desc: string; to: string; count: number}[];
  totalDocs: number;
};

type Category = {
  name: string;
  desc: string;
  to: string;
  count: number;
  Icon: () => ReactNode;
};

// Inline SVG icon set — consistent 1.5px stroke, no emoji (per design system rules)
const svgProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const BookIcon = () => (
  <svg {...svgProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></svg>
);
const CpuIcon = () => (
  <svg {...svgProps}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></svg>
);
const ServerIcon = () => (
  <svg {...svgProps}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>
);
const NetIcon = () => (
  <svg {...svgProps}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" /></svg>
);

const ICONS: Record<string, () => ReactNode> = {
  ai: CpuIcon,
  devops: ServerIcon,
  kafka: NetIcon,
};

const CATEGORIES: Category[] = categories.map((c) => ({
  ...c,
  Icon: ICONS[c.key] ?? BookIcon,
}));

function HomepageHeader({query, setQuery}: {query: string; setQuery: (v: string) => void}) {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <span className={styles.heroKicker}>{totalDocs} bài học · Tiếng Việt</span>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}. Gõ để lọc khóa học bên dưới, hoặc tìm kiếm toàn văn mọi bài học.</p>
        <div className={styles.heroSearch} role="search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Lọc khóa học: kafka, docker, langchain..."
            aria-label="Lọc khóa học"
          />
          <Link className="button button--primary button--lg" to="/intro">
            Bắt đầu học
          </Link>
        </div>
        <p className={styles.heroHint}>
          Mẹo: nhấn <kbd>Ctrl</kbd> + <kbd>K</kbd> để tìm kiếm toàn văn. Hỗ trợ sáng/tối, đọc tốt trên mobile.
        </p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Layout title="Trang chủ" description="Open-Knowledge — khóa học kỹ thuật: Apache Kafka, Docker & Kubernetes, LangChain, LangGraph.">
      <HomepageHeader query={query} setQuery={setQuery} />
      <main>
        <section className={styles.categorySection} aria-label="Khóa học">
          <Heading as="h2" className={styles.sectionTitle}>Khóa học</Heading>
          <p className={styles.sectionDesc}>
            {filtered.length}/{CATEGORIES.length} khóa học{query.trim() ? ` khớp với "${query.trim()}"` : ''}.
          </p>
          {filtered.length === 0 ? (
            <div className={styles.emptyState} role="status">
              <p>Không có khóa học nào khớp. Thử từ khóa khác như "kafka", "docker", "langchain" — hoặc nhấn Ctrl+K để tìm trong bài học.</p>
              <Link className="button button--secondary" to="/intro" onClick={() => setQuery('')}>
                Xem tất cả khóa học
              </Link>
            </div>
          ) : (
            <div className={styles.categoryGrid}>
              {filtered.map(({name, desc, to, count, Icon}) => (
                <Link key={to} to={to} className={styles.categoryCard}>
                  <span className={styles.categoryIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span>
                    <h3>{name}</h3>
                    <p>{desc} · {count} bài</p>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
