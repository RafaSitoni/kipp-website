"use client"

import { motion } from "framer-motion"
import { Check, X, Sparkles, Calendar } from "lucide-react"

/* ─────────────── Feature lists ─────────────── */
const standardIncludes = [
  "Atendimento com IA 24/7",
  "Inbox omnichannel",
  "Dashboard em tempo real",
  "Gestão de contatos",
  "Qualificação inteligente de leads",
  "Agendamento automático",
  "Resumos antes do atendimento humano",
]
const standardExcludes = [
  "Recuperação de leads",
  "Automações avançadas",
  "CRM completo (Kanban)",
  "Análise estratégica com IA",
  "Integrações enterprise",
]

const proIncludes = [
  "Atendimento com IA 24/7",
  "Inbox omnichannel",
  "Dashboard em tempo real",
  "Gestão de contatos",
  "Qualificação inteligente de leads",
  "Agendamento automático",
  "Resumos antes do atendimento humano",
  "Recuperação de leads",
  "Automações avançadas",
  "CRM completo (Kanban)",
  "Análise estratégica com IA",
]
const proExcludes = ["Integrações enterprise", "SLA & suporte dedicado"]

const exclusiveIncludes = [
  "Atendimento com IA 24/7",
  "Inbox omnichannel",
  "Dashboard em tempo real",
  "Gestão de contatos",
  "Qualificação inteligente de leads",
  "Agendamento automático",
  "Resumos antes do atendimento humano",
  "Recuperação de leads avançada",
  "Automações ilimitadas",
  "CRM Enterprise (Kanban + Pipeline)",
  "Análise estratégica com IA",
  "Integrações enterprise (API própria)",
  "SLA & suporte dedicado",
  "Agentes de IA ilimitados",
  "Onboarding e implantação dedicados",
  "Relatórios e dashboards personalizados",
]

/* ─────────────── Animation ─────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

/* ─────────────── Feature Row ─────────────── */
function FeatureRow({ text, included, inverted }: { text: string; included: boolean; inverted?: boolean }) {
  return (
    <li className="flex items-center gap-2.5 py-1.5">
      {included ? (
        <span className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${inverted ? "bg-white/20" : "bg-emerald-500/15"}`}>
          <Check className={`w-2.5 h-2.5 ${inverted ? "text-white" : "text-emerald-500"}`} strokeWidth={3} />
        </span>
      ) : (
        <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center bg-white/5">
          <X className={`w-2.5 h-2.5 ${inverted ? "text-white/25" : "text-slate-300"}`} strokeWidth={2.5} />
        </span>
      )}
      <span className={`text-xs leading-snug ${included ? (inverted ? "text-white/90" : "text-slate-700") : (inverted ? "text-white/30" : "text-slate-300")}`}>
        {text}
      </span>
    </li>
  )
}

/* ─────────────── Component ─────────────── */
export function PlansComparison() {
  return (
    <section id="planos" className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#2563EB]/4 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#7C3AED]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 font-mono text-[#2563EB] text-[10px] tracking-[0.28em] uppercase mb-4">
            <span className="w-5 h-px bg-[#2563EB]/40" />COMPARE OS PLANOS<span className="w-5 h-px bg-[#2563EB]/40" />
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Escolha a estrutura ideal{" "}
            <span style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              para o seu momento
            </span>
          </h2>
          <p className="text-slate-400 text-sm font-mono max-w-md mx-auto">
            Todos os planos incluem IA de alta qualidade. A diferença está no nível de automação e escala.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

          {/* ── Standard ── */}
          <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7 flex flex-col h-full">
              <div className="mb-6">
                <p className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase mb-1.5">ENTRADA</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Standard</h3>
                <p className="text-xs text-slate-400 font-mono mt-1.5 leading-relaxed">
                  IA completa para estruturar atendimento e não perder leads.
                </p>
              </div>

              <ul className="flex flex-col mb-6 flex-1">
                {standardIncludes.map(f => <FeatureRow key={f} text={f} included />)}
                {standardExcludes.map(f => <FeatureRow key={f} text={f} included={false} />)}
              </ul>

              <a
                href="#contato"
                className="w-full py-3 rounded-full border-2 border-slate-900 text-slate-900 font-bold text-sm text-center hover:bg-slate-900 hover:text-white transition-colors duration-200 block"
              >
                <span className="flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Agendar Diagnóstico Gratuito
                </span>
              </a>
            </div>
          </motion.div>

          {/* ── Professional (highlighted) ── */}
          <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
            {/* Floating "Recomendado" tab above card */}
            <div className="flex justify-center mb-[-1px] relative z-20">
              <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-t-xl text-[10px] font-black tracking-[0.18em] uppercase text-white"
                style={{ background: "linear-gradient(90deg, #2563EB, #1E40AF)" }}>
                <Sparkles className="w-3 h-3" /> Recomendado
              </span>
            </div>
            <div
              className="rounded-3xl p-7 flex flex-col h-full relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #1E3A8A 0%, #2563EB 100%)",
                boxShadow: "0 32px 80px rgba(37,99,235,0.55), 0 0 0 2px rgba(96,165,250,0.5)",
              }}
            >
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] h-[100px] bg-white/15 rounded-full blur-[50px] pointer-events-none" />
              {/* Bottom glow */}
              <div className="absolute bottom-0 right-0 w-[160px] h-[120px] bg-[#93C5FD]/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="mb-6 relative z-10">
                <p className="text-[10px] font-mono tracking-[0.2em] text-blue-200 uppercase mb-1.5">PROFISSIONAL</p>
                <h3 className="text-2xl font-black text-white tracking-tight">Professional</h3>
                <p className="text-xs text-blue-200/80 font-mono mt-1.5 leading-relaxed">
                  Escale vendas com IA, CRM e automação avançada.
                </p>
              </div>

              <ul className="flex flex-col mb-6 flex-1 relative z-10">
                {proIncludes.map(f => <FeatureRow key={f} text={f} included inverted />)}
                {proExcludes.map(f => <FeatureRow key={f} text={f} included={false} inverted />)}
              </ul>

              <a
                href="#contato"
                className="relative z-10 w-full py-3 rounded-full bg-white text-[#1E3A8A] font-black text-sm text-center hover:bg-blue-50 transition-colors duration-200 block shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Agendar Minha Reunião
                </span>
              </a>
            </div>
          </motion.div>

          {/* ── Exclusive ── */}
          <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div
              className="rounded-3xl p-7 flex flex-col h-full relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #0F0A2A 0%, #1A1040 100%)",
                border: "1px solid rgba(129,140,248,0.25)",
                boxShadow: "0 8px 32px rgba(129,140,248,0.12)",
              }}
            >
              {/* Badge */}
              <div className="absolute top-5 right-5">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase text-indigo-300"
                  style={{ background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.3)" }}>
                  Enterprise
                </span>
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-mono tracking-[0.2em] text-indigo-400/60 uppercase mb-1.5">HIGH-END</p>
                <h3 className="text-2xl font-black text-white tracking-tight">Exclusive</h3>
                <p className="text-xs text-indigo-300/60 font-mono mt-1.5 leading-relaxed">
                  Operação completa de IA, sob medida para o seu negócio.
                </p>
              </div>

              <ul className="flex flex-col mb-6 flex-1">
                {exclusiveIncludes.map(f => (
                  <li key={f} className="flex items-center gap-2.5 py-1.5">
                    <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(129,140,248,0.2)" }}>
                      <Check className="w-2.5 h-2.5 text-indigo-400" strokeWidth={3} />
                    </span>
                    <span className="text-xs text-white/70 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className="w-full py-3 rounded-full font-black text-sm text-center block transition-all duration-200 hover:bg-indigo-400/10"
                style={{ background: "transparent", border: "1.5px solid rgba(129,140,248,0.55)", color: "#a5b4fc" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Agendar com Especialista
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center text-slate-400 text-[11px] font-mono mt-10">
          Todos os planos incluem análise com os especialistas da KIPP para garantir a melhor estrutura para o seu negócio. Sem pegadinhas, sem surpresas.
        </motion.p>
      </div>
    </section>
  )
}
