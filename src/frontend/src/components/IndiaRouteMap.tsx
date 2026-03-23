import { useState } from "react";

const ROUTES = [
  {
    id: "DEL-BOM",
    label: "Delhi → Mumbai",
    from: "DEL",
    to: "BOM",
    distance: "1,148 km",
    duration: "2h 10min",
    note: "Busiest domestic route in India. A320neo saves ~230 L of fuel vs 737 MAX 8.",
    isPrimary: true,
  },
  {
    id: "DEL-BLR",
    label: "Delhi → Bengaluru",
    from: "DEL",
    to: "BLR",
    distance: "1,740 km",
    duration: "2h 45min",
    note: "Tech corridor route. A320neo's superior range efficiency shines on longer sectors.",
    isPrimary: false,
  },
  {
    id: "DEL-MAA",
    label: "Delhi → Chennai",
    from: "DEL",
    to: "MAA",
    distance: "1,755 km",
    duration: "2h 50min",
    note: "Cross-peninsular route. A320neo reduces CO₂ emissions by ~580 kg per flight.",
    isPrimary: false,
  },
  {
    id: "DEL-CCU",
    label: "Delhi → Kolkata",
    from: "DEL",
    to: "CCU",
    distance: "1,305 km",
    duration: "2h 20min",
    note: "East-West corridor. A320neo's CFM LEAP engines reduce fuel burn by 15-20%.",
    isPrimary: false,
  },
];

// Positions calibrated to the uploaded India map image (viewBox 0 0 500 560)
const CITIES: Record<
  string,
  { x: number; y: number; name: string; iata: string }
> = {
  DEL: { x: 208, y: 128, name: "Delhi", iata: "DEL" },
  BOM: { x: 128, y: 278, name: "Mumbai", iata: "BOM" },
  BLR: { x: 208, y: 382, name: "Bengaluru", iata: "BLR" },
  MAA: { x: 252, y: 374, name: "Chennai", iata: "MAA" },
  CCU: { x: 318, y: 210, name: "Kolkata", iata: "CCU" },
  HYD: { x: 220, y: 316, name: "Hyderabad", iata: "HYD" },
};

function getCurvedPath(from: string, to: string): string {
  const f = CITIES[from];
  const t = CITIES[to];
  if (!f || !t) return "";
  const mx = (f.x + t.x) / 2;
  const my = (f.y + t.y) / 2;
  const dx = t.x - f.x;
  const dy = t.y - f.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const offset = len * 0.25;
  const px = -dy / len;
  const py = dx / len;
  const cx = mx + px * offset;
  const cy = my + py * offset;
  return `M ${f.x},${f.y} Q ${cx},${cy} ${t.x},${t.y}`;
}

export function IndiaRouteMap() {
  const [selectedRoute, setSelectedRoute] = useState("DEL-BOM");
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const activeRoute = ROUTES.find((r) => r.id === selectedRoute) ?? ROUTES[0];
  const fromCity = CITIES[activeRoute.from];
  const toCity = CITIES[activeRoute.to];

  return (
    <div className="w-full">
      {/* Route selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ROUTES.map((route) => (
          <button
            type="button"
            key={route.id}
            onClick={() => setSelectedRoute(route.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              selectedRoute === route.id
                ? "border-transparent text-white shadow-md"
                : "border-border text-muted-foreground hover:border-blue-300 bg-card"
            }`}
            style={selectedRoute === route.id ? { background: "#2F74B5" } : {}}
          >
            {route.label}
          </button>
        ))}
      </div>

      {/* Map container: image + SVG overlay */}
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ background: "#bae6fd" }}
      >
        {/* India map image — land fill via CSS */}
        <img
          src="/assets/uploads/image-1.png"
          alt="India map outline"
          className="w-full block"
          style={{
            maxHeight: 480,
            objectFit: "contain",
            /* Tint the white land area to a soft blue-grey */
            filter:
              "invert(1) sepia(1) saturate(2) hue-rotate(185deg) brightness(1.3) opacity(0.85)",
            mixBlendMode: "multiply",
          }}
        />

        {/* SVG overlay for routes and cities */}
        <svg
          viewBox="0 0 500 560"
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
          role="img"
          aria-label="Interactive India route map overlay"
        >
          {/* Non-active route faint lines */}
          {ROUTES.filter((r) => r.id !== selectedRoute).map((route) => {
            const path = getCurvedPath(route.from, route.to);
            return (
              <path
                key={route.id}
                d={path}
                fill="none"
                stroke="#2F74B5"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.3"
              />
            );
          })}

          {/* Active route animated arc */}
          {(() => {
            const path = getCurvedPath(activeRoute.from, activeRoute.to);
            return (
              <g>
                {/* Glow */}
                <path
                  d={path}
                  fill="none"
                  stroke="#2F74B5"
                  strokeWidth="8"
                  opacity="0.15"
                />
                {/* Dashed arc */}
                <path
                  d={path}
                  fill="none"
                  stroke="#2F74B5"
                  strokeWidth="2.5"
                  strokeDasharray="8,5"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-52"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </path>
                {/* Animated plane */}
                <g>
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={path}
                    rotate="auto"
                  />
                  <circle r="7" fill="#2F74B5" opacity="0.2" />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    style={{ userSelect: "none" }}
                  >
                    ✈
                  </text>
                </g>
              </g>
            );
          })()}

          {/* City nodes — pointer-events re-enabled via group */}
          {Object.entries(CITIES).map(([code, city]) => {
            const isEndpoint =
              code === activeRoute.from || code === activeRoute.to;
            const isHovered = hoveredCity === code;
            const labelOffsetX = city.x < 150 ? -10 : 10;
            const labelAnchor = city.x < 150 ? "end" : "start";
            return (
              <g
                key={code}
                onMouseEnter={() => setHoveredCity(code)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: "pointer", pointerEvents: "all" }}
              >
                {isEndpoint && (
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isHovered ? 13 : 11}
                    fill="none"
                    stroke={code === activeRoute.from ? "#2F74B5" : "#DC2626"}
                    strokeWidth="2"
                    opacity="0.5"
                  />
                )}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isEndpoint ? 6 : 4}
                  fill={
                    code === activeRoute.from
                      ? "#2F74B5"
                      : code === activeRoute.to
                        ? "#DC2626"
                        : "#64748b"
                  }
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={city.x + labelOffsetX}
                  y={city.y - 2}
                  fontSize="9"
                  fontWeight={isEndpoint ? "700" : "500"}
                  fill={isEndpoint ? "#1e293b" : "#334155"}
                  textAnchor={labelAnchor}
                  style={{ textShadow: "0 0 3px white" }}
                >
                  {city.name}
                </text>
                <text
                  x={city.x + labelOffsetX}
                  y={city.y + 9}
                  fontSize="7.5"
                  fill="#64748b"
                  textAnchor={labelAnchor}
                >
                  {city.iata}
                </text>

                {isHovered && (
                  <g>
                    <rect
                      x={city.x + 8}
                      y={city.y - 28}
                      width={88}
                      height={24}
                      rx={5}
                      fill="#1e293b"
                      opacity="0.92"
                    />
                    <text
                      x={city.x + 52}
                      y={city.y - 18}
                      fontSize="8.5"
                      fontWeight="600"
                      fill="white"
                      textAnchor="middle"
                    >
                      {city.name} ({city.iata})
                    </text>
                    <text
                      x={city.x + 52}
                      y={city.y - 8}
                      fontSize="7.5"
                      fill="#94a3b8"
                      textAnchor="middle"
                    >
                      {code === activeRoute.from
                        ? "Origin"
                        : code === activeRoute.to
                          ? "Destination"
                          : "Major Hub"}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Distance badge on route midpoint */}
          {(() => {
            const f = fromCity;
            const t = toCity;
            const mx = (f.x + t.x) / 2 + 10;
            const my = (f.y + t.y) / 2 - 10;
            return (
              <g>
                <rect
                  x={mx - 28}
                  y={my - 10}
                  width={56}
                  height={18}
                  rx={6}
                  fill="#2F74B5"
                />
                <text
                  x={mx}
                  y={my + 3}
                  fontSize="8.5"
                  fontWeight="700"
                  fill="white"
                  textAnchor="middle"
                >
                  {activeRoute.distance}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Route stats card */}
      <div
        className="mt-3 rounded-xl p-4 border"
        style={{
          background: "oklch(0.23 0.07 240 / 6%)",
          borderColor: "#93c5fd",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold" style={{ color: "#2F74B5" }}>
                {activeRoute.label}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "#dbeafe", color: "#1d4ed8" }}
              >
                {activeRoute.distance}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "#f0fdf4", color: "#166534" }}
              >
                {activeRoute.duration}
              </span>
            </div>
            <p className="text-xs" style={{ color: "oklch(0.42 0.01 240)" }}>
              {activeRoute.note}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs font-semibold" style={{ color: "#166534" }}>
              A320neo ✓
            </div>
            <div className="text-xs" style={{ color: "oklch(0.52 0.01 240)" }}>
              More efficient
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
