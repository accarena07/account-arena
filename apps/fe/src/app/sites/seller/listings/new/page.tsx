"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { resetSellerCreateListing } from "@/lib/redux/slices/sellerCreateListingSlice";
import {
  sellerListingWizardSteps,
  sellerListingWizardSubtitle,
} from "../../data/wizards";
import SellerPageHeader from "../../components/SellerPageHeader";
import SellerProfileInfo from "../../components/SellerProfileInfo";
import SellerWizardStepper from "../../components/SellerWizardStepper";
import { useSellerWizard } from "../../hooks/useSellerWizard";
import { useSellerCreateListingDraft } from "../../hooks/useSellerCreateListingDraft";
import CreateListingStepOne from "../../components/listing/CreateListingStepOne";
import CreateListingStepTwo from "../../components/listing/CreateListingStepTwo";
import CreateListingStepThree from "../../components/listing/CreateListingStepThree";
import CreateListingStepFour from "../../components/listing/CreateListingStepFour";

export default function CreateListingPage() {
  const dispatch = useAppDispatch();
  const createListingState = useAppSelector((state) => state.sellerCreateListing);
  const { step, setStep, nextStep, prevStep } = useSellerWizard({
    maxStep: 4,
  });
  const { saveDraftNow, clearDraft } = useSellerCreateListingDraft();
  const [notice, setNotice] = useState<string>("");

  const handleNextFromStepOne = () => {
    const { gameCategory, listingHeadline, rankProgress, description } =
      createListingState;
    if (
      !gameCategory.trim() ||
      !listingHeadline.trim() ||
      !rankProgress.trim() ||
      !description.trim()
    ) {
      setNotice("Please complete all account details before continuing.");
      return;
    }
    setNotice("");
    nextStep();
  };

  const handleNextFromStepThree = () => {
    const { price } = createListingState;
    if (!price.trim() || Number(price) <= 0) {
      setNotice("Selling price must be greater than 0.");
      return;
    }
    setNotice("");
    nextStep();
  };

  const handleSaveDraft = () => {
    saveDraftNow();
    setNotice("Draft saved locally.");
  };

  const handlePublish = () => {
    const { gameCategory, listingHeadline, rankProgress, description, price } =
      createListingState;
    if (
      !gameCategory.trim() ||
      !listingHeadline.trim() ||
      !rankProgress.trim() ||
      !description.trim() ||
      !price.trim() ||
      Number(price) <= 0
    ) {
      setNotice("Please complete required fields before publishing.");
      return;
    }

    clearDraft();
    dispatch(resetSellerCreateListing());
    setStep(1);
    setNotice("Listing published successfully (mock).");
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto">
      <SellerPageHeader
        align="center"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "My Listings", href: "/listings" },
          { label: "Create New Listing" },
        ]}
        leading={
          <Link
            href="/listings"
            className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:scale-105 hover:text-[#254294] dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="material-symbols-outlined font-black transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
          </Link>
        }
        title="Create Listing"
        subtitle={
          <>
            Step {step} •{" "}
            <span className="text-[#254294] dark:text-blue-400">
              {sellerListingWizardSubtitle[step]}
            </span>
          </>
        }
        rightContent={
          <div className="flex w-full items-center justify-between gap-6 border-t border-slate-100 pt-6 md:w-auto md:justify-end md:border-t-0 md:pt-0 dark:border-slate-800">
            <SellerProfileInfo />
          </div>
        }
      />

      <SellerWizardStepper
        step={step}
        items={sellerListingWizardSteps}
        variant="tab"
      />

      {notice && (
        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300">
          {notice}
        </div>
      )}

      {step === 1 && <CreateListingStepOne onNext={handleNextFromStepOne} />}
      {step === 2 && <CreateListingStepTwo onBack={prevStep} onNext={nextStep} />}
      {step === 3 && (
        <CreateListingStepThree onBack={prevStep} onNext={handleNextFromStepThree} />
      )}
      {step === 4 && (
        <CreateListingStepFour
          onEditStepOne={() => setStep(1)}
          onEditStepTwo={() => setStep(2)}
          onEditStepThree={() => setStep(3)}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
        />
      )}
    </div>
  );
}
