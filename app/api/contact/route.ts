import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, plan, message } = await req.json()

    // Validate required fields
    if (!name || !email || !company || !message) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 })
    }

    // Configure transporter (works with common providers like Hostinger)
    const smtpPort = Number(process.env.SMTP_PORT) || 587
    const smtpSecure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : smtpPort === 465

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const planLabel: Record<string, string> = {
      standard:     "Standard",
      professional: "Professional",
      exclusive:    "Exclusive (Enterprise)",
      custom:       "Ainda não definido — quer orientação",
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 24px; }
            .card { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #1E3A8A, #2563EB); padding: 28px 32px; }
            .header h1 { color: #fff; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.5px; }
            .header p { color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px; font-family: monospace; }
            .body { padding: 28px 32px; }
            .field { margin-bottom: 18px; }
            .label { font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 4px; }
            .value { font-size: 15px; color: #0f172a; font-weight: 600; }
            .divider { height: 1px; background: #f1f5f9; margin: 20px 0; }
            .message-box { background: #f8fafc; border-radius: 10px; padding: 16px; margin-top: 8px; }
            .message-text { font-size: 14px; color: #334155; line-height: 1.7; white-space: pre-wrap; }
            .footer { background: #f8fafc; padding: 16px 32px; text-align: center; font-size: 11px; color: #94a3b8; font-family: monospace; }
            .badge { display: inline-block; padding: 3px 10px; background: #EFF6FF; color: #2563EB; border-radius: 999px; font-size: 11px; font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>Novo contato — KIPP AI</h1>
              <p>${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Nome</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">E-mail</div>
                <div class="value"><a href="mailto:${email}" style="color:#2563EB">${email}</a></div>
              </div>
              ${phone ? `<div class="field"><div class="label">Telefone</div><div class="value">${phone}</div></div>` : ""}
              <div class="field">
                <div class="label">Empresa</div>
                <div class="value">${company}</div>
              </div>
              <div class="field">
                <div class="label">Plano de interesse</div>
                <div class="value"><span class="badge">${plan ? planLabel[plan] ?? plan : "Não informado"}</span></div>
              </div>
              <div class="divider"></div>
              <div class="field">
                <div class="label">Mensagem</div>
                <div class="message-box">
                  <div class="message-text">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                </div>
              </div>
            </div>
            <div class="footer">KIPP AI · Sistema de contato do site · contato@aikipp.com</div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: `"KIPP AI Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || "contato@aikipp.com",
      replyTo: email,
      subject: `[KIPP AI] Novo contato — ${name} · ${company}`,
      html: emailHtml,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact API]", err)
    return NextResponse.json({ error: "Falha ao enviar e-mail" }, { status: 500 })
  }
}
