import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = {
  coral: "#ff6b4a",
  blue: "#3b82f6",
  green: "#22c55e",
  amber: "#f59e0b",
  muted: "#5f5e5a",
};

const REVENUE = [
  { segment: "Ent", full: "Enterprise", value: 420 },
  { segment: "SMB", full: "SMB", value: 268 },
  { segment: "Self", full: "Self-serve", value: 510 },
  { segment: "Part", full: "Partner", value: 186 },
];

const TRACE = [
  { name: "Compiled", value: 72 },
  { name: "Traversed", value: 18 },
  { name: "Refused", value: 10 },
];

const LATENCY = [
  { t: "0", ms: 42 },
  { t: "1", ms: 38 },
  { t: "2", ms: 45 },
  { t: "3", ms: 28 },
  { t: "4", ms: 31 },
  { t: "5", ms: 22 },
  { t: "6", ms: 26 },
  { t: "7", ms: 19 },
  { t: "8", ms: 24 },
];

const BAR_COLORS = [COLORS.coral, COLORS.blue, COLORS.green, COLORS.amber];
const PIE_COLORS = [COLORS.green, COLORS.blue, COLORS.amber];

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

export default function AnalyticsStage() {
  const bars = useBoxWidth(300);
  const pie = useBoxWidth(160);
  const spark = useBoxWidth(160);

  return (
    <div className="analytics-stage">
      <div className="stage-card stage-main">
        <div className="stage-top">
          <span className="stage-dot live" />
          <span>Agent analytics · live</span>
          <span className="stage-plane">metric plane</span>
        </div>

        <div className="stage-prompt">
          <span className="prompt-label">Ask</span>
          <p className="prompt-text">
            What drove revenue by segment last quarter?
            <span className="caret" />
          </p>
        </div>

        <div className="stage-charts">
          <div className="chart-panel">
            <p className="chart-label">Revenue by segment</p>
            <div className="chart-box" ref={bars.ref} style={{ width: "100%", height: 140 }}>
              <BarChart width={bars.width} height={140} data={REVENUE} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="segment"
                  tick={{ fill: COLORS.muted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={[0, "dataMax"]} />
                <Tooltip
                  cursor={{ fill: "rgba(25,25,25,0.04)" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid rgba(25,25,25,0.1)",
                    fontSize: 12,
                  }}
                  formatter={(v) => [`$${Number(v).toLocaleString()}k`, "Revenue"]}
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.full ?? ""}
                />
                <Bar dataKey="value" radius={[8, 8, 4, 4]} isAnimationActive={false}>
                  {REVENUE.map((row, i) => (
                    <Cell key={row.segment} fill={BAR_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>

          <div className="chart-side">
            <div className="donut-wrap">
              <p className="chart-label">Answer path</p>
              <div className="donut-chart" ref={pie.ref} style={{ width: "100%", height: 120 }}>
                <PieChart width={pie.width} height={120}>
                  <Pie
                    data={TRACE}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={34}
                    outerRadius={50}
                    paddingAngle={3}
                    isAnimationActive={false}
                  >
                    {TRACE.map((row, i) => (
                      <Cell key={row.name} fill={PIE_COLORS[i]} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid rgba(25,25,25,0.1)",
                      fontSize: 12,
                    }}
                    formatter={(v) => [`${v}%`, "Share"]}
                  />
                </PieChart>
                <div className="donut-center">
                  <strong>98%</strong>
                  <span>traceable</span>
                </div>
              </div>
            </div>

            <div className="spark">
              <p className="chart-label">Query latency</p>
              <div className="chart-box short" ref={spark.ref} style={{ width: "100%", height: 56 }}>
                <AreaChart width={spark.width} height={56} data={LATENCY} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="latFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.blue} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={COLORS.blue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="ms"
                    stroke={COLORS.blue}
                    strokeWidth={2.5}
                    fill="url(#latFill)"
                    isAnimationActive={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid rgba(25,25,25,0.1)",
                      fontSize: 12,
                    }}
                    formatter={(v) => [`${v}ms`, "Latency"]}
                    labelFormatter={() => ""}
                  />
                </AreaChart>
              </div>
              <p className="spark-meta">
                <em>24ms</em> compile → execute
              </p>
            </div>
          </div>
        </div>

        <div className="stage-trace">
          <span className="trace-pill ok">compiled</span>
          <code>def f9241c9e · SUM(line_total) · joins proven</code>
        </div>
      </div>

      <div className="stage-float f1">
        <span className="float-icon mi" />
        <div>
          <strong>Trusted</strong>
          <p>Definition-versioned answers</p>
        </div>
      </div>
      <div className="stage-float f2">
        <span className="float-icon ac" />
        <div>
          <strong>Accurate</strong>
          <p>No LLM-written joins</p>
        </div>
      </div>
      <div className="stage-float f3">
        <span className="float-icon sc" />
        <div>
          <strong>Scalable</strong>
          <p>Same core · web · MCP · SDK</p>
        </div>
      </div>
    </div>
  );
}
