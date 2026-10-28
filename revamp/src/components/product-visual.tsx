/* ============================================================================
   ProductVisual  —  real product UI, drawn in SVG
   ----------------------------------------------------------------------------
   These are not photographs and not placeholder rectangles: they are interface
   mockups built from the same tokens as the rest of the site, so a card always
   has something that looks like software in it. SVG because it stays sharp at
   any size, weighs a couple of kilobytes, needs no network request, and can be
   restyled by changing one colour.

   Five shapes cover the catalogue:
     dashboard  numbers, a chart, a transcript   (AI calling agents)
     calendar   a week view with bookings        (Kastrofy, DoctorPlus)
     chat       an inbox and a thread            (WhatsApp CRM)
     scoreList  a list plus a result ring        (K-Exam)
     tileGrid   cards with progress or slots     (LMS, K-Parking, K-RealEstate)

   No readable text is drawn on purpose: invented interface copy at this size is
   noise, and real screenshots go in their place once supplied.
   ========================================================================== */

type Variant = "dashboard" | "calendar" | "chat" | "scoreList" | "tileGrid";

export type ProductVisualProps = {
  variant: Variant;
  /** accent for the one thing the eye should land on */
  accent?: "blue" | "coral" | "violet";
  className?: string;
  /** used as the accessible name; "" renders it decorative */
  label?: string;
};

/* Values trace the palette in globals.css: primary, chart-3, and a violet from
   the foreground hue family. Kept as literals because SVG attributes cannot read
   the OKLCH custom properties reliably inside every renderer. */
const ACCENT = {
  blue: "#2C53E0",
  coral: "#EC554C",
  violet: "#7A4DEE",
} as const;

const INK = "#14142B";
const LINE = "#E3E5EE";
const MUTED = "#B9BDCC";
const WASH = "#F1F3F8";

/* ---------------------------------------------------------------- chrome */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <defs>
        <clipPath id="window">
          <rect x="0" y="0" width="640" height="400" rx="14" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="640" height="400" rx="14" fill="#FFFFFF" />
      <g clipPath="url(#window)">
        {/* sidebar */}
        <rect x="0" y="0" width="76" height="400" fill={INK} />
        <circle cx="24" cy="30" r="6" fill="#FFFFFF" opacity="0.92" />
        <rect x="18" y="58" width="40" height="6" rx="3" fill="#FFFFFF" opacity="0.22" />
        <rect x="18" y="78" width="30" height="6" rx="3" fill="#FFFFFF" opacity="0.22" />
        <rect x="18" y="98" width="36" height="6" rx="3" fill="#FFFFFF" opacity="0.22" />
        <rect x="18" y="118" width="26" height="6" rx="3" fill="#FFFFFF" opacity="0.22" />

        {/* top bar */}
        <rect x="76" y="0" width="564" height="44" fill="#FFFFFF" />
        <line x1="76" y1="44" x2="640" y2="44" stroke={LINE} strokeWidth="1" />
        <rect x="96" y="17" width="86" height="9" rx="4.5" fill={INK} opacity="0.85" />
        <rect x="520" y="13" width="46" height="18" rx="9" fill={WASH} />
        <circle cx="602" cy="22" r="9" fill={WASH} />

        {children}
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="639"
        height="399"
        rx="14"
        fill="none"
        stroke={LINE}
      />
    </>
  );
}

/* ----------------------------------------------------------- primitives */

function Card({
  x,
  y,
  w,
  h,
  fill = WASH,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx="9" fill={fill} />;
}

function Lines({
  x,
  y,
  widths,
  gap = 12,
  color = MUTED,
  height = 5,
}: {
  x: number;
  y: number;
  widths: number[];
  gap?: number;
  color?: string;
  height?: number;
}) {
  return (
    <>
      {widths.map((w, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * gap}
          width={w}
          height={height}
          rx={height / 2}
          fill={color}
        />
      ))}
    </>
  );
}

function Bars({
  x,
  y,
  values,
  barWidth = 14,
  gap = 10,
  height = 60,
  accent,
}: {
  x: number;
  y: number;
  values: number[];
  barWidth?: number;
  gap?: number;
  height?: number;
  accent: string;
}) {
  return (
    <>
      {values.map((v, i) => {
        const h = Math.round(v * height);
        return (
          <rect
            key={i}
            x={x + i * (barWidth + gap)}
            y={y + height - h}
            width={barWidth}
            height={h}
            rx="3"
            fill={i === values.length - 2 ? accent : INK}
            opacity={i === values.length - 2 ? 1 : 0.14}
          />
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------- variants */

function Dashboard({ accent }: { accent: string }) {
  return (
    <>
      <rect x="96" y="64" width="150" height="10" rx="5" fill={INK} opacity="0.85" />
      <rect x="96" y="84" width="96" height="6" rx="3" fill={MUTED} />

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Card x={96 + i * 148} y={106} w={132} h={62} />
          <rect x={110 + i * 148} y={120} width={44} height={6} rx="3" fill={MUTED} />
          <rect
            x={110 + i * 148}
            y={136}
            width={i === 1 ? 58 : 46}
            height={14}
            rx={4}
            fill={i === 1 ? accent : INK}
            opacity={i === 1 ? 1 : 0.8}
          />
        </g>
      ))}

      {/* chart panel */}
      <Card x={96} y={184} w={286} h={140} fill="#FFFFFF" />
      <rect
        x="96"
        y="184"
        width="286"
        height="140"
        rx="9"
        fill="none"
        stroke={LINE}
      />
      <rect x={112} y={200} width={64} height={6} rx="3" fill={MUTED} />
      <Bars x={112} y={228} values={[0.35, 0.5, 0.42, 0.68, 0.55, 0.85, 0.6]} accent={accent} />
      <line x1="112" y1="300" x2="366" y2="300" stroke={LINE} strokeWidth="1" />

      {/* transcript panel */}
      <Card x={398} y={184} w={218} h={140} fill="#FFFFFF" />
      <rect
        x="398"
        y="184"
        width="218"
        height="140"
        rx="9"
        fill="none"
        stroke={LINE}
      />
      <circle cx="418" cy="206" r="8" fill={accent} opacity="0.16" />
      <circle cx="418" cy="206" r="3" fill={accent} />
      <Lines x={434} y={202} widths={[72, 48]} gap={10} height={5} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="416" cy={236 + i * 22} r="3" fill={INK} opacity="0.25" />
          <rect
            x="426"
            y={233 + i * 22}
            width={i % 2 ? 120 : 150}
            height="5"
            rx="2.5"
            fill={MUTED}
          />
        </g>
      ))}

      {/* live waveform */}
      <Card x={96} y={340} w={520} h={42} fill={WASH} />
      <path
        d="M112 361 q10 -14 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}

function Calendar({ accent }: { accent: string }) {
  return (
    <>
      <rect x="96" y="64" width="130" height="10" rx="5" fill={INK} opacity="0.85" />
      <rect x="96" y="84" width="78" height="6" rx="3" fill={MUTED} />
      <rect x="536" y="64" width="56" height="26" rx="7" fill={accent} />

      {/* day headers */}
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <g key={i}>
          <rect
            x={96 + i * 76}
            y={112}
            width={64}
            height={10}
            rx={5}
            fill={MUTED}
            opacity={0.7}
          />
        </g>
      ))}

      {/* week grid */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={96 + col * 76}
            y={134 + row * 44}
            width={64}
            height={36}
            rx="7"
            fill={WASH}
          />
        )),
      )}

      {/* the booked slot */}
      <rect x={96 + 2 * 76} y={134 + 1 * 44} width={64} height={36} rx="7" fill={accent} />
      <rect x={96 + 3 * 76} y={134 + 2 * 44} width={64} height={36} rx="7" fill={INK} opacity="0.82" />
      <rect x={96 + 0 * 76} y={134 + 3 * 44} width={64} height={36} rx="7" fill={accent} opacity="0.22" />
      <rect x={96 + 4 * 76} y={134 + 4 * 44} width={64} height={36} rx="7" fill={INK} opacity="0.12" />

      {/* detail card */}
      <Card x={96} y={364} w={520} h={20} fill={WASH} />
      <circle cx="112" cy="374" r="6" fill={accent} opacity="0.25" />
      <Lines x={128} y={371} widths={[110, 64]} gap={8} height={4} />
    </>
  );
}

function Chat({ accent }: { accent: string }) {
  return (
    <>
      {/* inbox */}
      <rect x="96" y="64" width="150" height="9" rx="4.5" fill={INK} opacity="0.85" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={88}
            y={92 + i * 62}
            width={176}
            height={52}
            rx="8"
            fill={i === 0 ? WASH : "transparent"}
          />
          <circle cx="108" cy={118 + i * 62} r="11" fill={i === 0 ? accent : MUTED} opacity={i === 0 ? 0.9 : 0.5} />
          <Lines
            x={128}
            y={110 + i * 62}
            widths={[86, 54]}
            gap={11}
            height={5}
          />
          {i === 0 && <circle cx="248" cy={110 + i * 62} r="4" fill={accent} />}
        </g>
      ))}

      {/* conversation */}
      <rect x="286" y="44" width="354" height="356" fill="#FFFFFF" />
      <line x1="286" y1="44" x2="286" y2="400" stroke={LINE} strokeWidth="1" />
      <circle cx="310" cy="74" r="12" fill={accent} opacity="0.18" />
      <Lines x={330} y={68} widths={[70, 40]} gap={11} height={5} />

      {/* bubbles */}
      <rect x={302} y={112} width={196} height={44} rx="12" fill={WASH} />
      <Lines x={316} y={126} widths={[150, 100]} gap={11} height={5} />
      <rect x={342} y={168} width={196} height={44} rx="12" fill={accent} opacity="0.12" />
      <Lines x={356} y={182} widths={[140, 84]} gap={11} height={5} />
      <rect x={302} y={224} width={164} height={36} rx="12" fill={WASH} />
      <Lines x={316} y={236} widths={[120]} gap={11} height={5} />

      {/* composer */}
      <rect x={302} y={336} width={324} height={40} rx="10" fill={WASH} />
      <rect x={316} y={352} width={120} height={6} rx="3" fill={MUTED} />
      <circle cx="600" cy="356" r="13" fill={accent} />
      <path d="M595 356 l6 0 m-3 -3 l3 3 l-3 3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  );
}

function ScoreList({ accent }: { accent: string }) {
  return (
    <>
      <rect x="96" y="64" width="160" height="10" rx="5" fill={INK} opacity="0.85" />
      <rect x="96" y="84" width="100" height="6" rx="3" fill={MUTED} />

      {/* question rows */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={96} y={110 + i * 56} width={342} height={46} rx="9" fill={i === 0 ? WASH : "#FFFFFF"} stroke={LINE} />
          <rect x={112} y={126 + i * 56} width={18} height={14} rx="4" fill={i === 0 ? accent : MUTED} opacity={i === 0 ? 1 : 0.4} />
          <Lines x={142} y={124 + i * 56} widths={[180, 120]} gap={12} height={5} />
        </g>
      ))}

      {/* score ring */}
      <circle cx="536" cy="196" r="62" fill="none" stroke={WASH} strokeWidth="14" />
      <circle
        cx="536"
        cy="196"
        r="62"
        fill="none"
        stroke={accent}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="292 390"
        transform="rotate(-90 536 196)"
      />
      <circle cx="536" cy="196" r="44" fill="#FFFFFF" />
      <rect x="512" y="186" width="48" height="18" rx="4" fill={INK} />
      <rect x="524" y="216" width="24" height="6" rx="3" fill={MUTED} />

      {/* stats */}
      <Card x={96} y={340} w={520} h={44} />
      <Lines x={116} y={354} widths={[80, 40]} gap={12} height={5} />
      <Lines x={252} y={354} widths={[64, 36]} gap={12} height={5} />
      <Lines x={378} y={354} widths={[70, 44]} gap={12} height={5} />
      <rect x="500" y="350" width="96" height="24" rx="7" fill={accent} opacity="0.14" />
    </>
  );
}

function TileGrid({ accent }: { accent: string }) {
  const tiles = [
    { x: 96, y: 106 },
    { x: 330, y: 106 },
    { x: 96, y: 236 },
    { x: 330, y: 236 },
  ];
  return (
    <>
      <rect x="96" y="64" width="150" height="10" rx="5" fill={INK} opacity="0.85" />
      <rect x="96" y="84" width="90" height="6" rx="3" fill={MUTED} />
      {tiles.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width={214} height={112} rx="10" fill="#FFFFFF" stroke={LINE} />
          <rect x={t.x + 14} y={t.y + 14} width={186} height={40} rx="6" fill={i === 0 ? accent : WASH} opacity={i === 0 ? 0.16 : 1} />
          <rect x={t.x + 14} y={t.y + 62} width={128} height={7} rx="3.5" fill={INK} opacity="0.8" />
          <rect x={t.x + 14} y={t.y + 78} width={186} height={6} rx="3" fill={WASH} />
          <rect x={t.x + 14} y={t.y + 78} width={i === 2 ? 120 : 64 + i * 22} height={6} rx="3" fill={accent} />
          <circle cx={t.x + 196} cy={t.y + 90} r="8" fill={WASH} />
        </g>
      ))}
      <Card x={96} y={364} w={520} h={20} fill={WASH} />
    </>
  );
}

/* ------------------------------------------------------------------ main */

export function ProductVisual({
  variant,
  accent = "blue",
  className,
  label,
}: ProductVisualProps) {
  const color = ACCENT[accent];
  const decorative = !label;

  return (
    <svg
      viewBox="0 0 640 400"
      role={decorative ? "presentation" : "img"}
      aria-label={label || undefined}
      aria-hidden={decorative || undefined}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <Frame>
        {variant === "dashboard" && <Dashboard accent={color} />}
        {variant === "calendar" && <Calendar accent={color} />}
        {variant === "chat" && <Chat accent={color} />}
        {variant === "scoreList" && <ScoreList accent={color} />}
        {variant === "tileGrid" && <TileGrid accent={color} />}
      </Frame>
    </svg>
  );
}

/** Which mockup each product gets, so data files do not carry design detail. */
export const VISUAL_BY_PRODUCT: Record<
  string,
  { variant: Variant; accent: "blue" | "coral" | "violet" }
> = {
  "ai-calling-agents": { variant: "dashboard", accent: "blue" },
  kastrofy: { variant: "calendar", accent: "violet" },
  kexam: { variant: "scoreList", accent: "coral" },
  "whatsapp-crm": { variant: "chat", accent: "blue" },
  lms: { variant: "tileGrid", accent: "violet" },
  doctorplus: { variant: "calendar", accent: "coral" },
  kparking: { variant: "tileGrid", accent: "blue" },
  krealestate: { variant: "tileGrid", accent: "violet" },
};
