import Image from "next/image";
import Breadcrumb from "../../components/Breadcrumb";
import BuyerFooter from "../../components/BuyerFooter";
import BuyerHeader from "../../components/BuyerHeader";
import PaymentSummaryCard from "../../components/PaymentSummaryCard";
import PaymentMethodCard from "../../components/PaymentMethodCard";
import StatusBadge from "../../components/StatusBadge";
import SupportHelpCard from "../../components/SupportHelpCard";
import TransactionProgressStepper from "../../components/TransactionProgressStepper";

export default function BuyerTransactionInProgressPage() {
  return (
    <div className="min-h-screen bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <BuyerHeader isLoggedIn searchPlaceholder="Search for game accounts..." />

      <main className="mx-auto max-w-300 px-4 py-8 md:px-6">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Home", href: "/" },
            { label: "Daftar Transaksi", href: "/transactions" },
            { label: "TRX-9921048821" },
          ]}
        />

        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-700 md:flex-row md:items-center md:p-8">
            <div>
              <h1 className="mb-1 text-2xl font-extrabold">Detail Transaksi</h1>
              <p className="font-medium text-slate-500 dark:text-slate-400">
                Order ID: <span className="font-bold text-primary">TRX-9921048821</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge className="rounded-full px-4 py-2 text-sm" label="Sedang Diproses" showPing variant="in_progress" />
              <span className="text-sm font-medium text-slate-400 dark:text-slate-500">Dipesan pada 24 Okt 2023, 14:20</span>
            </div>
          </div>

          <div className="bg-slate-50/50 px-8 py-10 dark:bg-slate-900/50">
            <TransactionProgressStepper middleLabel="Sedang Diproses" state="in_progress" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">account_box</span>
                <h2 className="text-lg font-bold">Ringkasan Akun</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl md:w-48">
                    <Image
                      alt="Account Preview"
                      className="h-full w-full object-cover"
                      height={128}
                      src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80"
                      width={192}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-1 text-[10px] font-extrabold text-primary uppercase">Radiant Tier</span>
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Valorant • Asia Pacific</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Radiant Rank Account - 150+ Skins, Full Access Email</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      Akun premium dengan inventory melimpah, termasuk skin limited edition dan bundle eksklusif. Full
                      access dengan email pertama (OGE).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
              <div className="flex items-center gap-2 border-b border-slate-100 p-6 dark:border-slate-700">
                <span className="material-symbols-outlined text-primary">assignment</span>
                <h2 className="text-lg font-bold">Instruksi Serah Terima</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    ["1", "Verifikasi Pembayaran", "Pembayaran Anda telah kami terima dan sedang dalam proses verifikasi keamanan."],
                    [
                      "2",
                      "Hubungi Admin/Middleman",
                      "Silahkan hubungi admin via WhatsApp untuk memulai proses pergantian data akun. Admin akan memandu proses ini.",
                    ],
                    [
                      "3",
                      "Konfirmasi Penerimaan",
                      'Setelah data berhasil dipindahkan, tekan tombol "Pesanan Selesai" untuk melepaskan dana ke penjual.',
                    ],
                  ].map(([step, title, desc]) => (
                    <div className="flex gap-4" key={step}>
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${step === "3" ? "bg-slate-100 text-slate-400 dark:bg-slate-700" : "bg-slate-100 text-primary dark:bg-slate-700"}`}>
                        {step}
                      </div>
                      <div>
                        <h4 className="mb-1 font-bold">{title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                        {step === "2" ? (
                          <button className="mt-4 flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white transition-all hover:brightness-110" type="button">
                            <span className="material-symbols-outlined">chat</span>
                            Hubungi Admin via WhatsApp
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/20">
                <span className="material-symbols-outlined shrink-0 text-blue-600">info</span>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Jangan pernah membagikan kode OTP atau data login sebelum admin menginstruksikan. Kami tidak akan
                  pernah meminta password Anda di luar proses resmi.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <PaymentSummaryCard
              rows={[
                { label: "Harga Akun", value: "Rp 1.250.000" },
                { label: "Service Fee", value: "Rp 12.500" },
                { label: "Kode Unik", value: "+ Rp 312", valueClassName: "text-secondary" },
              ]}
              totalValue="Rp 1.262.812"
            />

            <PaymentMethodCard
              accountNumber="8077 0895 2210 12"
              methodName="BCA Virtual Account"
              methodSubtitle="Otomatis Terverifikasi"
            />

            <SupportHelpCard description="Tim support kami tersedia 24/7 untuk membantu kendala transaksi Anda." />
          </div>
        </div>
      </main>

      <BuyerFooter />
    </div>
  );
}
