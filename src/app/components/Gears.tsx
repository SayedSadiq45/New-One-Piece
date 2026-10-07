import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Flame, Sun, Wind, Zap } from "lucide-react";
import { onePieceTheme } from "../onePieceTheme";

const display = { fontFamily: "Anton, sans-serif" };
const jp = { fontFamily: '"Noto Sans JP", sans-serif' };
const mono = { fontFamily: '"JetBrains Mono", monospace' };

const {
  bone: BONE,
  cream: CREAM,
  ink: INK,
  blue,
  blueDeep,
  gold,
  seaFoam,
} = onePieceTheme;

const gear1 = "/assets/gear-1.jpeg";
const gear2 = "/assets/gear-2.jpeg";
const gear3 = "/assets/gear-3.jpeg";
const gear4 = "/assets/gear-4.jpeg";
const gear5 = "/assets/gear5.jpeg";

type RouteTarget = { name: "home" } | { name: "crew" } | { name: "gears" };

type Gear = {
  id: string;
  num: string;
  name: string;
  jp: string;
  tagline: string;
  desc: string;
  accent: string;
  accentDeep: string;
  Icon: typeof Zap;
  model: string;
  unlocked: string;
  status: string;
  image: string;
};

const gears: Gear[] = [
  {
    id: "g1",
    num: "01",
    name: "Base Form",
    jp: "ゴム人間",
    tagline: "Rubber Body",
    desc: "The original Gum-Gum fighting style. Elastic strikes, reckless momentum, and the grin that starts every impossible fight.",
    accent: "#16A34A",
    accentDeep: "#0B5D2A",
    Icon: Zap,
    model: "GUM-GUM // ORIGIN",
    unlocked: "EAST BLUE",
    status: "ACTIVE",
    image: gear1,
  },
  {
    id: "g2",
    num: "02",
    name: "Gear Second",
    jp: "ギア・セカンド",
    tagline: "Steam Engine",
    desc: "Pumping blood at engine speed. Luffy moves faster than the eye can follow, trading stamina for blinding velocity.",
    accent: "#D01818",
    accentDeep: "#6F0909",
    Icon: Wind,
    model: "GUM-GUM // ACCEL",
    unlocked: "ENIES LOBBY",
    status: "OVERDRIVE",
    image: gear2,
  },
  {
    id: "g3",
    num: "03",
    name: "Gear Third",
    jp: "ギア・サード",
    tagline: "Bone Balloon",
    desc: "Inflating his skeleton to giant proportions. Huge reach, devastating impact, and a cartoon-heavy punch line.",
    accent: "#E85D04",
    accentDeep: "#7A2E00",
    Icon: Activity,
    model: "GUM-GUM // GIANT",
    unlocked: "WATER 7",
    status: "IMPACT",
    image: gear3,
  },
  {
    id: "g4",
    num: "04",
    name: "Gear Fourth",
    jp: "ギア・フォース",
    tagline: "Boundman / Snakeman",
    desc: "Haki-infused rubber compression. Bounce, recoil, and a fluid fighting form built to break the New World.",
    accent: "#5A25D6",
    accentDeep: "#2E126F",
    Icon: Flame,
    model: "GUM-GUM // HAKI",
    unlocked: "DRESSROSA",
    status: "HAKI",
    image: gear4,
  },
  {
    id: "g5",
    num: "05",
    name: "Gear Fifth",
    jp: "ニカ",
    tagline: "Sun God Nika",
    desc: "The awakening of the Hito Hito no Mi, Model: Nika. Freedom made flesh, cartoon physics, infinite imagination.",
    accent: "#006DFF",
    accentDeep: "#003B8A",
    Icon: Sun,
    model: "HITO HITO // NIKA",
    unlocked: "EGGHEAD",
    status: "AWAKENED",
    image: gear5,
  },
];

type Props = {
  setRoute: (route: RouteTarget) => void;
};

export function Gears({ setRoute }: Props) {
  const [index, setIndex] = useState(4);
  const active = gears[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % gears.length);
    }, 8000);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative h-[100dvh] overflow-hidden"
      style={{
        backgroundColor: CREAM,
        backgroundImage: `linear-gradient(135deg, ${CREAM} 0%, ${BONE} 46%, ${seaFoam}44 100%)`,
        color: INK,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={active.id}
          src={active.image}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            opacity: { duration: 0.9, ease: "easeInOut" },
            scale: { duration: 8, ease: "easeOut" },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(248, 248, 248, 0.95) 0%, rgba(248, 248, 248, 0.9) 28%, transparent 58%), linear-gradient(0deg, ${INK}B8 0%, transparent 36%)`,
        }}
      />

      <div
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.4em] md:block"
        style={{ ...mono, color: INK, writingMode: "vertical-rl" }}
      >
        STRAW HAT PIRATES // CAPTAIN // FILE_NO.LUFFY
      </div>

      <div
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.4em] md:block"
        style={{ ...mono, color: BONE, writingMode: "vertical-rl" }}
      >
        GEAR {active.num} // {active.status}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-5">
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
          <nav className="flex items-center justify-between gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => setRoute({ name: "home" })}
              className="flex items-center gap-2 px-3 py-1.5"
              style={{
                backgroundColor: CREAM,
                border: `2px solid ${INK}`,
                boxShadow: `4px 4px 0 ${blue}`,
              }}
              aria-label="Go home"
            >
              <span
                className="text-2xl leading-none sm:text-3xl lg:text-4xl"
                style={{ ...display, color: onePieceTheme.red }}
              >
                ONE
              </span>
              <span
                className="text-2xl leading-none sm:text-3xl lg:text-4xl"
                style={{ ...display, color: INK }}
              >
                PIECE
              </span>
              <span
                className="ml-1 hidden text-xs sm:inline"
                style={{ ...jp, color: INK }}
              >
                海賊
              </span>
            </button>

            <div
              className="hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex"
              style={{ backgroundColor: INK, border: `2px solid ${INK}` }}
            >
              {[
                {
                  label: "Home",
                  active: false,
                  go: () => setRoute({ name: "home" }),
                },
                {
                  label: "Crew",
                  active: false,
                  go: () => setRoute({ name: "crew" }),
                },
                {
                  label: "Gears",
                  active: true,
                  go: () => setRoute({ name: "gears" }),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.go}
                  className="rounded-full px-3 py-1.5 text-sm transition lg:px-4 lg:text-base"
                  style={{
                    color: item.active ? INK : BONE,
                    backgroundColor: item.active ? gold : "transparent",
                    fontWeight: item.active ? 600 : 400,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="px-2 py-0.5 text-[10px] tracking-[0.2em]"
                  style={{ ...mono, backgroundColor: blueDeep, color: BONE }}
                >
                  ARSENAL // 05
                </span>
                <span className="text-[11px] tracking-[0.2em]" style={mono}>
                  LUFFY // GEAR TRANSFORMATIONS
                </span>
              </div>
              <h1
                className="text-4xl uppercase leading-[0.82] sm:text-6xl lg:text-8xl xl:text-[8.75rem]"
                style={{ ...display, color: INK }}
              >
                Luffy
                <span
                  style={{
                    color: active.accent,
                    textShadow: `4px 4px 0 ${INK}`,
                  }}
                >
                  's
                </span>{" "}
                Gears
              </h1>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-[10px] tracking-[0.25em]" style={mono}>
                BOUNTY
              </div>
              <div
                className="text-4xl lg:text-5xl"
                style={{
                  ...display,
                  color: active.accent,
                  textShadow: `2px 2px 0 ${INK}`,
                }}
              >
                ฿ 3,000,000,000
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-end gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${active.id}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="mb-1 flex items-center gap-3">
                <span
                  className="text-5xl leading-none sm:text-6xl lg:text-8xl"
                  style={{
                    ...display,
                    color: active.accent,
                    textShadow: `4px 4px 0 ${INK}`,
                  }}
                >
                  {active.num}
                </span>
                <div>
                  <div className="text-[10px] tracking-[0.3em]" style={mono}>
                    // FORM
                  </div>
                  <div
                    className="text-2xl uppercase leading-none sm:text-3xl lg:text-4xl"
                    style={{ ...display, color: INK }}
                  >
                    {active.tagline}
                  </div>
                </div>
              </div>
              <h2
                className="mb-1 text-3xl uppercase leading-[0.9] sm:text-4xl lg:text-6xl"
                style={display}
              >
                {active.name}
              </h2>
              <div
                className="mb-2 text-xl sm:mb-3 sm:text-2xl lg:text-3xl"
                style={{
                  ...jp,
                  color: active.accentDeep,
                  fontWeight: 900,
                }}
              >
                {active.jp}
              </div>
              <p className="max-w-xl text-xs leading-relaxed sm:text-sm lg:text-base">
                {active.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.aside
              key={`data-${active.id}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:col-span-5 lg:block lg:justify-self-end"
            >
              <div
                className="w-full max-w-md p-4 lg:p-5"
                style={{
                  backgroundColor: BONE,
                  border: `2px solid ${INK}`,
                  boxShadow: `6px 6px 0 ${active.accent}`,
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="px-1.5 py-0.5 text-[10px] tracking-[0.2em]"
                    style={{ ...mono, backgroundColor: gold, color: INK }}
                  >
                    DATA FILE
                  </span>
                  <span className="text-[10px]" style={mono}>
                    FILE_NO.GEAR{active.num}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs" style={mono}>
                  <span className="opacity-60">DEVIL FRUIT</span>
                  <span className="text-right">HITO HITO NO MI</span>
                  <span className="opacity-60">MODEL</span>
                  <span
                    className="text-right"
                    style={{ color: active.accentDeep, fontWeight: 700 }}
                  >
                    {active.model}
                  </span>
                  <span className="opacity-60">UNLOCKED</span>
                  <span className="text-right">{active.unlocked}</span>
                  <span className="opacity-60">STATUS</span>
                  <span
                    className="text-right"
                    style={{ color: active.accentDeep, fontWeight: 700 }}
                  >
                    {active.status}
                  </span>
                </div>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
            {gears.map((gear, gearIndex) => {
              const isActive = gear.id === active.id;
              return (
                <motion.button
                  key={gear.id}
                  type="button"
                  onClick={() => setIndex(gearIndex)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 lg:px-4"
                  style={{
                    backgroundColor: isActive ? gear.accent : BONE,
                    color: isActive ? BONE : INK,
                    border: `2px solid ${INK}`,
                    boxShadow: isActive
                      ? `4px 4px 0 ${gold}`
                      : `2px 2px 0 ${blue}`,
                  }}
                  aria-label={`Show ${gear.name}`}
                >
                  <gear.Icon className="h-4 w-4" />
                  <span className="text-sm tracking-[0.18em]" style={display}>
                    GEAR {gear.num}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <span className="text-[10px] tracking-[0.3em]" style={mono}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(gears.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              {gears.map((gear, gearIndex) => (
                <motion.button
                  key={`dot-${gear.id}`}
                  type="button"
                  onClick={() => setIndex(gearIndex)}
                  animate={{ width: gearIndex === index ? 56 : 22 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="h-2"
                  style={{
                    backgroundColor: gearIndex === index ? active.accent : INK,
                    opacity: gearIndex === index ? 1 : 0.45,
                  }}
                  aria-label={`Slide ${gearIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
