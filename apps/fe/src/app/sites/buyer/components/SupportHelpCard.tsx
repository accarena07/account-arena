type SupportHelpCardProps = {
  title?: string;
  description: string;
  buttonLabel?: string;
};

export default function SupportHelpCard({
  title = "Butuh Bantuan?",
  description,
  buttonLabel = "Tiket Bantuan",
}: SupportHelpCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white">
      <div className="relative z-10">
        <h4 className="mb-2 flex items-center gap-2 font-bold">
          <span className="material-symbols-outlined text-sm">help_outline</span>
          {title}
        </h4>
        <p className="mb-4 text-xs text-blue-100/80">{description}</p>
        <button className="w-full rounded-lg bg-white/10 py-2.5 text-sm font-bold backdrop-blur-sm transition-colors hover:bg-white/20" type="button">
          {buttonLabel}
        </button>
      </div>
      <span className="material-symbols-outlined absolute -right-6 -bottom-6 rotate-12 text-9xl text-white/5">support_agent</span>
    </div>
  );
}
