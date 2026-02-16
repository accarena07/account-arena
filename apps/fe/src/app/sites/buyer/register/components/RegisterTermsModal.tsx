import { buyerRegisterTermsDocs } from "../terms";
import type {
  RegisterModalCloseProps,
  RegisterTermsDocumentProps,
  RegisterTermsModalProps,
  TermsSection as RegisterTermsSectionType,
} from "../register.type";

const TermsSection = ({
  title,
  paragraphs,
  bullets,
}: RegisterTermsSectionType) => {
  return (
    <div>
      <h4 className="mb-2 text-sm font-bold text-gray-900 dark:text-white">{title}</h4>
      {paragraphs?.map((paragraph) => (
        <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400" key={paragraph}>
          {paragraph}
        </p>
      ))}
      {bullets?.length ? (
        <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

const TermsDocument = ({
  title,
  subtitle,
  effectiveDate,
  sections,
}: RegisterTermsDocumentProps) => {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-300">{subtitle}</p> : null}
        <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">Tanggal Efektif: {effectiveDate}</p>
      </div>
      <div className="space-y-5">
        {sections.map((section) => (
          <TermsSection bullets={section.bullets} key={section.title} paragraphs={section.paragraphs} title={section.title} />
        ))}
      </div>
    </section>
  );
};

export const RegisterTermsModal = ({ isOpen, onClose }: RegisterTermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <button
        aria-label="Tutup modal syarat dan ketentuan"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <ModalCard onClose={onClose} />
    </div>
  );
};

const ModalHeader = ({ onClose }: RegisterModalCloseProps) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-slate-800">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
        <span className="material-symbols-outlined text-primary dark:text-secondary">gavel</span>
        Syarat & Ketentuan
      </h2>
      <button className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white" onClick={onClose} type="button">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

const ModalBody = () => {
  return (
    <div className="space-y-8 overflow-y-auto p-6 lg:p-8">
      {buyerRegisterTermsDocs.map((document) => (
        <TermsDocument
          effectiveDate={document.effectiveDate}
          key={document.id}
          sections={document.sections}
          subtitle={document.subtitle}
          title={document.title}
        />
      ))}
    </div>
  );
};

const ModalFooter = ({ onClose }: RegisterModalCloseProps) => {
  return (
    <div className="border-t border-gray-100 bg-gray-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
      <button
        className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-primary/90"
        onClick={onClose}
        type="button"
      >
        Saya Mengerti
      </button>
    </div>
  );
};

const ModalCard = ({ onClose }: RegisterModalCloseProps) => {
  return (
    <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <ModalHeader onClose={onClose} />
      <ModalBody />
      <ModalFooter onClose={onClose} />
    </div>
  );
};
