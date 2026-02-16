const normalizeIp = (raw: string): string | null => {
  const value = raw.trim();
  if (!value) return null;
  if (value === "::1") return "127.0.0.1";
  if (value.startsWith("::ffff:")) return value.slice(7);
  return value;
};

export const getClientIp = (req: Request): string => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  console.log(forwardedFor, 'iniip');
  if (forwardedFor) {
    const candidate = forwardedFor.split(",")[0];
    const normalized = normalizeIp(candidate);
    if (normalized) return normalized;
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    const normalized = normalizeIp(realIp);
    if (normalized) return normalized;
  }

  return "0.0.0.0";
};
