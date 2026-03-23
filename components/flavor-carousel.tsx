"use client"

import type React from "react"

import { motion, AnimatePresence, useSpring } from "framer-motion"
import { useState, useEffect } from "react"
import { Cpu, LayoutDashboard, TrendingUp, Check, Rocket } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* ─────────────────────────── Types ─────────────────────────── */
type TooltipGroup = { items: string[] }

type ModuleTooltip = {
  title: string
  description: string
  groups: TooltipGroup[]
  limits?: string[]
  comingSoon?: boolean
}

type Module = {
  id: number
  name: string
  tagline: string
  description: string
  highlights: string[]
  icon: React.ElementType
  bgColor: string
  accentColor: string
  featured: boolean
  tooltip: ModuleTooltip
}

/* ─────────────────────────── Data ─────────────────────────── */
const modules: Module[] = [
  {
    id: 1,
    name: "KIPP Standard",
    tagline: "PLANO ESSENCIAL",
    description: "IA completa para estruturar atendimento e não perder leads.",
    highlights: ["Integração rápida", "Total controle técnico", "Escalável"],
    icon: Cpu,
    bgColor: "from-[#2563EB]/20 via-[#2563EB]/10 to-transparent",
    accentColor: "#2563EB",
    featured: false,
    tooltip: {
      title: "KIPP Standard",
      description: "IA completa para estruturar atendimento e não perder leads.",
      groups: [
        {
          items: [
            "IA responde automaticamente 24/7",
            "Qualificação inteligente de leads",
            "Agendamento automático",
            "Resumo antes do atendimento humano",
          ],
        },
        {
          items: [
            "Inbox omnichannel",
            "Gestão de contatos",
            "Organização de equipe",
            "Dashboard em tempo real",
          ],
        },
      ],
      limits: ["1 agente de IA", "até 5 usuários"],
    },
  },
  {
    id: 2,
    name: "KIPP Professional",
    tagline: "PLANO PROFISSIONAL",
    description: "Escale vendas com IA e automação avançada.",
    highlights: ["Atendimento centralizado", "CRM completo", "IA em tempo real"],
    icon: LayoutDashboard,
    bgColor: "from-[#1E40AF]/20 via-[#1E40AF]/10 to-transparent",
    accentColor: "#1E40AF",
    featured: false,
    tooltip: {
      title: "KIPP Professional",
      description: "Escale vendas com IA e automação avançada.",
      groups: [
        {
          items: [
            "Múltiplos agentes de IA",
            "Nutrição e recuperação de leads",
            "IA movendo clientes no funil",
          ],
        },
        {
          items: [
            "CRM completo (Kanban)",
            "Automações avançadas",
            "Supervisor de IA (otimização contínua)",
          ],
        },
        {
          items: [
            "Análise estratégica com IA",
            "Recomendações para aumentar conversão",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    name: "KIPP Sales AI",
    tagline: "PLANO PREMIUM",
    description: "IA de vendas completa para e-commerce, do atendimento até o acompanhamento do pedido.",
    highlights: ["Venda automática", "Upsell inteligente", "Acompanhamento de pedidos", "Foco em conversão"],
    icon: TrendingUp,
    bgColor: "from-[#0F172A]/30 via-[#1E40AF]/15 to-transparent",
    accentColor: "#0F172A",
    featured: true,
    tooltip: {
      title: "KIPP Sales AI",
      description: "Em breve",
      comingSoon: true,
      groups: [],
    },
  },
]

/* ─────────────────────────── Tooltip Content ─────────────────────────── */
function PlanTooltip({ tooltip }: { tooltip: ModuleTooltip }) {
  if (tooltip.comingSoon) {
    return (
      <div className="absolute inset-0 rounded-2xl z-30 flex flex-col items-center justify-center text-center p-5"
        style={{ background: "linear-gradient(160deg, #0B0F1A 0%, #0F172A 100%)" }}
      >
        <Rocket className="w-10 h-10 text-blue-400 mb-3" />
        <p className="text-white font-black text-lg tracking-tight">Em breve</p>
        <p className="text-white/50 text-xs mt-2 font-mono leading-relaxed max-w-[200px]">
          IA focada em conversão e crescimento avançado
        </p>
        <div className="mt-4 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10">
          <span className="text-blue-400 text-[10px] font-mono tracking-widest">AGUARDE</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="absolute inset-0 rounded-2xl z-30 flex flex-col overflow-y-auto p-4 gap-3"
      style={{ background: "linear-gradient(160deg, #0B0F1A 0%, #0F172A 100%)" }}
    >
      {/* Header */}
      <div className="flex-shrink-0">
        <p className="text-white font-black text-sm tracking-tight leading-tight">
          {tooltip.title}
        </p>
        <p className="text-white/40 text-[10px] font-mono mt-0.5 leading-snug">
          {tooltip.description}
        </p>
      </div>

      {/* Feature groups */}
      <div className="flex flex-col gap-2.5 flex-1">
        {tooltip.groups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && (
              <div className="w-full h-px bg-white/10 mb-2.5" />
            )}
            <div className="flex flex-col gap-1.5">
              {group.items.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-[2px]" />
                  <span className="text-white/75 text-[11px] font-mono leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Limits */}
      {tooltip.limits && tooltip.limits.length > 0 && (
        <div className="flex-shrink-0 pt-2.5 border-t border-white/10">
          <p className="text-white/30 text-[9px] font-mono tracking-[0.15em] mb-1.5 uppercase">
            Limites
          </p>
          {tooltip.limits.map((limit) => (
            <p key={limit} className="text-white/40 text-[10px] font-mono">
              • {limit}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── Slide variants ─────────────────────────── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -15 : 15,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  }),
}

/* ─────────────────────────── Component ─────────────────────────── */
export function FlavorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])
  const [iconHovered, setIconHovered] = useState(false)

  const currentModule = modules[currentIndex]

  // Reset hover when module changes
  useEffect(() => {
    setIconHovered(false)
  }, [currentIndex])

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(x * 5)
    rotateX.set(-y * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + modules.length) % modules.length
    setCurrentIndex(newIndex)
    setPage([page + newDirection, newDirection])
  }

  const ModuleIcon = currentModule.icon

  return (
    <section id="flavours" className="relative py-16 bg-white overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentModule.bgColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        key={currentModule.id}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="font-mono text-[#121212]/60 text-xs tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            NOSSOS SERVIÇOS
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-[#121212] tracking-tighter mt-2 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              ESCOLHA SEU{" "}
            </motion.span>
            <motion.span
              className="inline-block"
              style={{ color: currentModule.accentColor }}
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              SERVIÇO
            </motion.span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            {/* Prev button */}
            <motion.button
              onClick={() => paginate(-1)}
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentModule.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full max-w-3xl"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    border: currentModule.featured
                      ? `2px solid ${currentModule.accentColor}`
                      : "2px solid rgba(18,18,18,0.1)",
                    boxShadow: currentModule.featured
                      ? `0 8px 40px rgba(15,23,42,0.18), 0 0 0 1px ${currentModule.accentColor}30`
                      : undefined,
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Featured badge */}
                  {currentModule.featured && (
                    <motion.div
                      className="absolute top-4 right-4 z-20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white uppercase"
                        style={{ backgroundColor: currentModule.accentColor }}
                      >
                        MAIS POPULAR
                      </span>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 items-center">

                    {/* ── Icon area (hover trigger) ── */}
                    <div
                      className="relative aspect-[3/4] flex items-center justify-center cursor-pointer select-none"
                      onMouseEnter={() => setIconHovered(true)}
                      onMouseLeave={() => setIconHovered(false)}
                      onClick={() => setIconHovered((v) => !v)}
                    >
                      {/* Icon background */}
                      <div
                        className="w-full h-full rounded-2xl flex items-center justify-center transition-opacity duration-200"
                        style={{
                          backgroundColor: `${currentModule.accentColor}10`,
                          border: `2px solid ${currentModule.accentColor}20`,
                          opacity: iconHovered ? 0.3 : 1,
                        }}
                      >
                        <ModuleIcon
                          className="w-24 h-24"
                          style={{ color: currentModule.accentColor }}
                        />
                      </div>

                      {/* Hint label — visible when NOT hovered */}
                      <AnimatePresence>
                        {!iconHovered && (
                          <motion.div
                            key="hint"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.18 }}
                            className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none"
                          >
                            <span
                              className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase"
                              style={{
                                background: `${currentModule.accentColor}18`,
                                color: currentModule.accentColor,
                                border: `1px solid ${currentModule.accentColor}30`,
                              }}
                            >
                              ver detalhes
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Tooltip overlay ── */}
                      <AnimatePresence>
                        {iconHovered && (
                          <motion.div
                            key="tooltip"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute inset-0 rounded-2xl z-30"
                            style={{
                              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                            }}
                          >
                            <PlanTooltip tooltip={currentModule.tooltip} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Right column: plan info ── */}
                    <div className="space-y-4">
                      <div>
                        <motion.span
                          className="font-mono text-xs tracking-widest"
                          style={{ color: currentModule.accentColor }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentModule.tagline}
                        </motion.span>
                        <motion.h3
                          className="text-3xl md:text-4xl font-black tracking-tighter mt-1"
                          style={{
                            color: currentModule.featured ? currentModule.accentColor : "#121212",
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                        >
                          {currentModule.name}
                        </motion.h3>
                      </div>

                      <motion.p
                        className="text-sm text-[#121212]/60 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentModule.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentModule.highlights.map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-1 rounded-full text-xs font-mono"
                            style={{
                              backgroundColor: `${currentModule.accentColor}12`,
                              color: currentModule.accentColor,
                              border: `1px solid ${currentModule.accentColor}30`,
                            }}
                          >
                            {badge}
                          </span>
                        ))}
                      </motion.div>

                      <motion.button
                        className="px-6 py-3 rounded-full font-bold text-sm tracking-wide w-full md:w-auto relative overflow-hidden text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        style={{ backgroundColor: currentModule.accentColor }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10">Ver serviço</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            <motion.button
              onClick={() => paginate(1)}
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Mobile nav buttons */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {modules.map((mod, index) => (
              <motion.button
                key={mod.id}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1
                  setCurrentIndex(index)
                  setPage([index, newDirection])
                }}
                className="h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentIndex ? mod.accentColor : "#12121220",
                }}
                animate={{ width: index === currentIndex ? 28 : 10 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
