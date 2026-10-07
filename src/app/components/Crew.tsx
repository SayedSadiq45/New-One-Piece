import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, Skull } from "lucide-react";
import { members } from "../members";
import { onePieceTheme } from "../onePieceTheme";

const display = { fontFamily: "Anton, sans-serif" };
const jp = { fontFamily: '"Noto Sans JP", sans-serif' };
const mono = { fontFamily: '"JetBrains Mono", monospace' };

const C = onePieceTheme;

const memberImages: Record<string, string[]> = {
  brook: ["/assets/brook.jpeg", "/assets/brook-1.jpeg"],
  chopper: ["/assets/chopper.jpeg", "/assets/chopper-1.jpeg"],
  franky: ["/assets/franky.jpeg", "/assets/franky-1.jpeg"],
  luffy: ["/assets/luffy.jpeg", "/assets/luffy-1.jpeg"],
  nami: ["/assets/nami.jpeg", "/assets/nami-1.jpeg"],
  robin: ["/assets/robin.jpeg", "/assets/robin-1.jpeg"],
  sanji: ["/assets/sanji.jpeg", "/assets/sanji-1.jpeg"],
  usopp: ["/assets/usopp.jpeg", "/assets/usopp-1.jpeg"],
  zoro: ["/assets/zoro.jpeg", "/assets/zoro-1.jpeg"],
  jinbe: ["/assets/jinbe.jpeg", "/assets/jinbe-1.jpeg"],
};

type RouteTarget = { name: "home" } | { name: "crew" } | { name: "gears" };

type Props = {
  onSelect: (id: string) => void;
  setRoute: (route: RouteTarget) => void;
};

export function Crew({ onSelect, setRoute }: Props) {
  const [index, setIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const active = members[index];
  const activeImages = memberImages[active.id] ?? [];
  const activeImage = activeImages[imageIndex % activeImages.length];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % members.length);
    }, 8000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setImageIndex(0);
  }, [index]);

  useEffect(() => {
    if (activeImages.length < 2) return;

    const id = setInterval(() => {
      setImageIndex((current) => (current + 1) % activeImages.length);
    }, 4000);

    return () => clearInterval(id);
  }, [activeImages.length, index]);

  return (
    <section
      className="relative h-[100dvh] overflow-hidden"
      style={{
        backgroundColor: C.cream,
        backgroundImage: `linear-gradient(135deg, ${C.cream} 0%, ${C.bone} 44%, ${C.seaFoam}44 100%)`,
        color: C.ink,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            opacity: { duration: 0.9, ease: "easeInOut" },
            scale: { duration: 8, ease: "easeOut" },
          }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 72% 28%, ${active.color}AA 0%, transparent 30%), radial-gradient(circle at 83% 72%, ${active.colorDeep}99 0%, transparent 34%), linear-gradient(135deg, ${active.color} 0%, ${active.colorDeep} 100%)`,
          }}
        >
          <AnimatePresence mode="sync">
            {activeImage ? (
              <motion.img
                key={activeImage}
                src={activeImage}
                alt=""
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden="true"
              />
            ) : null}
          </AnimatePresence>
          {!activeImage ? (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 72% 28%, ${active.color}AA 0%, transparent 30%), radial-gradient(circle at 83% 72%, ${active.colorDeep}99 0%, transparent 34%), linear-gradient(135deg, ${active.color} 0%, ${active.colorDeep} 100%)`,
              }}
              aria-hidden="true"
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at left bottom, rgba(255, 243, 214, 0.96) 0%, rgba(255, 243, 214, 0.78) 24%, transparent 54%), radial-gradient(ellipse at left top, rgba(255, 201, 40, 0.34) 0%, rgba(0, 119, 200, 0.16) 28%, transparent 56%), linear-gradient(30deg, ${C.blueDeep}B0 0%, ${C.ink}55 24%, transparent 48%)`,
        }}
      />

      <div
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.4em] md:block"
        style={{ ...mono, color: C.ink, writingMode: "vertical-rl" }}
      >
        STRAW HAT PIRATES // CREW FILE // ROSTER
      </div>

      <div
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-[10px] tracking-[0.4em] md:block"
        style={{ ...mono, color: C.bone, writingMode: "vertical-rl" }}
      >
        NO.{String(index + 1).padStart(3, "0")} // {active.role.toUpperCase()}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-5">
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
          <nav className="flex items-center justify-between gap-3 lg:gap-4">
            <button
              type="button"
              onClick={() => setRoute({ name: "home" })}
              className="flex items-center gap-2 px-3 py-1.5"
              style={{
                backgroundColor: C.cream,
                border: `2px solid ${C.ink}`,
                boxShadow: `4px 4px 0 ${C.blue}`,
              }}
              aria-label="Go home"
            >
              <span
                className="text-2xl leading-none sm:text-3xl lg:text-4xl"
                style={{ ...display, color: C.red }}
              >
                ONE
              </span>
              <span
                className="text-2xl leading-none sm:text-3xl lg:text-4xl"
                style={{ ...display, color: C.ink }}
              >
                PIECE
              </span>
              <span
                className="ml-1 hidden text-xs sm:inline"
                style={{ ...jp, color: C.ink }}
              >
                海賊
              </span>
            </button>

            <div
              className="hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex"
              style={{ backgroundColor: C.ink, border: `2px solid ${C.ink}` }}
            >
              {[
                {
                  label: "Home",
                  active: false,
                  go: () => setRoute({ name: "home" }),
                },
                {
                  label: "Crew",
                  active: true,
                  go: () => setRoute({ name: "crew" }),
                },
                {
                  label: "Gears",
                  active: false,
                  go: () => setRoute({ name: "gears" }),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.go}
                  className="rounded-full px-3 py-1.5 text-sm transition lg:px-4 lg:text-base"
                  style={{
                    color: item.active ? C.ink : C.bone,
                    backgroundColor: item.active ? C.gold : "transparent",
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
                  style={{
                    ...mono,
                    backgroundColor: C.blueDeep,
                    color: C.bone,
                  }}
                >
                  ROSTER // 10
                </span>
                <span className="text-[11px] tracking-[0.2em]" style={mono}>
                  STRAW HAT PIRATES // 麦わらの一味
                </span>
              </div>
              <h1
                className="text-4xl uppercase leading-[0.82] sm:text-6xl lg:text-8xl xl:text-[8.75rem]"
                style={{ ...display, color: C.ink }}
              >
                Straw Hat
                <span
                  className="block"
                  style={{
                    color: active.color,
                    textShadow: `4px 4px 0 ${C.ink}`,
                  }}
                >
                  Pirates
                </span>
              </h1>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-[10px] tracking-[0.25em]" style={mono}>
                CREW BOUNTY
              </div>
              <div
                className="text-4xl lg:text-5xl"
                style={{
                  ...display,
                  color: active.color,
                  textShadow: `2px 2px 0 ${C.ink}`,
                }}
              >
                ฿ 8,816,001,000
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
                    color: active.color,
                    textShadow: `4px 4px 0 ${C.ink}`,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-[10px] tracking-[0.3em]" style={mono}>
                    // ROLE
                  </div>
                  <div
                    className="text-2xl uppercase leading-none sm:text-3xl lg:text-4xl"
                    style={{ ...display, color: C.ink }}
                  >
                    {active.role}
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
                  color: active.colorDeep,
                  fontWeight: 900,
                }}
              >
                {active.jp}
              </div>
              <p className="max-w-xl text-xs leading-relaxed sm:text-sm lg:text-base">
                {active.bio}
              </p>
              <motion.button
                type="button"
                onClick={() => onSelect(active.id)}
                whileHover={{ scale: 1.04, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="mt-3 inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 sm:mt-5"
                style={{
                  backgroundColor: active.color,
                  color: C.bone,
                  border: `2px solid ${C.ink}`,
                  boxShadow: `4px 4px 0 ${C.gold}`,
                }}
              >
                <span
                  className="text-sm tracking-[0.2em] lg:text-base"
                  style={display}
                >
                  VIEW FILE
                </span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: C.blueDeep }}
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
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
                  backgroundColor: C.bone,
                  border: `2px solid ${C.ink}`,
                  boxShadow: `6px 6px 0 ${active.color}`,
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="px-1.5 py-0.5 text-[10px] tracking-[0.2em]"
                    style={{ ...mono, backgroundColor: C.gold, color: C.ink }}
                  >
                    DATA FILE
                  </span>
                  <span className="text-[10px]" style={mono}>
                    FILE_NO.{active.id.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs" style={mono}>
                  <span className="opacity-60">ALIAS</span>
                  <span className="text-right">{active.alias}</span>
                  <span className="opacity-60">ROLE</span>
                  <span className="text-right">{active.role}</span>
                  <span className="opacity-60">FRUIT</span>
                  <span className="text-right">{active.fruit}</span>
                  <span className="opacity-60">BOUNTY</span>
                  <span
                    className="text-right"
                    style={{ color: active.colorDeep, fontWeight: 700 }}
                  >
                    ฿ {active.bounty}
                  </span>
                </div>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
            {members.map((member, memberIndex) => {
              const isActive = member.id === active.id;
              return (
                <motion.button
                  key={member.id}
                  type="button"
                  onClick={() => setIndex(memberIndex)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2"
                  style={{
                    backgroundColor: isActive ? member.color : C.bone,
                    color: isActive ? C.bone : C.ink,
                    border: `2px solid ${C.ink}`,
                    boxShadow: isActive
                      ? `4px 4px 0 ${C.gold}`
                      : `2px 2px 0 ${C.blue}`,
                  }}
                  aria-label={`Show ${member.name}`}
                >
                  <Skull className="h-4 w-4" />
                  <span className="text-sm tracking-[0.14em]" style={display}>
                    {member.alias}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </motion.button>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <span className="text-[10px] tracking-[0.3em]" style={mono}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(members.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              {members.map((member, memberIndex) => (
                <motion.button
                  key={`dot-${member.id}`}
                  type="button"
                  onClick={() => setIndex(memberIndex)}
                  animate={{ width: memberIndex === index ? 56 : 22 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="h-2"
                  style={{
                    backgroundColor:
                      memberIndex === index ? active.color : C.ink,
                    opacity: memberIndex === index ? 1 : 0.45,
                  }}
                  aria-label={`Slide ${memberIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
