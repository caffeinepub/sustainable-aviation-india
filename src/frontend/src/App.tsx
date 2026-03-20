import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BarChart2,
  BookOpen,
  CheckCircle,
  Cpu,
  Globe,
  Home,
  Leaf,
  Map as MapIcon,
  Plane,
  TrendingDown,
  Users,
  Volume2,
  Wind,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "comparison", label: "Aircraft Comparison", icon: Plane },
  { id: "mathematics", label: "Mathematics", icon: BarChart2 },
  { id: "casestudy", label: "Case Study", icon: MapIcon },
  { id: "sustainability", label: "Sustainability", icon: Leaf },
  { id: "soi", label: "SOI Connection", icon: BookOpen },
  { id: "conclusion", label: "Conclusion", icon: CheckCircle },
];

const FUEL_CHART_DATA = [
  {
    route: "DEL-BOM",
    A320neo: Math.round(2.4 * 1148),
    "737 MAX 8": Math.round(2.6 * 1148),
  },
  {
    route: "DEL-BLR",
    A320neo: Math.round(2.4 * 1740),
    "737 MAX 8": Math.round(2.6 * 1740),
  },
  {
    route: "DEL-MAA",
    A320neo: Math.round(2.4 * 1760),
    "737 MAX 8": Math.round(2.6 * 1760),
  },
];

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col z-40"
      style={{ boxShadow: "2px 0 12px oklch(0.25 0.07 240 / 6%)" }}
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.23 0.07 240), oklch(0.50 0.12 240))",
            }}
          >
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div>
            <div
              className="font-bold text-lg leading-none"
              style={{ color: "oklch(0.23 0.07 240)" }}
            >
              SDIA
            </div>
            <div
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.52 0.01 240)" }}
            >
              MYP 4 IDU Project
            </div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            data-ocid={`nav.${id}.link`}
            type="button"
            onClick={() => scrollTo(id)}
            className={`nav-pill ${active === id ? "active" : ""}`}
            style={active === id ? {} : { color: "oklch(0.33 0.01 240)" }}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <div
          className="rounded-lg p-3 text-xs"
          style={{ background: "oklch(0.23 0.07 240 / 6%)" }}
        >
          <div
            className="font-semibold"
            style={{ color: "oklch(0.23 0.07 240)" }}
          >
            IB MYP Grade 4
          </div>
          <div style={{ color: "oklch(0.52 0.01 240)" }}>
            Science + Mathematics
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="home" className="mb-8">
      <div
        className="hero-gradient rounded-3xl p-8 text-white relative overflow-hidden"
        style={{ minHeight: 260 }}
      >
        <div
          className="absolute right-8 top-4 opacity-10"
          style={{ fontSize: 160, lineHeight: 1 }}
        >
          ✈
        </div>
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5"
          style={{ background: "white", transform: "translate(30%, 30%)" }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Plane className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium opacity-80 tracking-wide uppercase">
              MYP 4 Interdisciplinary Unit
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2 leading-tight">
            Sustainable Domestic Aviation
            <br />
            in India
          </h1>
          <p className="text-base opacity-75 max-w-xl mb-8">
            Exploring how mathematics and engineering shape a greener future for
            India's rapidly growing aviation sector.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Aviation Growth",
                value: "+14.8%",
                sub: "Year-on-year (India)",
              },
              {
                label: "Domestic Routes",
                value: "2,500+",
                sub: "Active routes in 2024",
              },
              {
                label: "CO\u2082 per Flight",
                value: "~45.2T",
                sub: "Delhi–Mumbai (A320neo)",
              },
            ].map(({ label, value, sub }) => (
              <div key={label} className="kpi-tile">
                <div className="text-xs opacity-70 mb-1 uppercase tracking-wide">
                  {label}
                </div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs opacity-60 mt-1">{sub}</div>
              </div>
            ))}
            <div className="kpi-tile">
              <div className="text-xs opacity-70 mb-1 uppercase tracking-wide">
                Project Focus
              </div>
              <div className="text-lg font-bold leading-tight">MYP 4 IDU</div>
              <div className="mt-2">
                <Progress
                  value={85}
                  className="h-1.5"
                  style={{ background: "oklch(1 0 0 / 20%)" }}
                />
                <div className="text-xs opacity-60 mt-1">85% complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Aircraft Comparison ──────────────────────────────────────────────────────
interface AircraftCardProps {
  name: string;
  emoji: string;
  capacity: number;
  fuelLKm: number;
  range: number;
  engine: string;
  co2Hr: string;
  fuelPerPax: string;
  isEfficient: boolean;
  color: string;
}

function AircraftCard({
  name,
  emoji,
  capacity,
  fuelLKm,
  range,
  engine,
  co2Hr,
  fuelPerPax,
  isEfficient,
  color,
}: AircraftCardProps) {
  return (
    <div
      className="bg-card rounded-2xl p-6 card-hover border border-border flex-1"
      style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-3xl mb-2">{emoji}</div>
          <h3
            className="font-bold text-lg"
            style={{ color: "oklch(0.18 0.01 240)" }}
          >
            {name}
          </h3>
        </div>
        {isEfficient && (
          <Badge
            className="text-xs font-semibold"
            style={{
              background: "oklch(0.53 0.15 145 / 15%)",
              color: "oklch(0.35 0.14 145)",
              border: "1px solid oklch(0.53 0.15 145 / 30%)",
            }}
          >
            ✓ More Efficient
          </Badge>
        )}
      </div>
      <div className="space-y-0">
        {[
          { label: "Passenger Capacity", value: `${capacity} seats` },
          { label: "Fuel Consumption", value: `${fuelLKm} L/km` },
          { label: "Range", value: `${range.toLocaleString()} km` },
          { label: "Engine Type", value: engine },
          { label: "CO\u2082/hour", value: co2Hr },
          { label: "Fuel/Pax/100km", value: fuelPerPax },
        ].map(({ label, value }) => (
          <div key={label} className="spec-row">
            <span className="text-sm" style={{ color: "oklch(0.52 0.01 240)" }}>
              {label}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.18 0.01 240)" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <div
        className="mt-4 rounded-xl p-3 text-center"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <div
          className="text-xs font-bold uppercase tracking-wide"
          style={{ color }}
        >
          Fuel/Pax: {fuelPerPax}
        </div>
      </div>
    </div>
  );
}

function ComparisonSection() {
  const rows = [
    {
      metric: "Passenger Capacity",
      a320: "165 seats",
      b737: "162 seats",
      winner: "a320",
    },
    {
      metric: "Fuel per 100km (L)",
      a320: "240 L",
      b737: "260 L",
      winner: "a320",
    },
    { metric: "Range", a320: "6,300 km", b737: "6,570 km", winner: "b737" },
    {
      metric: "CO\u2082/hour",
      a320: "2.1 tonnes",
      b737: "2.3 tonnes",
      winner: "a320",
    },
    {
      metric: "Fuel/Pax/100km",
      a320: "1.455 L",
      b737: "1.605 L",
      winner: "a320",
    },
  ];

  return (
    <section id="comparison" className="mb-8">
      <p className="section-title">
        Aircraft Comparison — Efficiency &amp; Specs
      </p>
      <div className="flex gap-4 mb-6">
        <AircraftCard
          name="Airbus A320neo"
          emoji="✈️"
          capacity={165}
          fuelLKm={2.4}
          range={6300}
          engine="CFM LEAP-1A"
          co2Hr="2.1 tonnes/hr"
          fuelPerPax="1.455 L/km/pax"
          isEfficient={true}
          color="#2F74B5"
        />
        <AircraftCard
          name="Boeing 737 MAX 8"
          emoji="🛩️"
          capacity={162}
          fuelLKm={2.6}
          range={6570}
          engine="CFM LEAP-1B"
          co2Hr="2.3 tonnes/hr"
          fuelPerPax="1.605 L/km/pax"
          isEfficient={false}
          color="#3A86C8"
        />
      </div>
      <div
        className="bg-card rounded-2xl overflow-hidden border border-border"
        style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
        data-ocid="comparison.table"
      >
        <div
          className="grid grid-cols-4 text-xs font-bold uppercase tracking-wider px-6 py-3"
          style={{ background: "oklch(0.23 0.07 240)", color: "white" }}
        >
          <div>Metric</div>
          <div className="text-center">A320neo</div>
          <div className="text-center">737 MAX 8</div>
          <div className="text-center">Winner</div>
        </div>
        {rows.map(({ metric, a320, b737, winner }, i) => (
          <div
            key={metric}
            className="grid grid-cols-4 px-6 py-3 border-b border-border text-sm"
            style={{
              background: i % 2 === 0 ? "white" : "oklch(0.969 0.008 240)",
            }}
            data-ocid={`comparison.row.${i + 1}`}
          >
            <div
              className="font-medium"
              style={{ color: "oklch(0.33 0.01 240)" }}
            >
              {metric}
            </div>
            <div
              className="text-center font-semibold"
              style={{
                color:
                  winner === "a320"
                    ? "oklch(0.35 0.14 145)"
                    : "oklch(0.33 0.01 240)",
              }}
            >
              {a320} {winner === "a320" && "✓"}
            </div>
            <div
              className="text-center font-semibold"
              style={{
                color:
                  winner === "b737"
                    ? "oklch(0.35 0.14 145)"
                    : "oklch(0.33 0.01 240)",
              }}
            >
              {b737} {winner === "b737" && "✓"}
            </div>
            <div className="text-center">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.53 0.15 145 / 15%)",
                  color: "oklch(0.35 0.14 145)",
                }}
              >
                {winner === "a320" ? "A320neo" : "737 MAX 8"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Mathematics ──────────────────────────────────────────────────────────────
function MathematicsSection() {
  const formulaCards = [
    {
      title: "A320neo — Fuel per Passenger",
      formula: "Fuel/pax = Total Fuel ÷ Passengers",
      calc: "2.4 L/km ÷ 165 passengers",
      result: "= 1.455 L/km/pax",
      color: "#2F74B5",
    },
    {
      title: "737 MAX 8 — Fuel per Passenger",
      formula: "Fuel/pax = Total Fuel ÷ Passengers",
      calc: "2.6 L/km ÷ 162 passengers",
      result: "= 1.605 L/km/pax",
      color: "#3A86C8",
    },
    {
      title: "Efficiency Difference",
      formula: "\u0394 = (B \u2212 A) \u00f7 B \u00d7 100",
      calc: "(1.605 \u2212 1.455) \u00f7 1.605 \u00d7 100",
      result: "= 9.35% more efficient",
      color: "#16A34A",
    },
  ];

  return (
    <section id="mathematics" className="mb-8">
      <p className="section-title">Mathematical Analysis &amp; Data</p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {formulaCards.map(({ title, formula, calc, result, color }) => (
          <div
            key={title}
            className="bg-card rounded-2xl p-5 border border-border card-hover"
            style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
          >
            <div
              className="w-8 h-1 rounded-full mb-3"
              style={{ background: color }}
            />
            <div
              className="text-xs font-bold uppercase tracking-wide mb-3"
              style={{ color: "oklch(0.52 0.01 240)" }}
            >
              {title}
            </div>
            <div
              className="rounded-lg p-3 mb-3 font-mono text-xs"
              style={{
                background: "oklch(0.23 0.07 240 / 6%)",
                color: "oklch(0.23 0.07 240)",
              }}
            >
              <div className="font-semibold mb-1">{formula}</div>
              <div className="opacity-70">{calc}</div>
            </div>
            <div className="text-base font-bold" style={{ color }}>
              {result}
            </div>
          </div>
        ))}
      </div>
      <div
        className="bg-card rounded-2xl p-6 border border-border mb-4"
        style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
      >
        <div className="mb-4">
          <div
            className="font-semibold text-sm"
            style={{ color: "oklch(0.18 0.01 240)" }}
          >
            Fuel Consumption by Route
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.52 0.01 240)" }}
          >
            Liters used per flight — A320neo vs 737 MAX 8
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={FUEL_CHART_DATA} barCategoryGap="30%" barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="route"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
              label={{
                value: "Fuel (Liters)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fill: "#6B7280", fontSize: 11 },
              }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString()} L`, ""]}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
            <Bar dataKey="A320neo" fill="#2F74B5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="737 MAX 8" fill="#3A86C8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        className="rounded-2xl p-6 text-white flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #16A34A, #22C55E)" }}
        data-ocid="mathematics.success_state"
      >
        <div>
          <div className="text-sm font-medium opacity-80 mb-1">
            Efficiency Conclusion
          </div>
          <div className="text-2xl font-bold">
            A320neo is 9.35% More Efficient
          </div>
          <div className="text-sm opacity-75 mt-1">
            per passenger per kilometer than Boeing 737 MAX 8
          </div>
        </div>
        <div className="text-6xl font-black opacity-20">9.35%</div>
      </div>
    </section>
  );
}

// ─── India Map SVG ────────────────────────────────────────────────────────────
function IndiaMapSVG() {
  return (
    <svg
      viewBox="0 0 220 280"
      className="w-full"
      style={{ maxHeight: 280 }}
      role="img"
      aria-labelledby="india-map-title"
    >
      <title id="india-map-title">
        India map showing Delhi to Mumbai flight route
      </title>
      <path
        d="M80,20 L95,15 L120,18 L140,22 L155,35 L165,50 L170,65 L168,80 L175,90 L180,105 L178,120 L172,135 L168,148 L158,158 L152,170 L148,182 L140,195 L130,205 L122,215 L115,225 L108,235 L102,245 L96,255 L90,262 L85,255 L80,245 L75,235 L70,225 L65,212 L58,200 L52,188 L48,175 L42,162 L38,148 L35,135 L32,120 L30,105 L35,90 L38,75 L40,60 L48,48 L58,35 L68,25 Z"
        fill="#dbeafe"
        stroke="#93c5fd"
        strokeWidth="1.5"
      />
      <circle
        cx="95"
        cy="72"
        r="5"
        fill="#2F74B5"
        stroke="white"
        strokeWidth="2"
      />
      <text x="102" y="70" fontSize="9" fontWeight="700" fill="#111827">
        Delhi
      </text>
      <text x="102" y="79" fontSize="7" fill="#6B7280">
        DEL
      </text>
      <circle
        cx="68"
        cy="162"
        r="5"
        fill="#DC2626"
        stroke="white"
        strokeWidth="2"
      />
      <text x="76" y="160" fontSize="9" fontWeight="700" fill="#111827">
        Mumbai
      </text>
      <text x="76" y="169" fontSize="7" fill="#6B7280">
        BOM
      </text>
      <line
        x1="95"
        y1="77"
        x2="68"
        y2="157"
        stroke="#2F74B5"
        strokeWidth="2"
        strokeDasharray="5,4"
      />
      <rect x="100" y="105" width="64" height="22" rx="5" fill="#2F74B5" />
      <text
        x="132"
        y="120"
        fontSize="9"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
      >
        1,148 km
      </text>
    </svg>
  );
}

// ─── Case Study ───────────────────────────────────────────────────────────────
function CaseStudySection() {
  return (
    <section id="casestudy" className="mb-8">
      <p className="section-title">Case Study — Delhi to Mumbai Route</p>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="bg-card rounded-2xl p-6 border border-border"
          style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
        >
          <div
            className="font-semibold text-sm mb-1"
            style={{ color: "oklch(0.18 0.01 240)" }}
          >
            Route Visualization
          </div>
          <div
            className="text-xs mb-4"
            style={{ color: "oklch(0.52 0.01 240)" }}
          >
            DEL ✈ BOM — Busiest domestic route in India
          </div>
          <IndiaMapSVG />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: "Distance", value: "1,148 km" },
              { label: "Daily Flights", value: "~180" },
              { label: "Annual Pax", value: "~12M" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg p-2 text-center"
                style={{ background: "oklch(0.23 0.07 240 / 6%)" }}
              >
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.52 0.01 240)" }}
                >
                  {label}
                </div>
                <div
                  className="text-sm font-bold"
                  style={{ color: "oklch(0.23 0.07 240)" }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div
            className="bg-card rounded-2xl p-6 border border-border"
            style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
          >
            <div
              className="font-semibold text-sm mb-4"
              style={{ color: "oklch(0.18 0.01 240)" }}
            >
              Fuel Analysis — DEL to BOM
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "A320neo",
                  fuel: "2,755 L",
                  width: "87%",
                  color: "#2F74B5",
                },
                {
                  label: "737 MAX 8",
                  fuel: "2,985 L",
                  width: "100%",
                  color: "#3A86C8",
                },
              ].map(({ label, fuel, width, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: color }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "oklch(0.33 0.01 240)" }}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "oklch(0.18 0.01 240)" }}
                    >
                      {fuel}
                    </div>
                  </div>
                  <div
                    className="rounded-full h-2 w-full"
                    style={{ background: "oklch(0.92 0.01 240)" }}
                  >
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-4 rounded-xl p-3 text-sm"
              style={{ background: "#f0fdf4", border: "1px solid #86efac" }}
            >
              <span style={{ color: "#15803d" }}>
                💚 A320neo saves <strong>230 L</strong> per flight — approx 612
                kg less CO₂
              </span>
            </div>
          </div>
          <div
            className="bg-card rounded-2xl p-6 border border-border"
            style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
          >
            <div
              className="font-semibold text-sm mb-3"
              style={{ color: "oklch(0.18 0.01 240)" }}
            >
              Why This Route Matters
            </div>
            <ul className="space-y-2">
              {[
                "Busiest domestic route in India by passenger volume",
                "~12 million passengers annually",
                "Critical for business travel between financial hubs",
                "Significant environmental impact × 180 daily flights",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "oklch(0.33 0.01 240)" }}
                >
                  <ArrowRight
                    className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                    style={{ color: "#2F74B5" }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sustainability ────────────────────────────────────────────────────────────
function SustainabilitySection() {
  const metrics = [
    {
      icon: Wind,
      title: "Carbon Footprint",
      a320: "7.17 kg CO\u2082/km",
      b737: "7.78 kg CO\u2082/km",
      note: "A320neo emits 8% less/km",
      color: "#2F74B5",
    },
    {
      icon: Leaf,
      title: "SAF Integration",
      a320: "Compatible",
      b737: "Compatible",
      note: "10% SAF target by 2030 (India)",
      color: "#16A34A",
    },
    {
      icon: Volume2,
      title: "Noise Levels",
      a320: "85 dB",
      b737: "87 dB",
      note: "A320neo 2 dB quieter",
      color: "#9333EA",
    },
    {
      icon: Cpu,
      title: "Technology",
      a320: "Sharklet Winglets",
      b737: "Split-tip Winglets",
      note: "LEAP engines: 15–20% savings",
      color: "#EA8C1A",
    },
  ];

  return (
    <section id="sustainability" className="mb-8">
      <p className="section-title">Sustainability &amp; Environmental Impact</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {metrics.map(({ icon: Icon, title, a320, b737, note, color }) => (
          <div
            key={title}
            className="bg-card rounded-2xl p-5 border border-border card-hover"
            style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${color}18` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div
              className="font-bold text-sm mb-3"
              style={{ color: "oklch(0.18 0.01 240)" }}
            >
              {title}
            </div>
            <div className="space-y-1 mb-3">
              <div
                className="text-xs"
                style={{ color: "oklch(0.52 0.01 240)" }}
              >
                A320neo:{" "}
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.18 0.01 240)" }}
                >
                  {a320}
                </span>
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.52 0.01 240)" }}
              >
                737 MAX:{" "}
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.18 0.01 240)" }}
                >
                  {b737}
                </span>
              </div>
            </div>
            <div
              className="text-xs rounded-lg px-2 py-1"
              style={{ background: `${color}10`, color }}
            >
              {note}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: TrendingDown,
            title: "CO\u2082 Reduction Potential",
            body: "If India's fleet transitions to A320neo, 180 daily DEL-BOM flights save ~110,160 kg CO\u2082 annually — equivalent to removing 24 cars from roads each year.",
            color: "#2F74B5",
          },
          {
            icon: Zap,
            title: "Sustainable Aviation Fuel (SAF)",
            body: "SAF can reduce lifecycle CO\u2082 by up to 80%. India's DGCA targets 10% SAF blending by 2030. Both A320neo and 737 MAX 8 support SAF operations.",
            color: "#16A34A",
          },
          {
            icon: Globe,
            title: "India's Aviation Growth Challenge",
            body: "India is projected to become the 3rd largest aviation market by 2030. Choosing fuel-efficient aircraft like A320neo is critical to balance growth with climate commitments.",
            color: "#EA8C1A",
          },
        ].map(({ icon: Icon, title, body, color }) => (
          <div
            key={title}
            className="bg-card rounded-2xl p-5 border border-border card-hover"
            style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${color}18` }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div
                className="font-semibold text-sm"
                style={{ color: "oklch(0.18 0.01 240)" }}
              >
                {title}
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.45 0.01 240)" }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SOI Connection ────────────────────────────────────────────────────────────
function SOISection() {
  return (
    <section id="soi" className="mb-8">
      <p className="section-title">SOI Connection</p>
      <div
        className="rounded-2xl p-6 mb-6 text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.23 0.07 240), oklch(0.33 0.085 240))",
          boxShadow: "0 4px 20px oklch(0.23 0.07 240 / 25%)",
        }}
      >
        <div className="text-xs font-bold uppercase tracking-widest mb-3 opacity-70">
          Statement of Inquiry
        </div>
        <blockquote className="text-xl font-semibold leading-relaxed italic opacity-95">
          &ldquo;When we apply mathematical models to engineering choices, we
          can make culturally informed decisions that promote environmental
          sustainability.&rdquo;
        </blockquote>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          {
            num: "01",
            title: "Mathematics Connection",
            content:
              "Fuel-per-passenger calculations are a direct application of ratio and percentage mathematics. By dividing total fuel consumption (L/km) by passenger count, we derive a per-capita efficiency metric — enabling data-driven aircraft selection decisions that minimize environmental impact.",
            color: "#2F74B5",
          },
          {
            num: "02",
            title: "Cultural & Environmental Context",
            content:
              "India's aviation sector is intertwined with its economic development and cultural connectivity. As one of the world's fastest-growing markets, India has a responsibility to balance its aviation ambitions with climate commitments, making every procurement decision both an economic and ethical choice.",
            color: "#16A34A",
          },
        ].map(({ num, title, content, color }) => (
          <div
            key={num}
            className="bg-card rounded-2xl p-6 border border-border"
            style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                style={{ background: color }}
              >
                {num}
              </div>
              <div
                className="font-bold"
                style={{ color: "oklch(0.18 0.01 240)" }}
              >
                {title}
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.45 0.01 240)" }}
            >
              {content}
            </p>
          </div>
        ))}
      </div>
      <div
        className="bg-card rounded-2xl p-6 border border-border"
        style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
      >
        <div
          className="font-semibold text-sm mb-4"
          style={{ color: "oklch(0.18 0.01 240)" }}
        >
          IB Learner Profile Attributes
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Thinker",
              emoji: "🧠",
              desc: "Using mathematical reasoning to solve real-world problems",
            },
            {
              label: "Knowledgeable",
              emoji: "📚",
              desc: "Understanding aviation science and environmental impact",
            },
            {
              label: "Caring",
              emoji: "💚",
              desc: "Making responsible environmental choices for the future",
            },
          ].map(({ label, emoji, desc }) => (
            <div
              key={label}
              className="rounded-xl p-4 text-center"
              style={{ background: "oklch(0.23 0.07 240 / 5%)" }}
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <div
                className="font-bold text-sm mb-1"
                style={{ color: "oklch(0.23 0.07 240)" }}
              >
                {label}
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.52 0.01 240)" }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Conclusion ────────────────────────────────────────────────────────────────
function ConclusionSection() {
  const takeaways = [
    {
      icon: Award,
      text: "A320neo is 9.35% more fuel-efficient per passenger than Boeing 737 MAX 8",
      color: "#2F74B5",
    },
    {
      icon: Leaf,
      text: "Choosing A320neo saves 230 L and ~612 kg CO\u2082 per DEL-BOM flight",
      color: "#16A34A",
    },
    {
      icon: Users,
      text: "At 180 flights/day, fleet-wide A320neo adoption saves ~40 million liters annually",
      color: "#EA8C1A",
    },
    {
      icon: Globe,
      text: "India's aviation growth requires sustainability-first procurement policies",
      color: "#9333EA",
    },
    {
      icon: AlertCircle,
      text: "SAF adoption and newer-generation aircraft are key to meeting India's climate targets",
      color: "#DC2626",
    },
  ];

  return (
    <section id="conclusion" className="mb-8">
      <p className="section-title">Conclusion</p>
      <div
        className="rounded-2xl p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, #16A34A, #22C55E)",
          boxShadow: "0 4px 20px rgba(22, 163, 74, 0.25)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="text-6xl">✈️</div>
          <div className="text-white">
            <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-1">
              Final Recommendation
            </div>
            <div className="text-2xl font-bold mb-1">
              Airbus A320neo — The Clear Choice
            </div>
            <div className="opacity-85">
              9.35% more efficient per passenger · Lower emissions · Quieter
              operations
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-card rounded-2xl p-6 border border-border mb-6"
        style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
      >
        <div
          className="font-semibold text-sm mb-4"
          style={{ color: "oklch(0.18 0.01 240)" }}
        >
          Key Takeaways
        </div>
        <div className="space-y-3">
          {takeaways.map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${color}18` }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <p
                className="text-sm leading-relaxed pt-1"
                style={{ color: "oklch(0.33 0.01 240)" }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="bg-card rounded-2xl p-6 border border-border"
        style={{ boxShadow: "0 2px 8px oklch(0.25 0.07 240 / 8%)" }}
      >
        <div
          className="font-semibold text-sm mb-4"
          style={{ color: "oklch(0.18 0.01 240)" }}
        >
          Bibliography &amp; References
        </div>
        <div
          className="space-y-2 text-xs"
          style={{ color: "oklch(0.52 0.01 240)" }}
        >
          {[
            "Airbus. (2024). A320neo Family — Aircraft Characteristics. Airbus.com",
            "Boeing. (2024). 737 MAX Technical Specifications. Boeing.com",
            "DGCA India. (2024). Annual Statistics — Domestic Air Traffic Report. dgca.gov.in",
            "IATA. (2024). Sustainable Aviation Fuel Outlook 2024. iata.org",
            "Ministry of Civil Aviation, India. (2024). National Air Connectivity Policy. civilaviation.gov.in",
            "ICAO. (2023). Environmental Protection — Carbon Offsetting and Reduction Scheme. icao.int",
          ].map((ref, idx) => (
            <div key={ref} className="flex gap-2">
              <span
                className="font-mono font-bold"
                style={{ color: "#2F74B5" }}
              >
                [{idx + 1}]
              </span>
              <span>{ref}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const s of sections) {
      observer.observe(s);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "oklch(0.969 0.008 240)" }}
    >
      <Sidebar active={activeSection} />
      <div className="ml-64 flex-1 flex flex-col min-w-0">
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 border-b border-border"
          style={{
            background: "oklch(0.969 0.008 240 / 90%)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.52 0.01 240)" }}
          >
            Sustainable Aviation Dashboard
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "oklch(0.23 0.07 240)" }}
            >
              M
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: "oklch(0.33 0.01 240)" }}
            >
              Welcome, MYP 4 Student
            </span>
          </div>
        </header>
        <main className="flex-1 px-8 py-8">
          <HeroSection />
          <ComparisonSection />
          <MathematicsSection />
          <CaseStudySection />
          <SustainabilitySection />
          <SOISection />
          <ConclusionSection />
          <footer
            className="mt-8 rounded-2xl p-6 grid grid-cols-3 gap-6"
            style={{ background: "oklch(0.23 0.07 240)", color: "white" }}
          >
            <div>
              <div className="font-bold text-sm mb-2">Project Info</div>
              <div className="text-xs opacity-70 space-y-1">
                <div>MYP 4 Interdisciplinary Unit</div>
                <div>Topic: Sustainable Domestic Aviation</div>
                <div>Sciences + Mathematics</div>
              </div>
            </div>
            <div>
              <div className="font-bold text-sm mb-2">SDIA School Project</div>
              <div className="text-xs opacity-70 space-y-1">
                <div>IB Middle Years Programme</div>
                <div>Grade 4 — Exhibition Project</div>
                <div>Academic Year 2025–26</div>
              </div>
            </div>
            <div>
              <div className="font-bold text-sm mb-2">Sections</div>
              <div className="text-xs opacity-70 space-y-1">
                {NAV_ITEMS.slice(1).map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className="cursor-pointer hover:opacity-100 transition-opacity text-left w-full"
                    onClick={() => scrollTo(id)}
                  >
                    → {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-3 border-t border-white/20 pt-4 flex items-center justify-between text-xs opacity-60">
              <span>
                © {new Date().getFullYear()} SDIA MYP 4 IDU Project. Built with
                love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  className="underline hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  caffeine.ai
                </a>
              </span>
              <span>Sustainable Aviation in India — A320neo vs 737 MAX 8</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
