"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const birthday = new Date("2006-05-03T00:00:00");

const wishes = [
  "一闪一闪亮晶晶，满天都是小心心 ✨",
  "生活明朗，万物可爱 🌸",
  "仙女永远18岁 🧚‍♀️",
  "愿你被温柔包围，被爱偏爱",
  "愿你的世界永远闪闪发光",
  "Happy Birthday 煜心 💖",
];

const memoryTimeline = [
  ["2006.05.03", "那一天，世界多了一颗会发光的小心心。💖"],
  ["此刻", "今天的空气里，都是亮晶晶的小心心 ✨"],
  ["未来", "往后的路不需要回头，因为一直有人在你身后 💫"],
];

const wishJar = [
  "愿你每一次抬头，都能看见属于自己的星光。",
  "愿你遇到的人都温柔，走过的路都闪闪发亮。",
  "愿你新的一岁，有浪漫、有自由、有很多好消息。",
  "愿你一直可爱，也一直勇敢。",
  "愿今天的快乐可以保存很久很久。",
];

const particleData = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  duration: 4 + ((i * 7) % 6),
  delay: (i % 9) * 0.28,
  size: 2 + (i % 5),
}));

const meteorData = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  top: `${8 + i * 12}%`,
  delay: i * 1.9,
}));

const starData = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 43) % 88)}%`,
  top: `${8 + ((i * 29) % 58)}%`,
  delay: (i % 8) * 0.32,
}));

const confettiData = Array.from({ length: 54 }, (_, i) => ({
  id: i,
  angle: (360 / 54) * i,
  distance: 100 + ((i * 23) % 200),
  size: 8 + (i % 10),
}));

function isBirthdayToday(now: Date) {
  return now.getMonth() === 4 && now.getDate() === 3;
}

function getNextBirthday(now: Date) {
  const next = new Date(now.getFullYear(), 4, 3, 0, 0, 0);
  if (next.getTime() < now.getTime()) next.setFullYear(next.getFullYear() + 1);
  return next;
}

function getCountdown(now: Date) {
  const next = getNextBirthday(now);
  const diff = Math.max(0, next.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function Icon({ type, className = "" }: { type: "heart" | "sparkle" | "gift" | "cake" | "stars" | "party" | "moon" | "letter" | "clock" | "jar"; className?: string }) {
  const label = {
    heart: "♡",
    sparkle: "✦",
    gift: "🎁",
    cake: "🎂",
    stars: "✧",
    party: "🎉",
    moon: "☾",
    letter: "✉",
    clock: "◷",
    jar: "✦",
  }[type];

  return <span className={`inline-flex items-center justify-center leading-none ${className}`}>{label}</span>;
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-400 to-violet-400 px-6 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(244,114,182,0.45)] transition-transform hover:scale-[1.03] hover:from-pink-300 hover:to-violet-300 focus:outline-none focus:ring-2 focus:ring-pink-200/80"
    >
      {children}
    </button>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particleData.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 1, 0.25], scale: [1, 1.35, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

function ShootingStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteorData.map((m) => (
        <motion.div
          key={m.id}
          className="absolute h-[2px] w-32 rounded-full bg-gradient-to-r from-transparent via-pink-200 to-transparent opacity-80"
          style={{ top: m.top, right: "-160px", transform: "rotate(-18deg)" }}
          animate={{ x: [0, -1250], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 6, delay: m.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function RibbonWave() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden opacity-90">
      <motion.div
        className="h-48 bg-gradient-to-r from-pink-300/10 via-fuchsia-200/25 to-violet-200/10 blur-3xl"
        animate={{ x: ["-12%", "12%", "-12%"], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function MoonGlow() {
  return (
    <motion.div
      className="pointer-events-none absolute right-8 top-8 md:right-20 md:top-16"
      animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute -inset-10 rounded-full bg-pink-200/20 blur-3xl" />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-[0_0_60px_rgba(244,114,182,0.35)] backdrop-blur-md">
        <Icon type="moon" className="text-6xl text-pink-100" />
      </div>
    </motion.div>
  );
}

function TwinkleStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {starData.map((star) => (
        <motion.div
          key={star.id}
          className="absolute text-pink-100/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ left: star.left, top: star.top }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.75, 1.25, 0.75], rotate: [0, 20, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: star.delay }}
        >
          <Icon type="sparkle" className="text-lg" />
        </motion.div>
      ))}
    </div>
  );
}

function ConfettiBurst({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {active &&
        confettiData.map((c) => {
          const x = Math.cos((c.angle * Math.PI) / 180) * c.distance;
          const y = Math.sin((c.angle * Math.PI) / 180) * c.distance;
          return (
            <motion.div
              key={c.id}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x, y, opacity: 0, rotate: 360 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute rounded-sm shadow-lg"
              style={{ width: c.size, height: c.size * 0.6, background: `hsl(${300 + ((c.id * 7) % 60)} 90% 75%)` }}
            />
          );
        })}
    </div>
  );
}

function ClickSurprise({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center">
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.72, y: 18 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.72, 1, 1.05, 0.98], y: [18, 0, 0, -18] }}
          transition={{ duration: 1.7, ease: "easeOut" }}
          className="rounded-[2rem] border border-white/25 bg-white/15 px-8 py-5 text-center text-2xl font-black text-white shadow-[0_0_60px_rgba(244,114,182,0.45)] backdrop-blur-2xl sm:text-4xl"
        >
          仙女永远18岁 ✨💖
        </motion.div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center shadow-[0_0_35px_rgba(244,114,182,0.18)] backdrop-blur-xl sm:rounded-3xl sm:p-5"
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 text-lg text-pink-100 sm:h-10 sm:w-10 sm:text-xl">{icon}</div>
      <div className="text-2xl font-black text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-pink-100/75 sm:text-sm">{label}</div>
    </motion.div>
  );
}

function CountdownPanel({ now }: { now: Date }) {
  const c = getCountdown(now);
  const items = [
    ["Days", c.days],
    ["Hours", c.hours],
    ["Minutes", c.minutes],
    ["Seconds", c.seconds],
  ];

  return (
    <section className="mt-6 rounded-[1.5rem] border border-white/15 bg-white/10 p-4 shadow-[0_0_55px_rgba(236,72,153,0.2)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
      <div className="flex flex-col gap-2 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <div className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-pink-100/75 sm:text-sm sm:tracking-[0.25em]">
            <Icon type="clock" className="text-lg" /> Birthday Countdown
          </div>
          <h2 className="mt-2 text-xl font-black text-white sm:text-2xl md:text-3xl">距离下一次 5 月 3 日</h2>
        </div>
        <div className="text-sm text-pink-100/70">Every second is a little starlight.</div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {items.map(([label, value]) => (
          <motion.div
            key={label}
            className="rounded-2xl border border-white/15 bg-pink-950/30 p-3 text-center sm:rounded-3xl sm:p-5"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.6, repeat: Infinity }}
          >
            <div className="text-3xl font-black text-white sm:text-4xl md:text-5xl">{String(value).padStart(2, "0")}</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-pink-100/65 sm:text-xs sm:tracking-[0.2em]">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BirthdayLetterButtonPanel({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="mt-6 rounded-[1.5rem] border border-white/15 bg-white/10 p-6 text-center shadow-[0_0_55px_rgba(236,72,153,0.25)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
      <div className="text-lg font-semibold text-pink-100 sm:text-xl">今天就是煜心的生日啦 ✨</div>
      <div className="mt-3 text-3xl font-black text-white sm:text-4xl">生日快乐 🎂</div>
      <div className="mt-5">
        <PrimaryButton onClick={onOpen}>打开生日信 ✉</PrimaryButton>
      </div>
    </section>
  );
}

function WishJar({ selectedWish, onOpen }: { selectedWish: string; onOpen: () => void }) {
  return (
    <section className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 shadow-[0_0_55px_rgba(168,85,247,0.18)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
      <div className="flex items-center gap-3 text-pink-100">
        <Icon type="jar" className="text-2xl" />
        <span className="text-sm uppercase tracking-[0.25em]">Wish Jar</span>
      </div>
      <h3 className="mt-4 text-xl font-black text-white sm:text-2xl">星星心愿瓶</h3>
      <div className="mt-2 text-sm text-pink-100/80">用来抽取不同生日祝福，第一颗星就是 Happy Birthday 煜心 💖</div>
      <motion.div
        key={selectedWish}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 min-h-[96px] rounded-2xl border border-white/15 bg-pink-950/30 p-4 text-base leading-7 text-pink-50 sm:min-h-[110px] sm:rounded-3xl sm:p-5 sm:text-lg sm:leading-8"
      >
        {selectedWish}
      </motion.div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-5 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-pink-50 hover:bg-white/15 sm:px-5 sm:py-4 sm:text-base"
      >
        抽一颗新的祝福星 ✦
      </button>
    </section>
  );
}

function TimelinePanel() {
  return (
    <section className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 shadow-[0_0_55px_rgba(168,85,247,0.16)] backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
      <div className="flex items-center gap-3 text-pink-100">
        <Icon type="letter" className="text-2xl" />
        <span className="text-sm uppercase tracking-[0.25em]">Memory Timeline</span>
      </div>
      <h3 className="mt-4 text-xl font-black text-white sm:text-2xl">星光时间线</h3>
      <div className="mt-5 space-y-4">
        {memoryTimeline.map(([date, text], i) => (
          <motion.div
            key={date}
            className="rounded-2xl border border-white/15 bg-pink-950/25 p-4 sm:rounded-3xl sm:p-5"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <div className="text-sm font-semibold text-fuchsia-200">{date}</div>
            <div className="mt-1 text-sm leading-6 text-pink-100/80">{text}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LetterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg rounded-[2rem] border border-white/20 bg-pink-950/90 p-7 shadow-[0_0_80px_rgba(236,72,153,0.35)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-pink-200/75">Secret Letter</div>
            <h3 className="mt-2 text-3xl font-black text-white">给煜心的一封星光信</h3>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/15">
            ×
          </button>
        </div>
        <p className="mt-6 text-lg leading-9 text-pink-50">
          愿这一页小小的星空，替我把生日快乐说得更认真一点。愿你在新的一岁里，拥有柔软的心情、明亮的方向、自由的脚步，和很多很多被珍惜的瞬间。
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-violet-400 px-5 py-4 font-semibold text-white shadow-[0_0_30px_rgba(244,114,182,0.35)]"
        >
          收下这份祝福 ✨
        </button>
      </motion.div>
    </div>
  );
}

export default function YuxinBirthdayCelebration() {
  const [burst, setBurst] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [selectedWishIndex, setSelectedWishIndex] = useState(5);
  const [letterOpen, setLetterOpen] = useState(false);
  const [surpriseActive, setSurpriseActive] = useState(false);
  const burstTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const surpriseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (burstTimerRef.current) clearTimeout(burstTimerRef.current);
      if (surpriseTimerRef.current) clearTimeout(surpriseTimerRef.current);
    };
  }, []);

  const triggerBurst = useCallback((duration: number = 1500) => {
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current);
    setBurst(false);
    requestAnimationFrame(() => {
      setBurst(true);
      burstTimerRef.current = setTimeout(() => setBurst(false), duration);
    });
  }, []);

  const openWishJar = useCallback(() => {
    setSelectedWishIndex((prev) => (prev + 1) % wishJar.length);
    triggerBurst(900);
  }, [triggerBurst]);

  const openLetter = useCallback(() => {
    setLetterOpen(true);
    triggerBurst(1000);
  }, [triggerBurst]);

  const triggerSurprise = useCallback(() => {
    if (surpriseTimerRef.current) clearTimeout(surpriseTimerRef.current);
    setSurpriseActive(true);
    triggerBurst(900);
    surpriseTimerRef.current = setTimeout(() => setSurpriseActive(false), 1700);
  }, [triggerBurst]);

  const showBirthdayMode = now && isBirthdayToday(now);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#a21caf_0%,#7c3aed_24%,#4c1d95_48%,#1f1147_100%)] text-white">
      <RibbonWave />
      <FloatingParticles />
      <TwinkleStars />
      <ShootingStars />
      <div className="hidden sm:block">
        <MoonGlow />
      </div>
      <ConfettiBurst active={burst} />
      <ClickSurprise active={surpriseActive} />
      <LetterModal open={letterOpen} onClose={() => setLetterOpen(false)} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-16">
        <motion.div className="absolute left-2 top-6 h-24 w-24 rounded-full bg-pink-300/20 blur-3xl sm:left-6 sm:h-32 sm:w-32" animate={{ scale: [1, 1.2, 1] }} />
        <motion.div className="absolute right-2 top-24 h-28 w-28 rounded-full bg-violet-300/20 blur-3xl sm:right-10 sm:top-32 sm:h-40 sm:w-40" animate={{ scale: [1.1, 0.95, 1.1] }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-pink-100">✧ Yuxin ✦</motion.div>
          <motion.h1
            onClick={triggerSurprise}
            className="mt-6 cursor-pointer text-4xl font-black leading-tight text-white transition hover:scale-[1.02] sm:text-5xl md:text-6xl"
          >
            生日快乐 煜心 🎂
          </motion.h1>
          <div className="mx-auto mt-3 max-w-3xl text-lg font-semibold leading-relaxed text-white sm:text-2xl md:text-3xl">
            一闪一闪亮晶晶 ✨ 星光亮起，你还是18岁的那颗心心 💖
          </div>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <p className="text-base text-pink-100 sm:text-xl">生活明朗，万物可爱 🌸</p>
            <button
              type="button"
              onClick={openLetter}
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(244,114,182,0.25)] backdrop-blur-xl transition hover:scale-105 hover:bg-white/15 active:scale-95 sm:text-base"
            >
              打开生日信 ✉
            </button>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2">
          <StatCard label="Born" value="05.03" icon={<Icon type="cake" />} />
          <StatCard label="Fairy Age" value="18 ✦" icon={<Icon type="stars" />} />
        </div>

        {showBirthdayMode ? <BirthdayLetterButtonPanel onOpen={openLetter} /> : now && <CountdownPanel now={now} />}

        <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <WishJar selectedWish={wishes[selectedWishIndex]} onOpen={openWishJar} />
          <TimelinePanel />
        </div>
      </div>
    </div>
  );
}

