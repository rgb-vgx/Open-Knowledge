# Open-Knowledge

A comprehensive collection of tutorials, notes, and code examples covering computer science topics, organized by subject area — plus a React web app that renders the whole library in the browser.

## What's inside

| Topic | Series / courses |
| --- | --- |
| AI | Claude Code (23), LangChain & Agentic AI (173), LangGraph (70), PyTorch for Deep Learning (345), Complete Computer Vision Bootcamp (180), Python for Computer Vision with OpenCV (79), Self-driving Car with Jetson Nano (69) |
| BackEnd | Fundamentals of Backend Engineering (59) |
| C++ | C++ Multithreading (78), Modern C++ (10) |
| Cloud | AWS Certified Cloud Practitioner (276) |
| DevOps | Docker & Kubernetes (259) |
| Distributed Systems | Apache Kafka (129) |
| Golang | Learn Go for Beginners (100), Concurrency in Go (86) |
| Nvidia | CUDA Programming (2), NVIDIA NeMo Agent Toolkit (1), Mastering GPU Parallel Programming with CUDA (57) |
| System Design | Mastering System Design (128), Microservices & Event-Driven Architecture (27) |

About 2,150 articles in total. Every course is a series of numbered lessons that can be read independently.

## Repository layout

```text
.
├── AI/                    Claude Code, LangChain, LangGraph, PyTorch, Computer Vision, Self-driving Car
├── BackEnd/               Fundamentals of Backend Engineering
├── C++/                   C++ Multithreading, Modern C++
├── Cloud/                 AWS Certified Cloud Practitioner
├── DevOps/                Docker & Kubernetes
├── Distributed Systems/   Apache Kafka
├── Golang/                Learn Go, Concurrency in Go
├── Nvidia/                CUDA Programming, NeMo Agent Toolkit, Mastering GPU Parallel Programming
├── System Design/         Mastering System Design, Microservices & Event-Driven Architecture
├── website/               React + Vite app that reads the markdown library
├── _RUNBOOK ... .md       Workflow for turning course transcripts into blog lessons
├── _PROMPT ... .md        Prompt template used to write each lesson
└── vercel.json            Vercel deployment configuration
```

Each course folder contains:

- numbered section folders such as `01. Introduction/`
- lesson files such as `001 - What Is PyTorch.md`
- `_STYLE - Blog style guide.md` — voice and formatting rules for that course
- `MUC_LUC.md` — clickable table of contents, including skipped lessons

Most lessons are in Vietnamese, keep English technical terms, and start with YAML frontmatter:

```yaml
---
title: 'Bài NNN — chủ đề'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 123
status: edited
source: 'original transcript file'
categories:
- AI
tags: []
---
```

The site still renders lessons without frontmatter, so older courses that use only a `# Heading` and a `> Nguồn:` blockquote continue to work.

## Web app

The reader is a plain React 19 + Vite 6 + TypeScript app in `website/`. It fetches a generated index once, then loads each lesson's markdown at runtime and renders it with `react-markdown` (GFM, raw HTML, syntax highlighting). Mermaid diagrams are rendered client-side.

### Development

```bash
cd website
npm install
npm run dev        # http://localhost:3000
```

From the repository root you can also use the wrappers:

```bash
npm run dev        # start the dev server
npm run build      # type-check, build the site, and regenerate the index
npm run sync       # only regenerate public/docs + public/docs-index.json
npm run typecheck  # tsc --noEmit
```

### Content pipeline

`website/scripts/build-index.mjs` runs automatically before `dev` and `build`:

1. walks every `*.md` file outside `website/`, `.git`, `node_modules`, `build`
2. parses frontmatter and derives series, section, chapter, topic, reading time, excerpt, and `article | meta` kind
3. copies each lesson to `website/public/docs/<hash>.md` under a URL-safe name
4. writes `website/public/docs-index.json`, which the app loads on startup

Series and topic metadata live in the `SERIES` and `TOPIC_META` registries at the top of that script. Adding a new course folder means adding one `SERIES` entry (plus a `_STYLE` guide and `MUC_LUC.md`).

### Deployment

`vercel.json` builds with Vite and serves `website/build`. The app uses a hash router, so no server-side rewrites are required.

## How to read

1. Browse a topic folder or open the site.
2. Pick a series and read its lessons in chapter order.
3. Use the in-page table of contents, the series lesson navigation, previous/next chapter links, and full-text search (diacritic-insensitive).

## Contributing

Contributions are welcome:

- add new topics or courses
- improve explanations, examples, or fix outdated information
- add exercises or code samples
- propose better organization

Please open a pull request following the normal GitHub workflow. When adding a course, include its `_STYLE` guide and `MUC_LUC.md`, and register it in `website/scripts/build-index.mjs`.

## License

This repository is open source under the MIT License. Content is provided for educational and professional use.
