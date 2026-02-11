import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

const ALGO = "aes-256-gcm";

function getKey(): Buffer {
  const fromEnv = process.env.OTP_ENCRYPTION_KEY ?? process.env.SUPABASE_SECRET_KEY;
  const fallback = process.env.NODE_ENV !== "production" ? "dev-otp-encryption-key" : "";
  const material = fromEnv || fallback;

  if (!material) {
    throw new Error("OTP_ENCRYPTION_KEY is required in production");
  }

  return createHash("sha256").update(material).digest();
}

export function encryptString(value: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptString(value: string): string {
  const parts = value.split(":");
  if (parts.length !== 3) {
    // Backward-compat for old plain rows.
    return value;
  }

  const [ivB64, authTagB64, encryptedB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const authTag = Buffer.from(authTagB64, "base64");
  const encrypted = Buffer.from(encryptedB64, "base64");

  const decipher = createDecipheriv(ALGO, getKey(), iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}

