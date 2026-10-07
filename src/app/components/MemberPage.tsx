import { motion } from "motion/react";
import { ArrowLeft, Quote } from "lucide-react";
import type { Member } from "../members";
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

type Props = { member: Member; onBack: () => void };

export function MemberPage({ member, onBack }: Props) {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `radial-gradient(circle at 24% 18%, ${gold}5C 0%, transparent 34%), radial-gradient(circle at 88% 10%, ${seaFoam}66 0%, transparent 36%), radial-gradient(circle at 30% 20%, ${member.color}33 0%, transparent 60%), linear-gradient(180deg, ${CREAM} 0%, ${BONE} 46%, ${member.color}24 100%)`,
        color: INK,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Side label */}
      <div
        className="fixed left-3 top-1/2 z-10 hidden -translate-y-1/2 text-[10px] tracking-[0.4em] md:block"
        style={{ ...mono, color: INK, writingMode: "vertical-rl" }}
      >
        STRAW HAT // {member.role.toUpperCase()} // ONE PIECE
      </div>
      <div
        className="fixed right-3 top-1/2 z-10 hidden -translate-y-1/2 text-3xl md:block"
        style={{
          ...jp,
          color: member.color,
          fontWeight: 900,
          writingMode: "vertical-rl",
          textShadow: `2px 2px 0 ${INK}`,
        }}
      >
        {member.jp} // 麦わら
      </div>

      <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-5">
        <motion.button
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 sm:px-4"
          style={{
            backgroundColor: INK,
            color: BONE,
            border: `2px solid ${INK}`,
            boxShadow: `4px 4px 0 ${gold}`,
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs tracking-[0.15em] sm:text-sm" style={display}>
            BACK TO CREW
          </span>
        </motion.button>
        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
          <span
            className="truncate px-2 py-1 text-[10px] tracking-[0.2em]"
            style={{ ...mono, backgroundColor: blueDeep, color: BONE }}
          >
            FILE_NO.{member.id.toUpperCase()}
          </span>
          <span
            className="hidden px-2 py-1 text-[10px] tracking-[0.2em] sm:inline-block"
            style={{
              ...mono,
              backgroundColor: gold,
              color: INK,
              border: `1px solid ${INK}`,
            }}
          >
            ● ACTIVE
          </span>
        </div>
      </header>

      <main className="px-4 pb-6 sm:px-6 sm:pb-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: Big poster area (placeholder bg) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/5] lg:col-span-7 lg:aspect-[5/6]"
            style={{
              background: `linear-gradient(160deg, ${member.color} 0%, ${member.colorDeep} 100%)`,
              border: `3px solid ${INK}`,
              boxShadow: `8px 8px 0 ${gold}`,
            }}
          >
            {/* paint splatter feel */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 70% 80%, ${blueDeep} 0%, transparent 35%), radial-gradient(circle at 20% 30%, ${BONE}55 0%, transparent 40%), linear-gradient(45deg, transparent 0%, ${gold}66 48%, transparent 52%)`,
              }}
            />
            {/* Vertical name */}
            <div
              className="absolute left-4 top-4 bottom-4 flex items-start"
              style={{ writingMode: "vertical-rl" }}
            >
              <span
                className="text-5xl uppercase leading-none sm:text-7xl lg:text-9xl"
                style={{
                  ...display,
                  color: BONE,
                  textShadow: `4px 4px 0 ${INK}`,
                }}
              >
                {member.alias}
              </span>
            </div>
            {/* Big JP */}
            <div
              className="absolute right-4 top-4 text-5xl leading-none sm:right-6 sm:top-6 sm:text-7xl lg:text-9xl"
              style={{ ...jp, color: BONE, opacity: 0.85, fontWeight: 900 }}
            >
              {member.jp}
            </div>
            {/* Placeholder figure tag */}
            <div
              className="absolute bottom-3 right-3 px-2 py-1 text-[10px] tracking-[0.25em] sm:bottom-4 sm:right-4"
              style={{ ...mono, backgroundColor: BONE, color: INK }}
            >
              // BACKGROUND PENDING
            </div>
          </motion.div>

          {/* RIGHT: Info panels */}
          <div className="space-y-3 sm:space-y-4 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="text-[11px] tracking-[0.3em] mb-1" style={mono}>
                {member.role.toUpperCase()} // STRAW HAT
              </div>
              <h1
                className="text-4xl uppercase leading-[0.85] sm:text-5xl lg:text-7xl"
                style={{ ...display, color: INK }}
              >
                {member.name.split(" ").map((w, i) => (
                  <span
                    key={i}
                    className="block"
                    style={
                      i === 1
                        ? {
                            color: member.color,
                            textShadow: `3px 3px 0 ${INK}`,
                          }
                        : undefined
                    }
                  >
                    {w}
                  </span>
                ))}
              </h1>
              <div
                className="mt-1 text-xl sm:mt-2 sm:text-2xl lg:text-3xl"
                style={{ ...jp, fontWeight: 900, color: member.colorDeep }}
              >
                {member.jp}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-3 sm:p-4 lg:p-5"
              style={{
              backgroundColor: BONE,
              border: `2px solid ${INK}`,
                boxShadow: `5px 5px 0 ${blue}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-1.5 py-0.5 text-[10px] tracking-[0.2em]"
                  style={{ ...mono, backgroundColor: gold, color: INK }}
                >
                  DATA FILE
                </span>
                <span
                  className="text-[10px] tracking-[0.2em] opacity-70"
                  style={mono}
                >
                  BIO // STATS
                </span>
              </div>
              <p className="text-sm lg:text-base mb-4">{member.bio}</p>
              <div className="grid grid-cols-2 gap-y-2 text-xs" style={mono}>
                <span className="opacity-60">ALIAS</span>
                <span className="text-right">{member.alias}</span>
                <span className="opacity-60">ROLE</span>
                <span className="text-right">{member.role}</span>
                <span className="opacity-60">FRUIT</span>
                <span className="text-right">{member.fruit}</span>
                <span className="opacity-60">BOUNTY</span>
                <span
                  className="text-right"
                  style={{ color: member.color, fontWeight: 700 }}
                >
                  ฿ {member.bounty}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative p-3 sm:p-4 lg:p-5"
              style={{
                backgroundColor: member.color,
                color: BONE,
                border: `2px solid ${INK}`,
                boxShadow: `5px 5px 0 ${gold}`,
              }}
            >
              <Quote className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-base leading-snug sm:text-lg lg:text-xl" style={display}>
                "{member.quote}"
              </p>
              <div
                className="text-[10px] tracking-[0.25em] mt-2 opacity-80"
                style={mono}
              >
                — {member.alias.toUpperCase()}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
