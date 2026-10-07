import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Camera,
  Anchor,
  Skull,
  Compass,
  Ship,
  Crown,
  Share2,
  Swords,
  Users,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Crew } from "./components/Crew";
import { MemberPage } from "./components/MemberPage";
import { Gears } from "./components/Gears";
import audioTrack from "../imports/audio.mp3";
import { landingConfig } from "./landingConfig";
import { members, findMember } from "./members";
import { onePieceTheme } from "./onePieceTheme";

type Route =
  | { name: "home" }
  | { name: "crew" }
  | { name: "member"; id: string }
  | { name: "gears" };

const display = { fontFamily: "Anton, sans-serif" };
const jp = { fontFamily: '"Noto Sans JP", sans-serif' };
const mono = { fontFamily: '"JetBrains Mono", monospace' };

const C = onePieceTheme;

const heroBackgrounds =
  landingConfig.hero.backgroundMode === "video"
    ? landingConfig.hero.videos
    : landingConfig.hero.images;

const crew = [
  { name: "Straw Hats", jp: "麦わら", Icon: Skull },
  { name: "Going Merry", jp: "メリー", Icon: Ship },
  { name: "Log Pose", jp: "ログ", Icon: Compass },
  { name: "Pirate King", jp: "海賊王", Icon: Crown },
  { name: "Three Swords", jp: "三刀流", Icon: Swords },
  { name: "Grand Line", jp: "偉大なる航路", Icon: Anchor },
];

const slides = [
  {
    background: heroBackgrounds[0],
    accent: C.blue,
    accentDeep: C.blueDeep,
    warm: C.gold,
    issue: "001",
    kicker: "EAST BLUE // CHAPTER ONE",
    heading: ["SAIL THE", "GRAND", "LINE"],
    jpHead: "偉大なる航路",
    sub: "Chase the horizon with Luffy and the Straw Hats — adventure waits beyond every wave.",
    stat: "1000+",
    statLabel: "EPISODES OF ADVENTURE",
    statJp: "千話の冒険",
    bounty: "3,000,000,000",
  },
  {
    background: heroBackgrounds[1],
    accent: C.red,
    accentDeep: C.redDeep,
    warm: C.seaFoam,
    issue: "002",
    kicker: "NEW WORLD // CHAPTER TWO",
    heading: ["BECOME", "THE PIRATE", "KING"],
    jpHead: "海賊王に俺はなる",
    sub: "A dream that defies the seas, the marines, and the world itself — set sail for One Piece.",
    stat: "25+",
    statLabel: "YEARS AT FULL SAIL",
    statJp: "二十五年航海",
    bounty: "3,000,000,000",
  },
];

function NavStrip({
  route,
  setRoute,
}: {
  route: Route;
  setRoute: (r: Route) => void;
}) {
  return (
    <div
      className="px-6 lg:px-12 py-4 flex items-center justify-between"
      style={{
        backgroundColor: C.cream,
        borderBottom: `2px solid ${C.blue}`,
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{
          backgroundColor: C.cream,
          border: `2px solid ${C.ink}`,
          boxShadow: `4px 4px 0 ${C.blue}`,
        }}
      >
        <span
          className="text-2xl lg:text-3xl leading-none"
          style={{ ...display, color: C.red }}
        >
          ONE
        </span>
        <span
          className="text-2xl lg:text-3xl leading-none"
          style={{ ...display, color: C.blue }}
        >
          PIECE
        </span>
      </div>
      <div
        className="flex items-center gap-1 px-2 py-1.5 rounded-full"
        style={{ backgroundColor: C.blueDeep, border: `2px solid ${C.ink}` }}
      >
        {[
          {
            label: "Home",
            active: false,
            go: () => setRoute({ name: "home" }),
          },
          {
            label: "Crew",
            active: route.name === "crew",
            go: () => setRoute({ name: "crew" }),
          },
          {
            label: "Gears",
            active: route.name === "gears",
            go: () => setRoute({ name: "gears" }),
          },
        ].map((it) => (
          <button
            key={it.label}
            onClick={it.go}
            className="px-4 py-1.5 text-sm rounded-full"
            style={{
              color: it.active ? C.ink : C.bone,
              backgroundColor: it.active ? C.gold : "transparent",
              fontWeight: it.active ? 600 : 400,
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Tag({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-[10px] tracking-[0.15em]"
      style={{
        ...mono,
        backgroundColor: dark ? C.blue : C.red,
        color: dark ? C.bone : C.bone,
        border: `1px solid ${dark ? C.blue : C.ink}`,
      }}
    >
      {children}
    </span>
  );
}

function CreatorBadge() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-16 left-4 z-50 flex h-10 items-center gap-1.5 rounded-full px-2.5 sm:bottom-4"
      style={{
        backgroundColor: C.ink,
        border: `2px solid ${C.gold}`,
        boxShadow: `0 0 18px ${C.gold}88, 0 0 34px ${C.blue}66, 4px 4px 0 ${C.red}`,
      }}
      aria-label="Sayed Sadiq's social links"
    >
      <span
        className="whitespace-nowrap text-[13px] tracking-[0.04em]"
        style={{ ...display, color: C.bone }}
      >
        SAYED SADIQ
      </span>
      <span
        className="h-5 w-px"
        style={{ backgroundColor: `${C.bone}55` }}
        aria-hidden="true"
      />
      <a
        href="https://www.linkedin.com/in/sayed-sadiq45/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sayed Sadiq on LinkedIn"
        title="LinkedIn"
        className="rounded-full px-1.5 py-1 text-[8px] font-bold transition-colors hover:bg-blue-700"
        style={{ backgroundColor: C.blue, color: C.bone }}
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/SayedSadiq45"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sayed Sadiq on GitHub"
        title="GitHub"
        className="rounded-full px-1.5 py-1 text-[8px] font-bold transition-colors hover:bg-white/15"
        style={{ backgroundColor: `${C.bone}1A`, color: C.bone }}
      >
        GitHub
      </a>
    </motion.aside>
  );
}

function HeroBackground({ src }: { src: string }) {
  const isVideo = landingConfig.hero.backgroundMode === "video";

  if (isVideo) {
    return (
      <motion.video
        key={src}
        src={src}
        className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.img
      key={src}
      src={src}
      className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none"
      style={{ zIndex: 0 }}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 8, ease: "easeOut" },
      }}
      alt=""
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [index, setIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundEnabledRef = useRef(true);
  const audioRetryRef = useRef<number | null>(null);

  useEffect(() => {
    if (route.name !== "home") return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      8000,
    );
    return () => clearInterval(id);
  }, [route.name]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.muted = false;
    audio.preload = "auto";
    audio.load();

    let hasPlayed = false;

    const tryPlay = async () => {
      if (!soundEnabledRef.current || hasPlayed) return;

      try {
        await audio.play();
        hasPlayed = true;
        removeListeners();
      } catch {}
    };

    void tryPlay();

    const EVENTS = [
      "pointerdown",
      "pointerup",
      "pointermove",
      "pointerenter",
      "pointerover",

      "mousedown",
      "mouseup",
      "mousemove",
      "mouseenter",
      "mouseover",
      "wheel",

      "touchstart",
      "touchend",
      "touchmove",

      "keydown",
      "keyup",

      "scroll",

      "focus",
      "focusin",

      "visibilitychange",
    ] as const;

    const onInteraction = () => void tryPlay();

    const removeListeners = () => {
      EVENTS.forEach((e) =>
        document.removeEventListener(e, onInteraction, true),
      );
    };

    EVENTS.forEach((e) =>
      document.addEventListener(e, onInteraction, {
        capture: true,
        once: true,
      }),
    );

    audio.addEventListener("canplaythrough", tryPlay, { once: true });

    return () => {
      removeListeners();
      audio.removeEventListener("canplaythrough", tryPlay);
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundEnabled) {
      audio.pause();
      audio.muted = true;
      if (audioRetryRef.current !== null) {
        window.clearInterval(audioRetryRef.current);
        audioRetryRef.current = null;
      }
      setSoundEnabled(false);
      return;
    }

    audio.muted = false;
    audio.volume = 0.45;
    audio
      .play()
      .then(() => setSoundEnabled(true))
      .catch(() => setSoundEnabled(false));
  };

  const audioControls = (
    <>
      <audio
        ref={audioRef}
        src={audioTrack}
        loop
        autoPlay
        muted={false}
        preload="auto"
      />
      <motion.button
        type="button"
        onClick={toggleSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          backgroundColor: soundEnabled ? C.red : C.ink,
          color: C.bone,
          border: `2px solid ${soundEnabled ? C.ink : C.blue}`,
          boxShadow: `4px 4px 0 ${soundEnabled ? C.gold : C.blue}`,
        }}
        aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
        title={soundEnabled ? "Disable sound" : "Enable sound"}
      >
        {soundEnabled ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </motion.button>
    </>
  );

  const withAudio = (content: React.ReactNode) => (
    <>
      {audioControls}
      <CreatorBadge />
      {content}
    </>
  );

  if (route.name === "crew") {
    return withAudio(
      <Crew
        onSelect={(id) => setRoute({ name: "member", id })}
        setRoute={setRoute}
      />,
    );
  }
  if (route.name === "gears") {
    return withAudio(<Gears setRoute={setRoute} />);
  }
  if (route.name === "member") {
    const m = findMember(route.id);
    if (!m) {
      return withAudio(
        <Crew
          onSelect={(id) => setRoute({ name: "member", id })}
          setRoute={setRoute}
        />,
      );
    }
    return withAudio(
      <MemberPage member={m} onBack={() => setRoute({ name: "crew" })} />,
    );
  }

  const slide = slides[index];

  return withAudio(
    <div
      className="h-screen overflow-hidden flex flex-col relative"
      style={{
        backgroundColor: C.cream,
        backgroundImage: `linear-gradient(135deg, ${C.cream} 0%, ${C.bone} 44%, ${C.seaFoam}55 100%)`,
        fontFamily: "Inter, sans-serif",
        color: C.ink,
      }}
    >
      <AnimatePresence mode="sync">
        <HeroBackground src={slide.background} />
      </AnimatePresence>

      {/* Vertical side label */}
      <div
        className="fixed left-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.4em] md:block"
        style={{
          ...mono,
          zIndex: 10,
          color: C.ink,
          textShadow: `1px 1px 0 ${C.bone}`,
          writingMode: "vertical-rl",
        }}
      >
        ONE PIECE // ワンピース // EST. 1997
      </div>
      <div
        className="fixed right-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.4em] md:block"
        style={{
          ...mono,
          zIndex: 10,
          color: C.ink,
          textShadow: `1px 1px 0 ${C.bone}`,
          writingMode: "vertical-rl",
        }}
      >
        ISSUE NO. {slide.issue} // CHAPTER {index + 1} OF {slides.length}
      </div>

      <header
        className="relative flex-shrink-0 px-4 py-3 sm:px-6 lg:px-12 lg:py-5"
        style={{ zIndex: 10 }}
      >
        <nav className="flex items-center justify-between gap-3 lg:gap-4">
          {/* Logo block */}
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{
              backgroundColor: C.ink,
            }}
          >
            <span
              className="text-2xl leading-none sm:text-3xl lg:text-4xl"
              style={{ ...display, color: C.red }}
            >
              ONE
            </span>
            <span
              className="text-2xl leading-none sm:text-3xl lg:text-4xl"
              style={{ ...display, color: C.bone }}
            >
              PIECE
            </span>
            <span className="ml-1 hidden text-xs sm:inline" style={{ ...jp, color: C.bone }}>
              海賊
            </span>
          </div>

          {/* Nav pill */}
          <div
            className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
            style={{
              backgroundColor: C.ink,
              border: `2px solid ${C.ink}`,
            }}
          >
            {[
              {
                label: "Home",
                active: true,
                onClick: () => setRoute({ name: "home" }),
              },
              {
                label: "Crew",
                active: false,
                onClick: () => setRoute({ name: "crew" }),
              },
              {
                label: "Gears",
                active: false,
                onClick: () => setRoute({ name: "gears" }),
              },
              { label: "Arcs", active: false, onClick: () => {} },
              { label: "Bounties", active: false, onClick: () => {} },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="px-3 lg:px-4 py-1.5 text-sm lg:text-base rounded-full transition"
                style={{
                  color: item.active ? C.ink : C.bone,
                  backgroundColor: item.active ? C.bone : "transparent",
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden rounded-full px-4 py-2 text-sm sm:inline-flex lg:px-5 lg:text-base"
              style={{
                backgroundColor: C.gold,
                color: C.ink,
                border: `2px solid ${C.ink}`,
              }}
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full px-3 py-2 text-sm sm:px-4 lg:px-5 lg:text-base"
              style={{
                backgroundColor: C.red,
                color: C.bone,
                border: `2px solid ${C.ink}`,
                boxShadow: `3px 3px 0 ${C.gold}`,
              }}
            >
              Set Sail
            </motion.button>
          </div>
        </nav>
      </header>

      <main
        className="relative flex flex-1 flex-col justify-between px-4 py-2 sm:px-6 sm:py-4 lg:px-12 lg:py-6"
        style={{ zIndex: 10 }}
      >
        {/* TOP ROW */}
        <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-12 lg:gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`l-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="mb-2 flex items-center gap-2 sm:mb-3">
                <Tag>ISSUE {slide.issue}</Tag>
                <span className="text-[11px] tracking-[0.2em]" style={mono}>
                  {slide.kicker}
                </span>
              </div>
              <h1
                className="leading-[0.82] tracking-tight mb-2"
                style={{ ...display }}
              >
                {slide.heading.map((line, i) => (
                  <span
                    key={i}
                    className="block text-5xl uppercase sm:text-7xl lg:text-8xl xl:text-9xl"
                    style={{
                      color:
                        i === 2
                          ? "transparent"
                          : i === 1
                            ? slide.accent
                            : C.ink,
                      WebkitTextStroke:
                        i === 2 ? `2px ${slide.accentDeep}` : undefined,
                      textShadow: i === 1 ? `4px 4px 0 ${C.ink}` : undefined,
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <div className="mb-3 flex items-baseline gap-2 sm:mb-4 sm:gap-3">
                <span
                  className="text-xl sm:text-2xl lg:text-3xl"
                  style={{ ...jp, color: slide.accentDeep, fontWeight: 900 }}
                >
                  {slide.jpHead}
                </span>
                <span className="text-[11px] tracking-[0.25em]" style={mono}>
                  // CANON
                </span>
              </div>
              <p
                className="mb-3 max-w-md text-sm leading-relaxed sm:mb-5 sm:text-base lg:text-lg"
                style={{ color: C.ink }}
              >
                {slide.sub}
              </p>
              <motion.button
                whileHover={{ scale: 1.04, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 sm:pl-6"
                style={{
                  backgroundColor: C.ink,
                  color: C.bone,
                  border: `2px solid ${C.ink}`,
                }}
              >
                <span
                  className="text-sm lg:text-base tracking-[0.2em]"
                  style={display}
                >
                  HOIST THE FLAG
                </span>
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: slide.accent }}
                >
                  <ArrowRight className="w-5 h-5" style={{ color: C.bone }} />
                </span>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* DATA FILE */}
          <AnimatePresence mode="wait">
            <motion.aside
              key={`r-${index}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden w-full max-w-sm sm:block lg:col-span-5 lg:justify-self-end"
            >
              <div
                className="p-4 lg:p-5"
                style={{
                  backgroundColor: C.bone,
                  border: `2px solid ${C.ink}`,
                  boxShadow: `6px 6px 0 ${slide.accent}`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Tag dark>DATA FILE</Tag>
                  <span className="text-[10px]" style={mono}>
                    FILE_NO.{slide.issue}
                  </span>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span
                    className="text-6xl lg:text-7xl leading-[0.85]"
                    style={{ ...display, color: slide.accent }}
                  >
                    {slide.stat}
                  </span>
                  <span
                    className="text-lg pb-2"
                    style={{ ...jp, color: C.ink }}
                  >
                    {slide.statJp}
                  </span>
                </div>
                <p className="text-xs tracking-[0.2em] mb-4" style={mono}>
                  {slide.statLabel}
                </p>
                <div
                  className="h-px w-full mb-3"
                  style={{ backgroundColor: C.ink }}
                />
                <div
                  className="grid grid-cols-2 gap-y-1.5 text-xs"
                  style={mono}
                >
                  <span className="opacity-60">BOUNTY</span>
                  <span className="text-right">฿ {slide.bounty}</span>
                  <span className="opacity-60">CREW</span>
                  <span className="text-right">STRAW HAT</span>
                  <span className="opacity-60">SEA</span>
                  <span className="text-right">GRAND LINE</span>
                  <span className="opacity-60">STATUS</span>
                  <span className="text-right" style={{ color: slide.accent }}>
                    ● ACTIVE
                  </span>
                </div>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>

        {/* MIDDLE ROW */}
        <div className="grid grid-cols-1 items-end gap-3 sm:gap-5 lg:grid-cols-2 lg:gap-12">
          <div className="hidden items-start gap-4 sm:flex">
            <div
              className="px-2 py-1 text-[10px] tracking-[0.2em] flex-shrink-0"
              style={{ ...mono, backgroundColor: C.gold, color: C.ink }}
            >
              MANIFESTO
            </div>
            <div>
              <p
                className="text-sm lg:text-base max-w-md mb-3"
                style={{ color: C.ink }}
              >
                Born from Oda's pen — a flag planted for freedom, friendship,
                and the courage to chase impossible dreams.
              </p>
              <div className="flex items-center gap-2">
                {[Share2, Camera, Video].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3, rotate: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: slide.accent,
                      color: C.bone,
                      border: `2px solid ${C.ink}`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <span className="text-[10px] tracking-[0.3em]" style={mono}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setIndex(i)}
                  animate={{ width: i === index ? 56 : 22 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="h-2"
                  style={{
                    backgroundColor: i === index ? slide.accent : C.ink,
                    opacity: i === index ? 1 : 0.4,
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: CTA + crew preview */}

        <motion.button
          whileHover={{ scale: 1.04, x: 4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setRoute({ name: "crew" })}
          className="mx-auto inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5"
          style={{
            backgroundColor: slide.accent,
            color: C.bone,
            border: `2px solid ${C.ink}`,
            boxShadow: `4px 4px 0 ${C.gold}`,
          }}
        >
          <Users className="w-4 h-4" />
          <span
            className="text-sm lg:text-base tracking-[0.2em]"
            style={display}
          >
            SEE THE CREW
          </span>
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: C.ink }}
          >
            <ArrowRight className="w-4 h-4" style={{ color: C.bone }} />
          </span>
        </motion.button>
        <div
          className="flex hidden items-center justify-between gap-4 px-4 py-3 rounded-full flex-wrap"
          style={{
            backgroundColor: C.bone,
            border: `2px solid ${C.ink}`,
            boxShadow: `4px 4px 0 ${C.blue}`,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="px-2 py-1 text-[10px] tracking-[0.2em]"
              style={{ ...mono, backgroundColor: C.ink, color: C.bone }}
            >
              ROSTER // 10
            </span>
            <div className="flex items-center -space-x-2 hidden">
              {members.slice(0, 6).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setRoute({ name: "member", id: m.id })}
                  title={m.alias}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold transition hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${m.color}, ${m.colorDeep})`,
                    color: C.bone,
                    border: `2px solid ${C.ink}`,
                  }}
                >
                  {m.alias.charAt(0)}
                </button>
              ))}
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  backgroundColor: C.ink,
                  color: C.bone,
                  border: `2px solid ${C.ink}`,
                }}
              >
                +4
              </span>
            </div>
            <span className="text-sm hidden sm:inline" style={{ color: C.ink }}>
              Meet every member of the Straw Hat Pirates
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.04, x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRoute({ name: "crew" })}
            className="inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full"
            style={{
              backgroundColor: C.red,
              color: C.bone,
              border: `2px solid ${C.ink}`,
              boxShadow: `4px 4px 0 ${C.gold}`,
            }}
          >
            <Users className="w-4 h-4" />
            <span
              className="text-sm lg:text-base tracking-[0.2em]"
              style={display}
            >
              SEE THE CREW
            </span>
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: C.ink }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: C.bone }} />
            </span>
          </motion.button>
        </div>
      </main>
    </div>,
  );
}
