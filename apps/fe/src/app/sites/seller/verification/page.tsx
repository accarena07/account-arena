"use client";

import React from "react";
import {
  sellerVerificationWizardSteps,
} from "../data/wizards";
import SellerGlobalFooter from "../components/SellerGlobalFooter";
import SellerPageHeader from "../components/SellerPageHeader";
import SellerProfileInfo from "../components/SellerProfileInfo";
import SellerUtilityButtons from "../components/SellerUtilityButtons";
import SellerWizardStepper from "../components/SellerWizardStepper";
import { useSellerWizard } from "../hooks/useSellerWizard";
import VerificationStepIdentity from "../components/verification/VerificationStepIdentity";
import VerificationStepPersonalInfo from "../components/verification/VerificationStepPersonalInfo";
import VerificationStepReview from "../components/verification/VerificationStepReview";
import VerificationStepSelfie from "../components/verification/VerificationStepSelfie";

export default function KYCVerificationPage() {
  const { step, setStep, nextStep } = useSellerWizard({
    maxStep: 4,
  });

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full">
      <SellerPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Global KYC Verification" },
        ]}
        title="Seller Verification"
        subtitle={
          <>
            Protecting the{" "}
            <span className="text-[#254294] dark:text-blue-400">
              market integrity
            </span>{" "}
            via identity proof
          </>
        }
        rightContent={
          <div className="flex w-full items-center justify-between gap-6 border-t border-slate-100 pt-6 md:w-auto md:justify-end md:border-t-0 md:pt-0 dark:border-slate-800">
            <SellerUtilityButtons />
            <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
              <SellerProfileInfo />
            </div>
          </div>
        }
      />

      <SellerWizardStepper
        step={step}
        items={sellerVerificationWizardSteps}
        variant="timeline"
      />

      <div className="mb-20 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {step === 1 ? (
          <VerificationStepPersonalInfo onNext={nextStep} />
        ) : null}

        {step === 2 ? (
          <VerificationStepIdentity onBack={() => setStep(1)} onNext={nextStep} />
        ) : null}

        {step === 3 ? (
          <VerificationStepSelfie onBack={() => setStep(2)} onNext={nextStep} />
        ) : null}

        {step === 4 ? (
          <VerificationStepReview
            onGoToIdentity={() => setStep(2)}
            onGoToSelfie={() => setStep(3)}
          />
        ) : null}
      </div>

      <SellerGlobalFooter
        copyright="© 2024 AccountArena • Trust Infrastructure • Global KYC Standards"
        links={[
          { label: "Compliance Engine" },
          { label: "Identity Firewall" },
          { label: "Verification Legals" },
        ]}
        statusText="Compliance Node Active"
      />
    </div>
  );
}
