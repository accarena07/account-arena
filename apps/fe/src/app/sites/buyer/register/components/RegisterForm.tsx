import type {
  PasswordVisibilityButtonProps,
  RegisterFormProps,
  RegisterIdentityFieldsProps,
  RegisterInputProps,
  RegisterPasswordFieldProps,
  RegisterSubmitSectionProps,
  RegisterTermsAgreementProps,
  RegisterTextFieldProps,
} from "../register.type";

const RegisterTextField = ({
  label,
  icon,
  placeholder,
  type,
  value,
  disabled,
  error,
  onChange,
}: RegisterTextFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">{icon}</span>
        <input
          className="w-full rounded-xl border-none bg-gray-50 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:focus:ring-secondary"
          disabled={disabled}
          placeholder={placeholder}
          required
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {error ? <p className="text-xs font-medium text-red-500">{error}</p> : null}
    </div>
  );
};

const PasswordVisibilityButton = ({
  showPassword,
  disabled,
  onTogglePassword,
}: PasswordVisibilityButtonProps) => {
  const visibilityIcon = showPassword ? "visibility_off" : "visibility";
  const visibilityLabel = showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi";

  return (
    <button
      aria-label={visibilityLabel}
      className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
      disabled={disabled}
      onClick={onTogglePassword}
      type="button"
    >
      <span className="material-symbols-outlined">{visibilityIcon}</span>
    </button>
  );
};

const RegisterPasswordField = ({
  value,
  showPassword,
  disabled,
  error,
  onChange,
  onTogglePassword,
}: RegisterPasswordFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kata Sandi</label>
      <div className="relative">
        <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-xl text-gray-400">lock</span>
        <input
          className="w-full rounded-xl border-none bg-gray-50 py-3 pr-12 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:text-white dark:focus:ring-secondary"
          disabled={disabled}
          placeholder="Minimal 8 karakter"
          required
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <PasswordVisibilityButton disabled={disabled} showPassword={showPassword} onTogglePassword={onTogglePassword} />
      </div>
      {error ? <p className="text-xs font-medium text-red-500">{error}</p> : null}
    </div>
  );
};

const RegisterPrimaryFields = ({
  email,
  whatsApp,
  password,
  showPassword,
  isSubmitting,
  errors,
  onEmailChange,
  onWhatsAppChange,
  onPasswordChange,
  onTogglePassword,
}: RegisterInputProps) => {
  return (
    <>
      <RegisterIdentityFields
        email={email}
        errors={errors}
        isSubmitting={isSubmitting}
        whatsApp={whatsApp}
        onEmailChange={onEmailChange}
        onWhatsAppChange={onWhatsAppChange}
      />
      <RegisterPasswordField
        disabled={isSubmitting}
        error={errors.password}
        showPassword={showPassword}
        value={password}
        onChange={onPasswordChange}
        onTogglePassword={onTogglePassword}
      />
    </>
  );
};

const RegisterIdentityFields = ({
  email,
  whatsApp,
  isSubmitting,
  errors,
  onEmailChange,
  onWhatsAppChange,
}: RegisterIdentityFieldsProps) => {
  return (
    <>
      <RegisterTextField
        disabled={isSubmitting}
        error={errors.email}
        icon="mail"
        label="Email"
        placeholder="alamat@email.com"
        type="email"
        value={email}
        onChange={onEmailChange}
      />
      <RegisterTextField
        disabled={isSubmitting}
        error={errors.whatsapp}
        icon="call"
        label="Nomor WhatsApp"
        placeholder="0812xxxxxx"
        type="tel"
        value={whatsApp}
        onChange={onWhatsAppChange}
      />
    </>
  );
};

const OtpInfo = () => {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/20">
      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
        Kode OTP verifikasi akan dikirim ke email yang Anda daftarkan.
      </p>
    </div>
  );
};

const TermsAgreement = ({
  isSubmitting,
  onOpenTncModal,
}: RegisterTermsAgreementProps) => {
  return (
    <div className="mt-6 flex items-start gap-3">
      <input
        className="mt-1 h-5 w-5 rounded-md border-gray-200 bg-gray-50 text-primary focus:ring-primary"
        disabled={isSubmitting}
        id="terms"
        required
        type="checkbox"
      />
      <label className="text-xs leading-normal text-gray-500 dark:text-gray-400" htmlFor="terms">
        Saya menyetujui{" "}
        <button
          className="font-semibold text-primary hover:underline dark:text-secondary"
          onClick={(event) => {
            event.preventDefault();
            onOpenTncModal();
          }}
          type="button"
        >
          Syarat & Ketentuan
        </button>{" "}
        yang berlaku.
      </label>
    </div>
  );
};

const SubmitSection = ({ isSubmitting }: RegisterSubmitSectionProps) => {
  return (
    <>
      <button
        className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-80 dark:bg-secondary dark:shadow-secondary/20"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
      </button>

      <div className="pt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sudah punya akun?{" "}
          <a className="font-bold text-primary hover:underline dark:text-secondary" href="/login">
            Masuk di sini
          </a>
        </p>
      </div>
    </>
  );
};

export const RegisterForm = ({
  email,
  whatsApp,
  password,
  showPassword,
  isSubmitting,
  errors,
  onEmailChange,
  onWhatsAppChange,
  onPasswordChange,
  onTogglePassword,
  onOpenTncModal,
  onSubmit,
}: RegisterFormProps) => {
  return (
    <form className="space-y-5" id="register-form" onSubmit={onSubmit}>
      <RegisterPrimaryFields
        email={email}
        errors={errors}
        isSubmitting={isSubmitting}
        password={password}
        showPassword={showPassword}
        whatsApp={whatsApp}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onTogglePassword={onTogglePassword}
        onWhatsAppChange={onWhatsAppChange}
      />
      <OtpInfo />
      <TermsAgreement isSubmitting={isSubmitting} onOpenTncModal={onOpenTncModal} />
      <SubmitSection isSubmitting={isSubmitting} />
    </form>
  );
};
