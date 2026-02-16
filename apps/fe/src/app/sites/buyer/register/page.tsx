"use client";

import AuthPageShell from "../components/AuthPageShell";
import ResultModal from "@/components/common/ResultModal";
import { RegisterForm } from "./components/RegisterForm";
import { RegisterTermsModal } from "./components/RegisterTermsModal";
import { useBuyerRegisterPage } from "./useBuyerRegisterPage";

const registerFeatures = [
  {
    icon: "verified_user",
    title: "Keamanan Terjamin",
    description: "Verifikasi OTP untuk setiap akses akun.",
  },
  {
    icon: "payments",
    title: "Transaksi Instan",
    description: "Proses serah terima akun otomatis & cepat.",
  },
] as const;

const BuyerRegisterPage = () => {
  const pageState = useBuyerRegisterPage();

  return (
    <>
      <ResultModal
        isOpen={pageState.showErrorModal}
        message={pageState.errorMessage}
        onClose={pageState.onCloseErrorModal}
        onPrimaryAction={pageState.onCloseErrorModal}
        primaryActionLabel="Coba Lagi"
        secondaryActionHref={pageState.errorSecondaryActionHref}
        secondaryActionLabel={pageState.errorSecondaryActionLabel}
        title={pageState.errorTitle}
        variant="error"
      />

      <RegisterTermsModal isOpen={pageState.showTncModal} onClose={pageState.onCloseTncModal} />

      <AuthPageShell
        activeTab="register"
        leftDescription="Satu akun untuk semua kebutuhan marketplace game Anda. Aman, terpercaya, dan instan."
        leftFeatures={registerFeatures}
        leftTitle="Mulai Petualangan Gaming Anda"
      >
        <RegisterForm
          fullName={pageState.fullName}
          email={pageState.email}
          errors={pageState.errors}
          isSubmitting={pageState.isSubmitting}
          password={pageState.password}
          termsAccepted={pageState.termsAccepted}
          showPassword={pageState.showPassword}
          whatsApp={pageState.whatsApp}
          onFullNameChange={pageState.onFullNameChange}
          onEmailChange={pageState.onEmailChange}
          onOpenTncModal={pageState.onOpenTncModal}
          onPasswordChange={pageState.onPasswordChange}
          onTermsAcceptedChange={pageState.onTermsAcceptedChange}
          onSubmit={pageState.onSubmit}
          onTogglePassword={pageState.onTogglePassword}
          onWhatsAppChange={pageState.onWhatsAppChange}
        />
      </AuthPageShell>

    </>
  );
};

export default BuyerRegisterPage;
