"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

export function CTABanner() {
  return (
    <section className="relative py-8 px-6 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #060B18 0%, #0D1B3E 50%, #0A1228 100%)",
            boxShadow: "0 32px 80px rgba(6,11,24,0.5), 0 0 0 1px rgba(37,99,235,0.15)",
          }}
        >
          {/* Background glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#2563EB]/12 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-[#818CF8]/8 rounded-full blur-[80px] pointer-events-none" />

          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent" />

          <div className="relative z-10 px-8 md:px-16 py-14 md:py-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 text-center md:text-left">

            {/* Text block */}
            <div className="flex-1">
              <p className="font-mono text-[#60A5FA] text-[10px] tracking-[0.28em] uppercase mb-4">
                ESTRATÉGIA PERSONALIZADA
              </p>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                Sua empresa não é padrão,<br className="hidden md:block" />{" "}
                <span style={{
                  background: "linear-gradient(135deg, #60A5FA, #818CF8)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  por que sua automação seria?
                </span>
              </h2>
              <p className="text-white/40 text-sm font-mono leading-relaxed max-w-md">
                Em 30 minutos, mapeamos seus gargalos e mostramos exatamente como a IA pode transformar seu atendimento.
              </p>
            </div>

            {/* CTA block */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <motion.a
                href="#contato"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm text-white relative overflow-hidden group whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" }}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(37,99,235,0.6)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.45 }}
                />
                <Calendar className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Agendar Reunião de Diagnóstico</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <p className="text-white/25 text-[10px] font-mono text-center">
                Sem compromisso · 30 minutos · Online · Gratuito
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
