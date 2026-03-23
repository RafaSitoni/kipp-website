"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  Bot, Zap, BarChart3, MessageSquare,
  Clock, TrendingUp, Users, ShieldCheck,
  Workflow, Database, ArrowRight, Quote,
  CheckCircle2, Calendar, Send,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

// ── Block 2 Data ──────────────────────────────────────────────────────────────
const offerings = [
  {
    icon: MessageSquare,
    label: "Inbox Omnichannel",
    headline: "Centralize tudo.",
    desc: "WhatsApp, Instagram, E-mail e Chat respondidos de um único lugar — zero perda de mensagem.",
    featured: false,
  },
  {
    icon: Bot,
    label: "Agentes de IA",
    headline: "Respostas Instantâneas.",
    desc: "Atenda em <2 segundos e não perca o lead — 24 horas por dia, 7 dias por semana.",
    featured: true,
  },
  {
    icon: Workflow,
    label: "Automações",
    headline: "Follow-up automático.",
    desc: "Recupere leads, envie lembretes e mova o funil sem nenhum esforço manual.",
    featured: false,
  },
  {
    icon: Database,
    label: "CRM Integrado",
    headline: "Visão 360°.",
    desc: "Saiba exatamente onde está cada cliente e o que ele precisa para fechar.",
    featured: false,
  },
  {
    icon: BarChart3,
    label: "Análise com IA",
    headline: "Insights em tempo real.",
    desc: "Decisões baseadas em dados, não em achismo — relatórios e recomendações automáticas.",
    featured: true,
  },
  {
    icon: Zap,
    label: "Zero Espera",
    headline: "Qualifique e agende.",
    desc: "Leads pré-qualificados chegam ao seu time prontos para fechar. Sem etapas manuais.",
    featured: false,
  },
]

// ── Block 3 Data ──────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: Clock,
    color: "#2563EB",
    kpi: "24/7",
    title: "Atendimento que nunca dorme",
    text: "A IA responde seus clientes a qualquer hora — finais de semana, feriados e madrugadas — sem ninguém precisar estar online.",
    quote: "Nosso tempo de resposta caiu 80% logo na primeira semana.",
    author: "Carlos · Gerente de Operações",
  },
  {
    icon: TrendingUp,
    color: "#10B981",
    kpi: "+47%",
    title: "Mais conversão, menos esforço",
    text: "Leads qualificados automaticamente antes de chegar ao time humano. Seu time foca só no que importa: fechar.",
    quote: "Duplicamos o volume de atendimentos sem contratar ninguém novo.",
    author: "Ana · Diretora Comercial",
  },
  {
    icon: Users,
    color: "#818CF8",
    kpi: "100x",
    title: "Escale sem aumentar o time",
    text: "Atenda centenas de clientes simultâneos com o mesmo time atual. A IA absorve o volume sem degradar a qualidade.",
    quote: "Reduzimos nossa equipe de suporte em 30% e o NPS melhorou.",
    author: "Maria · Operações",
  },
  {
    icon: ShieldCheck,
    color: "#F59E0B",
    kpi: "48h",
    title: "IA do seu jeito, rápido",
    text: "Cada agente KIPP é treinado com as informações da sua empresa, tom de voz e processos internos. Pronto em 48 horas.",
    quote: "Em dois dias já estava respondendo melhor que nosso atendente.",
    author: "Lucas · CEO",
  },
]

const bullets = [
  { metric: "< 2s",  text: "Sua IA responde antes do cliente perder o interesse." },
  { metric: "+47%",  text: "Leads qualificados e convertidos sem intervenção manual." },
  { metric: "24/7",  text: "Atendimento ativo em feriados, finais de semana e madrugadas." },
]

const tags = ["IA Conversacional", "CRM Nativo", "Sem código", "Setup em 48h", "Suporte dedicado"]

// ── Chat Simulation ───────────────────────────────────────────────────────────
const timeSlots = [
  { time: "09:00", label: "Terça, 24/06", selected: true },
  { time: "10:30", label: "Terça, 24/06", selected: false },
  { time: "14:00", label: "Quarta, 25/06", selected: false },
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/50"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function ChatMessage({
  from,
  text,
  time,
  delay = 0,
}: {
  from: "lead" | "ai"
  text: string
  time: string
  delay?: number
}) {
  const isAI = from === "ai"
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1], delay }}
      className={`flex items-end gap-2 ${isAI ? "justify-start" : "justify-end"}`}
    >
      {isAI && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
          style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}>
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[78%] flex flex-col gap-1 ${isAI ? "items-start" : "items-end"}`}>
        <div
          className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
          style={isAI ? {
            background: "linear-gradient(135deg,#1E3A8A,#2563EB)",
            color: "#fff",
            borderBottomLeftRadius: 4,
          } : {
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.92)",
            borderBottomRightRadius: 4,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {text}
        </div>
        <span className="text-[10px] font-mono text-white/25 px-1">{time}</span>
      </div>
    </motion.div>
  )
}

function CalendarWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="flex items-end gap-2 justify-start"
    >
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
        style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}>
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="max-w-[82%]">
        <div
          className="rounded-2xl px-4 py-2.5 text-sm text-white mb-1"
          style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)", borderBottomLeftRadius: 4 }}
        >
          Perfeito! Aqui estão os horários disponíveis para amanhã 📅
        </div>

        {/* Calendar card */}
        <div
          className="rounded-2xl overflow-hidden mt-2"
          style={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <div className="px-4 pt-3 pb-2 flex items-center gap-2 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs font-black text-slate-800">Agendar Reunião de Diagnóstico</span>
          </div>
          <div className="px-3 py-2 flex flex-col gap-1">
            {timeSlots.map(({ time, label, selected }) => (
              <div
                key={time}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-colors"
                style={selected ? {
                  background: "linear-gradient(135deg,#EFF6FF,#DBEAFE)",
                  border: "1.5px solid #93C5FD",
                } : {
                  background: "transparent",
                  border: "1px solid transparent",
                }}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={selected ? {
                    background: "#2563EB",
                  } : {
                    background: "transparent",
                    border: "1.5px solid #CBD5E1",
                  }}
                >
                  {selected && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800">{time}</span>
                  <span className="text-[10px] text-slate-400 font-mono ml-1.5">{label}</span>
                </div>
                {selected && (
                  <span className="ml-auto text-[9px] font-black text-[#2563EB] uppercase tracking-wider">Selecionado</span>
                )}
              </div>
            ))}
          </div>
          <div className="px-3 pb-3">
            <div
              className="w-full py-2 rounded-xl text-center text-xs font-black text-white"
              style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}
            >
              ✓ Confirmar horário
            </div>
          </div>
        </div>
        <span className="text-[10px] font-mono text-white/25 px-1 mt-0.5 block">03:14</span>
      </div>
    </motion.div>
  )
}

function SystemNotification() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
      className="flex justify-center"
    >
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
        style={{
          background: "rgba(16,185,129,0.12)",
          border: "1px solid rgba(16,185,129,0.3)",
          color: "#34D399",
        }}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        João agendou reunião de diagnóstico — Terça às 09:00
      </div>
    </motion.div>
  )
}

function ChatSimulation() {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [cycle, setCycle] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  // once:true — fires exactly once when section enters viewport, never interrupted by scroll
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" })
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  const after = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  // Run sequence — re-runs each time `cycle` bumps (loop) or `isInView` first fires
  useEffect(() => {
    if (!isInView) return
    clearAll()
    setStep(0)
    setTyping(false)
    after(() => setStep(1), 500)
    after(() => setTyping(true), 1600)
    after(() => { setTyping(false); setStep(2) }, 3300)
    after(() => setStep(3), 4600)
    after(() => setTyping(true), 5600)
    after(() => { setTyping(false); setStep(4) }, 7400)
    after(() => setStep(5), 8700)
    // restart loop via cycle counter — does NOT depend on isInView
    after(() => setCycle(c => c + 1), 13500)
    return clearAll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, cycle])

  // Auto-scroll messages area whenever step or typing changes
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    })
  }, [step, typing])

  return (
    <div ref={ref}
      className="relative rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg,#060B18 0%,#0A1228 60%,#0D1B3E 100%)",
        border: "1px solid rgba(37,99,235,0.2)",
        boxShadow: "0 32px 80px rgba(6,11,24,0.5), 0 0 0 1px rgba(37,99,235,0.08)",
        height: 560,
      }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-[#2563EB]/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
        <div className="relative">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}>
            <Bot className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#060B18]" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-black tracking-tight">KIPP AI</p>
          <p className="text-emerald-400 text-[10px] font-mono">● Online agora · responde em &lt;2s</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>

        {/* Timestamp label */}
        <div className="flex justify-center">
          <span className="text-[10px] font-mono text-white/20 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            03:14 · Hoje
          </span>
        </div>

        {/* João msg 1 */}
        <AnimatePresence>
          {step >= 1 && (
            <ChatMessage
              from="lead"
              text="Oi, boa madrugada! Tenho uma clínica médica e quero melhorar meu atendimento. Vocês atendem esse segmento?"
              time="03:14"
            />
          )}
        </AnimatePresence>

        {/* AI typing indicator */}
        <AnimatePresence>
          {typing && step <= 2 && (
            <motion.div
              key="typing-1"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}>
                <Bot className="w-[14px] h-[14px] text-white" />
              </div>
              <div className="rounded-2xl" style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)", borderBottomLeftRadius: 4 }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* KIPP AI msg 1 */}
        <AnimatePresence>
          {step >= 2 && (
            <ChatMessage
              from="ai"
              text="Olá, João! 👋 Clínicas médicas são nossa especialidade. Já reduzimos o tempo de espera em 60% em parceiros da área. Posso agendar uma demonstração?"
              time="03:14"
            />
          )}
        </AnimatePresence>

        {/* João msg 2 */}
        <AnimatePresence>
          {step >= 3 && (
            <ChatMessage
              from="lead"
              text="Seria ótimo! Tenho horário disponível amanhã cedo."
              time="03:14"
            />
          )}
        </AnimatePresence>

        {/* AI typing 2 */}
        <AnimatePresence>
          {typing && step >= 3 && (
            <motion.div
              key="typing-2"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}>
                <Bot className="w-[14px] h-[14px] text-white" />
              </div>
              <div className="rounded-2xl" style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)", borderBottomLeftRadius: 4 }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* KIPP AI msg 2 + Calendar */}
        <AnimatePresence>
          {step >= 4 && <CalendarWidget />}
        </AnimatePresence>

        {/* System notification */}
        <AnimatePresence>
          {step >= 5 && <SystemNotification />}
        </AnimatePresence>

      </div>

      {/* Input bar (decorative) */}
      <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-3 flex items-center gap-3">
        <div
          className="flex-1 rounded-full px-4 py-2.5 text-xs text-white/20 font-mono"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          Digite uma mensagem...
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}
        >
          <Send className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <section id="sobre" className="relative bg-white overflow-hidden">

      {/* ══════════════════════════════════════════════════════════════
          BLOCK 1 — SOBRE A PLATAFORMA
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative py-28 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.06),transparent_55%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* ── Left column ── */}
            <div>
              <motion.span
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="inline-flex items-center gap-2 font-mono text-[#2563EB] text-[10px] tracking-[0.28em] uppercase mb-6"
              >
                <span className="w-5 h-px bg-[#2563EB]/40" />SOBRE A PLATAFORMA
              </motion.span>

              <motion.h2
                variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-10"
              >
                Sua operação mais inteligente,{" "}
                <span style={{
                  background: "linear-gradient(135deg,#2563EB 0%,#818CF8 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  sua conversão muito maior.
                </span>
              </motion.h2>

              {/* Bullet rows connected to metrics */}
              <div className="space-y-5 mb-12">
                {bullets.map(({ metric, text }, i) => (
                  <motion.div
                    key={metric}
                    custom={i + 2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="inline-flex items-center justify-center px-3 py-1 rounded-full font-black text-sm text-white flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)", minWidth: 56, textAlign: "center" }}
                    >
                      {metric}
                    </span>
                    <p className="text-slate-600 text-base leading-relaxed">{text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              <motion.div
                variants={fadeUp} custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest mb-3">Tecnologia por trás</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#2563EB]"
                      style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right column — Chat Simulation ── */}
            <motion.div
              variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <ChatSimulation />
            </motion.div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BLOCK 2 — O QUE A PLATAFORMA OFERECE
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative py-28 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(129,140,248,0.07),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[#2563EB] text-[10px] tracking-[0.28em] uppercase mb-4">
              <span className="w-5 h-px bg-[#2563EB]/40" />O QUE A PLATAFORMA OFERECE<span className="w-5 h-px bg-[#2563EB]/40" />
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Automatize as tarefas,{" "}
              <span style={{
                background: "linear-gradient(135deg,#2563EB,#818CF8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                foque na estratégia.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offerings.map(({ icon: Icon, label, headline, desc, featured }, i) => (
              <motion.div
                key={label}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                <motion.div
                  className="rounded-2xl p-7 border flex flex-col gap-4 h-full group cursor-default transition-all duration-300"
                  style={featured ? {
                    background: "linear-gradient(145deg, #1E3A8A 0%, #1E40AF 100%)",
                    border: "1px solid rgba(96,165,250,0.2)",
                    boxShadow: "0 8px 32px rgba(37,99,235,0.25)",
                  } : {
                    background: "#FFFFFF",
                    border: "1px solid rgba(226,232,240,0.9)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: featured
                      ? "0 20px 56px rgba(37,99,235,0.4)"
                      : "0 12px 40px rgba(0,0,0,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={featured ? {
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    } : {
                      background: "linear-gradient(135deg,rgba(37,99,235,0.10),rgba(37,99,235,0.05))",
                      border: "1px solid rgba(37,99,235,0.15)",
                    }}
                    whileHover={{ rotate: [0, -12, 14, -6, 0], scale: 1.15 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    <Icon className={featured ? "w-6 h-6 text-white" : "w-6 h-6 text-[#2563EB]"} />
                  </motion.div>

                  <div className="flex-1">
                    <p className={`font-black text-base mb-1 tracking-tight ${featured ? "text-white" : "text-slate-900"}`}>
                      {headline}
                    </p>
                    <p className={`text-xs font-mono uppercase tracking-wider mb-2 ${featured ? "text-blue-200/70" : "text-[#2563EB]/70"}`}>
                      {label}
                    </p>
                    <p className={`text-sm leading-relaxed ${featured ? "text-blue-100/80" : "text-slate-400"}`}>
                      {desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BLOCK 3 — O QUE A IA TRAZ  (Compact Case layout)
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.04),transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[#2563EB] text-[10px] tracking-[0.28em] uppercase mb-4">
              <span className="w-5 h-px bg-[#2563EB]/40" />O QUE A IA TRAZ<span className="w-5 h-px bg-[#2563EB]/40" />
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Resultados Reais{" "}
              <span style={{
                background: "linear-gradient(135deg,#2563EB,#818CF8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                do Mundo Real.
              </span>
            </h2>
            <p className="text-slate-400 text-sm font-mono max-w-md mx-auto mt-3">
              Números reais de clientes que já usam a KIPP AI no dia a dia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map(({ icon: Icon, color, kpi, title, text, quote, author }, i) => (
              <motion.div
                key={title}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                <motion.div
                  className="rounded-3xl border border-slate-100 bg-white overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }} />

                  <div className="p-8 flex gap-5 flex-1">
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}
                      >
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <div className="text-2xl font-black tracking-tight leading-none text-center" style={{ color }}>
                        {kpi}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <p className="font-black text-slate-900 text-base tracking-tight leading-tight">{title}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>

                  <div
                    className="px-8 py-4 border-t flex items-start gap-3"
                    style={{ borderColor: `${color}18`, backgroundColor: `${color}05` }}
                  >
                    <Quote className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-40" style={{ color }} />
                    <div>
                      <p className="text-sm text-slate-600 italic leading-snug">"{quote}"</p>
                      <p className="text-[11px] font-mono mt-1" style={{ color }}>— {author}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mt-14"
          >
            <a href="#contato">
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm text-white"
                style={{ background: "linear-gradient(135deg,#2563EB,#1E40AF)" }}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(37,99,235,0.55)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Quero esses resultados na minha empresa
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </a>
            <p className="text-slate-300 text-xs font-mono mt-3">Agende uma reunião de diagnóstico · Gratuito · 30 min</p>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
