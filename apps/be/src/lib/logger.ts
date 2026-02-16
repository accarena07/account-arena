type LogLevel = "info" | "warn" | "error" | "debug";

type LogMeta = Record<string, unknown> | undefined;

const isProduction = process.env.NODE_ENV === "production";

const toLogError = (error: unknown) => {
  if (!error || typeof error !== "object") return error;

  const candidate = error as { message?: unknown; code?: unknown; status?: unknown; stack?: unknown };
  return {
    message: typeof candidate.message === "string" ? candidate.message : undefined,
    code: typeof candidate.code === "string" ? candidate.code : undefined,
    status: typeof candidate.status === "number" ? candidate.status : undefined,
    stack: !isProduction && typeof candidate.stack === "string" ? candidate.stack : undefined,
  };
};

const baseLog = (level: LogLevel, event: string, meta?: LogMeta) => {
  const payload = {
    level,
    event,
    timestamp: new Date().toISOString(),
    ...(meta ?? {}),
  };

  if (level === "error") {
    console.error(payload);
    return;
  }
  if (level === "warn") {
    console.warn(payload);
    return;
  }
  if (level === "debug") {
    if (!isProduction) console.debug(payload);
    return;
  }
  console.info(payload);
};

export const logInfo = (event: string, meta?: LogMeta) => {
  baseLog("info", event, meta);
};

export const logWarn = (event: string, meta?: LogMeta) => {
  baseLog("warn", event, meta);
};

export const logError = (event: string, error?: unknown, meta?: LogMeta) => {
  baseLog("error", event, {
    ...(meta ?? {}),
    error: toLogError(error),
  });
};

export const logDebug = (event: string, meta?: LogMeta) => {
  baseLog("debug", event, meta);
};

export const maskEmail = (email: string | null | undefined): string | null => {
  if (!email) return null;
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  if (localPart.length <= 2) return `${localPart[0] ?? "*"}***@${domain}`;
  return `${localPart.slice(0, 2)}***@${domain}`;
};
