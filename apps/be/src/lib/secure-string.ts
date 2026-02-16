import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

const ALGO = "aes-256-gcm";
const OTP_ENCRYPTION_KEY_MISSING = "OTP_ENCRYPTION_KEY_MISSING";

function createOtpEncryptionKeyMissingError(): Error & { code: string } {
  const error = new Error("OTP encryption key is missing") as Error & { code: string };
  error.code = OTP_ENCRYPTION_KEY_MISSING;
  return error;
}

function getKey(): Buffer {
  const material = process.env.OTP_ENCRYPTION_KEY;
  if (!material) {
    throw createOtpEncryptionKeyMissingError();
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
