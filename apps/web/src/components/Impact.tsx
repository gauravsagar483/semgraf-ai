import { useEffect, useRef, useState } from "react";
import { Area, AreaChart, Bar, BarChart, Cell, Tooltip, XAxis } from "recharts";

const COLORS = ["#ff6b4a", "#3b82f6", "#22c55e", "#f59e0b", "#0f766e"];

const WEEKLY = [
  { d: "Mon", v: 32 },
  { d: "Tue", v: 48 },
  { d: "Wed", v: 41 },
  { d: "Thu", v: 62 },
  { d: "Fri", v: 55 },
  { d: "Sat", v: 38 },
  { d: "Sun", v: 44 },
];

const TREND = [
  { w: "W1", n: 18 },
  { w: "W2", n: 24 },
  { w: "W3", n: 22 },
  { w: "W4", n: 31 },
  { w: "W5", n: 36 },
  { w: "W6", n: 42 },
  { w: "W7", n: 48 },
  { w: "W8", n: 55 },
];

const PILLARS = [
  {
    title: "Trusted",
    body: "Every number cites a definition version and plane. Agents can’t invent metrics that don’t exist.",
    color: "c-trust",
  },
  {
    title: "Accurate",
    body: "Metric plane compiles deterministic SQL. Relationship plane walks verified lineage — and fails loud when out of scope.",
    color: "c-accurate",
  },
  {
    title: "Scalable",
    body: "One runtime under many agents: Ask, MCP hosts, and SDKs share the same compile + traverse core.",
    color: "c-scale",
  },
  {
    title: "Reliable",
    body: "Same question → same joins → same output. Trace shows the SQL or blast radius so prod stays auditable.",
    color: "c-reliable",
  },
];

function useBoxWidth(fallback = 280) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(120, Math.floor(el.clientWidth)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

export default function Impact() {
  const weekly = useBoxWidth(320);
  const trend = useBoxWidth(320);

  return (
    <section className="section impact" id="impact">
      <div className="shell">
        <header className="section-head wide">
          <p className="hero-kicker">The problem we own</p>
          <h2 className="section-title">Agents without a runtime ship wrong analytics</h2>
          <p className="section-lead">
            LLMs write SQL that looks right and isn’t. Semgraf sits between agents and the warehouse so
            every chart-ready answer is compiled or traversed — then proven.
          </p>
        </header>

        <div className="impact-grid">
          {PILLARS.map((p) => (
            <article key={p.title} className={`impact-card ${p.color}`}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>

        <div className="impact-visual card">
          <div className="impact-visual-copy">
            <h3>From agent intent to chart-ready truth</h3>
            <ol>
              <li>
                <strong>Pain</strong> — agent asks; free-form SQL would invent joins
              </li>
              <li>
                <strong>Route</strong> — metric plane or relationship plane
              </li>
              <li>
                <strong>Prove</strong> — definition hash + Trace (SQL or blast radius)
              </li>
              <li>
                <strong>Ship</strong> — dashboards and decisions on numbers you can defend
              </li>
            </ol>
          </div>
          <div className="impact-mini-charts">
            <p className="chart-label">Proven asks / week</p>
            <div className="chart-box" ref={weekly.ref} style={{ width: "100%", height: 100 }}>
              <BarChart width={weekly.width} height={100} data={WEEKLY} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="d" tick={{ fill: "#5f5e5a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid rgba(25,25,25,0.1)",
                    fontSize: 12,
                  }}
                  formatter={(v) => [v, "Asks"]}
                />
                <Bar dataKey="v" radius={[6, 6, 2, 2]} isAnimationActive={false}>
                  {WEEKLY.map((row, i) => (
                    <Cell key={row.d} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
            <p className="chart-label" style={{ marginTop: 12 }}>
              Traceable answers over time
            </p>
            <div className="chart-box" ref={trend.ref} style={{ width: "100%", height: 100 }}>
              <AreaChart width={trend.width} height={100} data={TREND} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b4a" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#ff6b4a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="n"
                  stroke="#ff6b4a"
                  strokeWidth={2.5}
                  fill="url(#trendFill)"
                  isAnimationActive={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid rgba(25,25,25,0.1)",
                    fontSize: 12,
                  }}
                  formatter={(v) => [v, "Answers"]}
                />
              </AreaChart>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
