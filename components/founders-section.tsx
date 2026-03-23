"use client"

import { motion } from "framer-motion"
import { Code2, BarChart3, Layers } from "lucide-react"

const founders = [
  {
    name: "Vinicius Paes Landim",
    role: "Cofundador · Growth, Estratégia de Vendas e Produto",
    icon: BarChart3,
    color: "#2563EB",
    initials: "VL",
    focus: "Aquisição & Conversão",
    bio: "Com formação em Engenharia Mecânica e experiência prática em vendas digitais e múltiplos modelos de negócio, desenvolveu uma visão aprofundada sobre aquisição, conversão e escalabilidade. Hoje, aplica esse conhecimento na KIPP, criando soluções com IA que aumentam conversão, padronizam processos e escalam resultados.",
    tags: ["Growth", "Vendas", "Conversão", "Produto", "Estratégia Digital"],
  },
  {
    name: "Victor Mota",
    role: "Cofundador · Growth, Estratégia de Vendas e Estruturação de Processos",
    icon: Layers,
    color: "#818CF8",
    initials: "VM",
    focus: "Eficiência & Escalabilidade",
    bio: "Com formação em Engenharia Mecânica e especialização em Lean Six Sigma, desenvolveu uma visão focada em eficiência operacional, eliminação de gargalos e escalabilidade. Sua atuação integra análise de dados, tráfego pago e automação para transformar demanda em vendas de forma consistente.",
    tags: ["Processos", "Dados", "Performance", "Automação", "Escalabilidade"],
  },
  {
    name: "Rafaela Sitoni",
    role: "Cofundadora · Engenharia de Software e Arquitetura de Sistemas",
    icon: Code2,
    color: "#34D399",
    initials: "RS",
    focus: "Engenharia & Arquitetura de IA",
    bio: "Com formação em Engenharia de Software e foco em sistemas escaláveis e inteligentes, desenvolve infraestruturas que conectam canais, automatizam operações e sustentam o crescimento da plataforma. Lidera o desenvolvimento de soluções com IA que simplificam processos e viabilizam escala com consistência.",
    tags: ["Software", "Arquitetura", "Integrações", "IA", "Escalabilidade"],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export function FoundersSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden" id="founders">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.05),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(129,140,248,0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[#2563EB] text-[10px] tracking-[0.28em] uppercase mb-4">
            <span className="w-5 h-px bg-[#2563EB]/40" />
            QUEM FAZ A KIPP
            <span className="w-5 h-px bg-[#2563EB]/40" />
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Especialistas focados em{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563EB 0%, #818CF8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              transformar seu atendimento com IA
            </span>
          </h2>
          <p className="text-slate-400 text-sm font-mono max-w-lg mx-auto leading-relaxed">
            A KIPP nasceu da união de especialistas em vendas, operações e engenharia — focados em um único objetivo: escalar o seu negócio com IA.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {founders.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.name}
                variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="h-full"
              >
                <motion.div
                  className="relative h-full rounded-3xl p-8 bg-white border border-slate-100 shadow-sm hover:shadow-xl group transition-all duration-300 flex flex-col"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Top color bar */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
                  />

                  {/* Avatar + Name row */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-lg flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${f.color} 0%, ${f.color}90 100%)` }}
                    >
                      {f.initials}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-base tracking-tight leading-tight">{f.name}</p>
                      <p className="text-[11px] font-mono mt-0.5 leading-snug" style={{ color: f.color }}>{f.role}</p>
                    </div>
                  </div>

                  {/* Focus pill */}
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${f.color}12`, border: `1px solid ${f.color}25` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: f.color }} />
                    </div>
                    <span
                      className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${f.color}10`, color: f.color, border: `1px solid ${f.color}20` }}
                    >
                      {f.focus}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">
                    {f.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                        style={{
                          backgroundColor: `${f.color}08`,
                          color: `${f.color}cc`,
                          border: `1px solid ${f.color}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
