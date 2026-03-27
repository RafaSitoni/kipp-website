"use client"

import { motion } from "framer-motion"
import { Code2, BarChart3, Layers, ShieldCheck } from "lucide-react"

// Founders data preserved — hidden, available for future use
const _founders = [
  {
    name: "Vinicius Paes Landim",
    role: "Cofundador · Growth, Estratégia de Vendas e Produto",
    icon: BarChart3,
    color: "#2563EB",
    initials: "VL",
    focus: "Aquisição & Conversão",
    bio: "Com formação em Engenharia Mecânica e experiência prática em vendas digitais e múltiplos modelos de negócio, desenvolveu uma visão aprofundada sobre aquisição, conversão e escalabilidade.",
    tags: ["Growth", "Vendas", "Conversão", "Produto", "Estratégia Digital"],
  },
  {
    name: "Victor Mota",
    role: "Cofundador · Growth, Estratégia de Vendas e Estruturação de Processos",
    icon: Layers,
    color: "#818CF8",
    initials: "VM",
    focus: "Eficiência & Escalabilidade",
    bio: "Com formação em Engenharia Mecânica e especialização em Lean Six Sigma, focado em eficiência operacional, eliminação de gargalos e escalabilidade.",
    tags: ["Processos", "Dados", "Performance", "Automação", "Escalabilidade"],
  },
  {
    name: "Rafaela Sitoni",
    role: "Cofundadora · Engenharia de Software e Arquitetura de Sistemas",
    icon: Code2,
    color: "#34D399",
    initials: "RS",
    focus: "Engenharia & Arquitetura de IA",
    bio: "Com formação em Engenharia de Software e foco em sistemas escaláveis e inteligentes, desenvolve infraestruturas que conectam canais, automatizam operações e sustentam o crescimento da plataforma.",
    tags: ["Software", "Arquitetura", "Integrações", "IA", "Escalabilidade"],
  },
]

const specialties = [
  { icon: Code2,    color: "#34D399", label: "Engenheiro de Software",        sub: "Arquitetura de sistemas escaláveis e IA" },
  { icon: BarChart3, color: "#2563EB", label: "Especialista em Growth & Vendas", sub: "Aquisição, conversão e funis digitais" },
  { icon: Layers,   color: "#818CF8", label: "Especialista em Operações",     sub: "Processos, Lean Six Sigma e escalabilidade" },
  { icon: ShieldCheck, color: "#F59E0B", label: "Especialista em Automação",  sub: "Fluxos inteligentes e integrações omnichannel" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export function FoundersSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden" id="founders">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.05),transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[#2563EB] text-[10px] tracking-[0.28em] uppercase mb-4">
            <span className="w-5 h-px bg-[#2563EB]/40" />
            QUEM FAZ A KIPP
            <span className="w-5 h-px bg-[#2563EB]/40" />
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">
            Especialistas focados em{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563EB 0%, #818CF8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              transformar seu atendimento com IA
            </span>
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
            A KIPP é construída por um time multidisciplinar que une{" "}
            <strong className="text-slate-700 font-semibold">engenharia de software</strong>,{" "}
            <strong className="text-slate-700 font-semibold">estratégia de vendas</strong>,{" "}
            <strong className="text-slate-700 font-semibold">operações enxutas</strong> e{" "}
            <strong className="text-slate-700 font-semibold">automação inteligente</strong> — tudo focado em escalar o seu negócio.
          </p>
        </motion.div>

        {/* Specialty pills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {specialties.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${s.color}12`, border: `1px solid ${s.color}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm leading-tight">{s.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">{s.sub}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom line */}
        <motion.p
          variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center text-slate-400 text-xs font-mono mt-10"
        >
          Um time completo. Uma única plataforma. Resultados reais.
        </motion.p>

      </div>
    </section>
  )
}
