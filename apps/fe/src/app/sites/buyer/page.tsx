"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { apiFetch } from "@/lib/apiClient";
import { EchoResponseSchema, HealthSchema } from "@acme/shared";

export default function HomePage() {
  const [health, setHealth] = useState<z.infer<typeof HealthSchema> | null>(null);
  const [echo, setEcho] = useState<z.infer<typeof EchoResponseSchema> | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Halo dari FE 👋");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/health", undefined, HealthSchema)
      .then(setHealth)
      .catch((e: any) => setErr(e?.message ?? "Gagal load health"));
  }, []);

  async function doEcho() {
    setLoading(true);
    setErr(null);
    try {
      const data = await apiFetch(
        "/api/v1/echo",
        { method: "POST", body: JSON.stringify({ message }) },
        EchoResponseSchema
      );
      setEcho(data);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal echo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">FE + BE Next.js Boilerplate</h1>
        <p className="text-sm text-zinc-600">
          FE memanggil BE via <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono">NEXT_PUBLIC_API_BASE_URL</code>.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 p-5 shadow-sm">
        <h2 className="text-lg font-medium">Health check (BE)</h2>
        {health ? (
          <div className="mt-3 grid gap-2 text-sm">
            <div>
              <span className="font-mono text-zinc-500">service</span>: {health.service}
            </div>
            <div>
              <span className="font-mono text-zinc-500">time</span>: {health.time}
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-zinc-600">Loading…</p>
        )}
      </section>

      <section className="rounded-2xl border border-zinc-200 p-5 shadow-sm">
        <h2 className="text-lg font-medium">POST /api/v1/echo</h2>

        <div className="mt-3 flex flex-col gap-3">
          <input
            className="w-full rounded-xl border border-zinc-200 px-4 py-2 outline-none focus:ring"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis pesan…"
          />
          <button
            className="inline-flex w-fit items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            onClick={doEcho}
            disabled={loading}
          >
            {loading ? "Mengirim…" : "Kirim"}
          </button>

          {echo ? (
            <div className="rounded-xl bg-zinc-50 p-3 text-sm">
              <div className="text-zinc-500">Response:</div>
              <div className="mt-1 font-mono">{echo.echo}</div>
            </div>
          ) : null}

          {err ? (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
