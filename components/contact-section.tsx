"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, User, Mail, Phone, Building2, MessageSquare, CheckCircle2, AlertCircle, Loader2, Clock } from "lucide-react"

/* ─────────────── Schema ─────────────── */
const schema = z.object({
  name:    z.string().min(2, "Nome obrigatório"),
  email:   z.string().email("E-mail inválido"),
  phone:   z.string().optional(),
  company: z.string().min(1, "Empresa obrigatória"),
  plan:    z.string().optional(),
  message: z.string().min(10, "Mensagem muito curta (mín. 10 caracteres)"),
})
type FormData = z.infer<typeof schema>

/* ─────────────── Input component ─────────────── */
function Field({
  icon: Icon, label, error, ...props
}: { icon: React.ElementType; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-mono text-white/50 tracking-widest uppercase">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
        <input
          {...props}
          className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:bg-white/8 ${
            error
              ? "border-red-500/40 focus:border-red-400"
              : "border-white/10 focus:border-[#2563EB]/60"
          }`}
        />
      </div>
      {error && <p className="text-red-400 text-[10px] font-mono">{error}</p>}
    </div>
  )
}

/* ─────────────── Component ─────────────── */
export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus("success")
        reset()
        setTimeout(() => setStatus("idle"), 6000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      id="contato"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060B18 0%, #0A1228 60%, #0D1B3E 100%)" }}
    >
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#818CF8]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[#60A5FA] text-[10px] tracking-[0.28em] uppercase mb-4">
            <span className="w-5 h-px bg-[#60A5FA]/40" />FALE COM A KIPP<span className="w-5 h-px bg-[#60A5FA]/40" />
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Agende sua{" "}
            <span style={{ background: "linear-gradient(135deg,#60A5FA,#818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Reunião de Diagnóstico Gratuita
            </span>
          </h2>
          <p className="text-white/40 text-sm font-mono max-w-lg mx-auto leading-relaxed mb-5">
            Em 30 minutos mapeamos seus gargalos e mostramos exatamente quanto a IA pode aumentar sua conversão. Sem enrolação, sem compromisso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-white font-black text-xl">Mensagem enviada!</h3>
                    <p className="text-white/50 text-sm font-mono max-w-xs">
                      Nossa equipe vai entrar em contato em breve. Obrigado pelo interesse!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field icon={User} label="Nome completo" placeholder="Seu nome" error={errors.name?.message} {...register("name")} />
                      <Field icon={Mail} label="E-mail" placeholder="seu@email.com" type="email" error={errors.email?.message} {...register("email")} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field icon={Phone} label="Telefone (opcional)" placeholder="(11) 99999-9999" {...register("phone")} />
                      <Field icon={Building2} label="Empresa" placeholder="Nome da empresa" error={errors.company?.message} {...register("company")} />
                    </div>

                    {/* Plan select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-white/50 tracking-widest uppercase">Plano de interesse</label>
                      <select
                        {...register("plan")}
                        className="w-full border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#2563EB]/60 transition-colors cursor-pointer"
                        style={{
                          background: "#0F1E3A",
                          borderColor: "rgba(255,255,255,0.10)",
                          colorScheme: "dark",
                        }}
                      >
                        <option value="" style={{ background: "#0F1E3A", color: "#94a3b8" }}>Selecione um plano...</option>
                        <option value="standard" style={{ background: "#0F1E3A", color: "#fff" }}>Standard</option>
                        <option value="professional" style={{ background: "#0F1E3A", color: "#fff" }}>Professional</option>
                        <option value="exclusive" style={{ background: "#0F1E3A", color: "#fff" }}>Exclusive (Enterprise)</option>
                        <option value="custom" style={{ background: "#0F1E3A", color: "#fff" }}>Ainda não sei — quero orientação</option>
                      </select>
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-white/50 tracking-widest uppercase">Mensagem</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/25 pointer-events-none" />
                        <textarea
                          {...register("message")}
                          rows={4}
                          placeholder="Conte um pouco sobre seu negócio e como podemos ajudar..."
                          className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none resize-none transition-all duration-200 focus:bg-white/8 ${
                            errors.message ? "border-red-500/40" : "border-white/10 focus:border-[#2563EB]/60"
                          }`}
                        />
                      </div>
                      {errors.message && <p className="text-red-400 text-[10px] font-mono">{errors.message.message}</p>}
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <p className="text-red-400 text-xs font-mono">Erro ao enviar. Tente novamente ou escreva para contato@aikipp.com</p>
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 rounded-full font-black text-sm text-white flex items-center justify-center gap-2.5 relative overflow-hidden group disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg,#2563EB 0%,#1E40AF 100%)" }}
                      whileHover={{ scale: status === "loading" ? 1 : 1.01, boxShadow: "0 8px 32px rgba(37,99,235,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.45 }} />
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                          <span className="relative z-10">Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">Solicitar Diagnóstico Gratuito</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Info panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {[
              { emoji: "⚡", title: "Resposta rápida", text: "Nossa equipe retorna em até 24h com uma proposta personalizada." },
              { emoji: "🎯", title: "Diagnóstico gratuito", text: "Analisamos sua operação atual e mapeamos onde a IA gera mais impacto." },
              { emoji: "🤝", title: "Suporte humano", text: "Além da IA, você tem uma equipe real ao seu lado na implantação." },
            ].map(({ emoji, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="flex gap-4 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{title}</p>
                  <p className="text-white/40 text-xs font-mono leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}


            <div
              className="p-5 rounded-2xl text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-white/40 text-[10px] font-mono mb-1.5 tracking-widest uppercase">Prefere e-mail direto?</p>
              <a href="mailto:contato@aikipp.com" className="text-[#60A5FA] font-bold text-sm hover:underline">
                contato@aikipp.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
