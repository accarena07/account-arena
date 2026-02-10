type AdminPageFooterProps = {
  thirdLinkLabel?: string;
};

export default function AdminPageFooter({
  thirdLinkLabel = "System Status",
}: AdminPageFooterProps) {
  return (
    <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-[11px] font-black tracking-widest text-slate-400 uppercase italic dark:border-slate-800 dark:text-slate-500 md:flex-row">
      <p className="text-center md:text-left">© 2024 GAMEMARKET Indonesia. All rights reserved.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-4 md:mt-0 md:justify-end">
        <a className="transition-colors hover:text-[#21337e] dark:hover:text-blue-400" href="#">
          Privacy Policy
        </a>
        <a className="transition-colors hover:text-[#21337e] dark:hover:text-blue-400" href="#">
          Terms of Service
        </a>
        <a className="transition-colors hover:text-[#21337e] dark:hover:text-blue-400" href="#">
          {thirdLinkLabel}
        </a>
      </div>
    </footer>
  );
}
