import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Design system: Open-Knowledge MASTER.md
// Style: Minimalism & Swiss Style | Pattern: FAQ/Documentation Landing
// Primary #475569, Accent #2563EB, BG #F8FAFC, FG #1E293B

const config: Config = {
  title: 'Open-Knowledge',
  tagline: 'Các khóa học kỹ thuật — Kafka, Docker & K8s, LangChain, LangGraph',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  // TODO: đổi thành domain Vercel/Cloudflare thật khi deploy
  url: 'https://open-knowledge.vercel.app',
  baseUrl: '/',

  organizationName: 'open-knowledge',
  projectName: 'open-knowledge',

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
    localeConfigs: {
      vi: {label: 'Tiếng Việt'},
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Content được sync tự động từ repo gốc, xem scripts/sync-content.mjs
          editUrl: undefined,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Open-Knowledge',
      logo: {
        alt: 'Open-Knowledge Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'knowledgeSidebar',
          position: 'left',
          label: 'Tài liệu',
        },
        {
          href: 'https://github.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Học tập',
          items: [
            {label: 'Bắt đầu học', to: '/intro'},
            {label: 'Apache Kafka', to: '/kafka/kafka-introduction/gioi-thieu-khoa-hoc'},
          ],
        },
        {
          title: 'Khóa học',
          items: [
            {label: 'Docker & Kubernetes', to: '/devops/docker-k8s/section-01-getting-started/what-is-docker'},
            {label: 'LangChain', to: '/ai/langchain/introduction/course-introduction'},
            {label: 'LangGraph', to: '/ai/langgraph/introduction/intro'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Open-Knowledge. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'cpp', 'bash', 'json', 'yaml', 'sql'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        // NOTE: chỉ dùng 'en' — pipeline 'vi' của lunr gây cảnh báo
        // "Function is not registered" khiến index tìm kiếm có thể không load được.
        // Nội dung tiếng Việt vẫn được index theo token, tìm kiếm chính xác vẫn khớp.
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
        searchBarShortcutHint: true,
      },
    ],
  ],
};

export default config;
