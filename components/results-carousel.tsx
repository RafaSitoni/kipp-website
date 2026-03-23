"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    company: "ModaMais",
    sector: "E-commerce",
    initials: "MM",
    color: "#3B82F6",
    quote: "A KIPP transformou nosso atendimento. Antes perdíamos clientes por lentidão — hoje fechamos pedidos 24h por dia, sem ampliar o time.",
    person: "Ana Carvalho",
    role: "Diretora de Operações",
    kpi: "+47%",
    kpiLabel: "taxa de conversão",
    chartPoints: "0,72 40,68 80,58 110,44 150,30 190,18 230,8",
  },
  {
    id: 2,
    company: "ClínicaVita",
    sector: "Saúde & Bem-estar",
    initials: "CV",
    color: "#60A5FA",
    quote: "O agendamento automático liberou nossa equipe para focar no que importa: os pacientes. O retorno foi imediato no primeiro mês.",
    person: "Dr. Marcos Lima",
    role: "Sócio Fundador",
    kpi: "3h/dia",
    kpiLabel: "economizadas por atendente",
    chartPoints: "0,75 50,70 90,60 130,48 170,32 210,20 250,10",
  },
  {
    id: 3,
    company: "ScaleUp",
    sector: "Infoprodutos",
    initials: "SU",
    color: "#818CF8",
    quote: "O funil de qualificação da KIPP filtra os leads antes de chegar ao time de vendas. Triplicamos a conversão sem contratar ninguém.",
    person: "Rodrigo Menezes",
    role: "CEO & Fundador",
    kpi: "3×",
    kpiLabel: "leads qualificados",
    chartPoints: "0,78 40,72 80,60 120,45 160,28 200,14 240,4",
  },
  {
    id: 4,
    company: "Nexus Consult",
    sector: "Consultoria B2B",
    initials: "NC",
    color: "#34D399",
    quote: "Nossos clientes adoram a agilidade. Respostas em segundos, o dia todo, sem aumentar headcount. Nosso NPS nunca esteve tão alto.",
    person: "Fernanda Torres",
    role: "Head de Customer Success",
    kpi: "98%",
    kpiLabel: "NPS de satisfação",
    chartPoints: "0,70 50,65 90,55 130,44 160,35 200,22 240,9",
  },
]

/* Mini sparkline SVG */
function Sparkline({ points, color }: { points: string; color: string }) {
  return (
    <svg
      viewBox="0 0 250 80"
      preserveAspectRatio="none"
      className="w-full h-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`fill-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polygon
        points={`0,80 ${points} 250,80`}
        fill={`url(#fill-${color.replace("#","")})`}
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      {/* Dot at end */}
      {(() => {
        const last = points.split(" ").pop()!
        const [x, y] = last.split(",").map(Number)
        return (
          <>
            <circle cx={x} cy={y} r="4" fill={color} opacity="0.8" />
            <circle cx={x} cy={y} r="8" fill={color} opacity="0.15" />
          </>
        )
      })()}
    </svg>
  )
}

const INTERVAL = 5500

export function ResultsCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(i => (i + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(i => (i - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(next, INTERVAL)
    return () => clearTimeout(t)
  }, [current, paused, next])

  const t = testimonials[current]

  return (
    <section
      id="results"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060B18 0%, #0A1228 60%, #0D1B3E 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#818CF8]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[#60A5FA] text-[10px] tracking-[0.28em] uppercase mb-4">
            <span className="w-5 h-px bg-[#60A5FA]/40" />RESULTADOS REAIS<span className="w-5 h-px bg-[#60A5FA]/40" />
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            O que nossos{" "}
            <span style={{ background: "linear-gradient(135deg,#60A5FA,#818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              clientes alcançam
            </span>
          </h2>
        </motion.div>

        {/* Carousel row */}
        <div className="flex items-center gap-4">

          {/* Prev */}
          <button
            onClick={prev}
            className="hidden md:flex w-12 h-12 rounded-full border border-white/12 bg-white/6 items-center justify-center text-white/50 hover:text-white hover:bg-white/12 hover:border-white/25 transition-all flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Card */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.32, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg,transparent,${t.color}70,transparent)` }} />

                  <div className="grid md:grid-cols-[220px_1fr] gap-0">

                    {/* ── Left: KPI panel ── */}
                    <div
                      className="relative flex flex-col justify-between p-8 overflow-hidden"
                      style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {/* Sparkline chart — decorative background */}
                      <div className="absolute bottom-0 left-0 right-0 h-28 opacity-80 pointer-events-none">
                        <Sparkline points={t.chartPoints} color={t.color} />
                      </div>

                      {/* Company badge */}
                      <div className="relative z-10">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base text-white mb-3"
                          style={{ background: `linear-gradient(135deg,${t.color}50,${t.color}25)`, border: `1px solid ${t.color}45` }}
                        >
                          {t.initials}
                        </div>
                        <p className="text-white font-bold text-sm">{t.company}</p>
                        <p className="text-white/35 text-[11px] font-mono mt-0.5">{t.sector}</p>
                      </div>

                      {/* Big KPI */}
                      <div className="relative z-10 mt-8">
                        <p
                          className="font-black leading-none tracking-tight"
                          style={{ fontSize: "clamp(2.8rem,6vw,3.8rem)", color: t.color }}
                        >
                          {t.kpi}
                        </p>
                        <p className="text-white/45 text-[11px] font-mono mt-2 leading-snug">{t.kpiLabel}</p>
                      </div>
                    </div>

                    {/* ── Right: Testimonial ── */}
                    <div className="flex flex-col justify-between p-8 md:p-10">
                      <div>
                        <Quote className="w-7 h-7 mb-5 text-white/15" />
                        <p className="text-white/85 text-lg md:text-xl font-medium leading-relaxed tracking-tight">
                          {t.quote}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg,${t.color},${t.color}80)` }}
                        >
                          {t.person.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{t.person}</p>
                          <p className="text-white/35 text-xs font-mono">{t.role} · {t.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="hidden md:flex w-12 h-12 rounded-full border border-white/12 bg-white/6 items-center justify-center text-white/50 hover:text-white hover:bg-white/12 hover:border-white/25 transition-all flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden justify-center gap-3 mt-5">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 active:scale-90 transition-transform">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 active:scale-90 transition-transform">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bullets / dots */}
        <div className="flex justify-center items-center gap-2 mt-7">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-300 hover:opacity-80"
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                backgroundColor: i === current ? item.color : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>

        {/* Auto-play progress */}
        <div className="mt-5 max-w-[180px] mx-auto h-px bg-white/5 rounded-full overflow-hidden">
          {!paused && (
            <motion.div
              key={current}
              className="h-full rounded-full"
              style={{ backgroundColor: t.color }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
