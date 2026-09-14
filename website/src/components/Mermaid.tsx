import { useEffect, useId, useRef, useState } from 'react';

/**
 * Render 1 khối ```mermaid thành SVG.
 * - mermaid được import động nên tách chunk riêng, chỉ tải khi bài có sơ đồ.
 * - Tự vẽ lại khi đổi dark/light mode.
 */
export default function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const seq = useRef(0);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? 'light');

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.dataset.theme ?? 'light'),
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    const renderId = `mmd-${id}-${++seq.current}`;
    setSvg(null);
    setError(null);
    (async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose',
      });
      const { svg } = await mermaid.render(renderId, chart);
      if (alive) setSvg(svg);
    })().catch((e) => {
      if (alive) setError(String((e as Error)?.message ?? e));
    });
    return () => {
      alive = false;
    };
  }, [chart, theme, id]);

  if (error) {
    return (
      <div className="mermaid-error">
        <pre>
          <code className="language-mermaid">{chart}</code>
        </pre>
        <p className="error">Không vẽ được sơ đồ: {error}</p>
      </div>
    );
  }
  if (svg == null) {
    return (
      <pre>
        <code className="language-mermaid">{chart}</code>
      </pre>
    );
  }
  return <div className="mermaid" dangerouslySetInnerHTML={{ __html: svg }} />;
}
