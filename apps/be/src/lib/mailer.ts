const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;
const MAILER_TIMEOUT_MS = process.env.MAILER_TIMEOUT_MS
  ? Number(process.env.MAILER_TIMEOUT_MS)
  : 12000;

let transporter: any = null;

function getRequiredEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`[mailer] Missing required env: ${name}`);
  }
  return value;
}

async function getTransporter() {
  if (transporter) return transporter;

  const nodemailer = await import("nodemailer");
  transporter = nodemailer.default.createTransport({
    host: getRequiredEnv("SMTP_HOST", SMTP_HOST),
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: getRequiredEnv("SMTP_USER", SMTP_USER),
      pass: getRequiredEnv("SMTP_PASS", SMTP_PASS),
    },
  });

  return transporter;
}

export function hasMailerEnv() {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_FROM);
}

export async function sendRegisterOtpEmail(params: {
  to: string;
  otp: string;
  expiresInMin: number;
}) {
  const tx = await getTransporter();
  const from = getRequiredEnv("SMTP_FROM", SMTP_FROM);

  const sendMailPromise = tx.sendMail({
    from,
    to: params.to,
    subject: "Kode OTP Registrasi Account Arena",
    text: `Kode OTP registrasi Anda adalah ${params.otp}. Berlaku ${params.expiresInMin} menit.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0f172a;">
        <h2 style="margin:0 0 12px;">Verifikasi Registrasi</h2>
        <p style="margin:0 0 8px;">Gunakan kode OTP berikut untuk menyelesaikan registrasi:</p>
        <div style="font-size:28px; font-weight:700; letter-spacing:6px; margin:12px 0; color:#1d4ed8;">
          ${params.otp}
        </div>
        <p style="margin:0 0 8px;">Kode berlaku selama ${params.expiresInMin} menit.</p>
        <p style="margin:0;">Jika Anda tidak merasa melakukan registrasi, abaikan email ini.</p>
      </div>
    `,
  });

  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutErr = new Error("Mail send timeout");
    (timeoutErr as Error & { code?: string }).code = "MAIL_SEND_TIMEOUT";
    setTimeout(() => reject(timeoutErr), MAILER_TIMEOUT_MS);
  });

  await Promise.race([sendMailPromise, timeoutPromise]);
}

export async function sendPasswordResetOtpEmail(params: {
  to: string;
  otp: string;
  expiresInMin: number;
}) {
  const tx = await getTransporter();
  const from = getRequiredEnv("SMTP_FROM", SMTP_FROM);

  const sendMailPromise = tx.sendMail({
    from,
    to: params.to,
    subject: "Kode OTP Reset Password Account Arena",
    text: `Kode OTP reset password Anda adalah ${params.otp}. Berlaku ${params.expiresInMin} menit.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0f172a;">
        <h2 style="margin:0 0 12px;">Reset Password</h2>
        <p style="margin:0 0 8px;">Gunakan kode OTP berikut untuk reset password akun Anda:</p>
        <div style="font-size:28px; font-weight:700; letter-spacing:6px; margin:12px 0; color:#1d4ed8;">
          ${params.otp}
        </div>
        <p style="margin:0 0 8px;">Kode berlaku selama ${params.expiresInMin} menit.</p>
        <p style="margin:0;">Jika Anda tidak merasa meminta reset password, abaikan email ini.</p>
      </div>
    `,
  });

  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutErr = new Error("Mail send timeout");
    (timeoutErr as Error & { code?: string }).code = "MAIL_SEND_TIMEOUT";
    setTimeout(() => reject(timeoutErr), MAILER_TIMEOUT_MS);
  });

  await Promise.race([sendMailPromise, timeoutPromise]);
}
