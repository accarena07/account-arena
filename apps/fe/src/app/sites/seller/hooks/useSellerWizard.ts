import { useState } from "react";

type UseSellerWizardOptions = {
  initialStep?: number;
  maxStep: number;
};

export function useSellerWizard({
  initialStep = 1,
  maxStep,
}: UseSellerWizardOptions) {
  const [step, setStep] = useState(initialStep);

  const nextStep = () => setStep((current) => Math.min(maxStep, current + 1));
  const prevStep = () => setStep((current) => Math.max(1, current - 1));
  const goToStep = (targetStep: number) =>
    setStep(Math.min(maxStep, Math.max(1, targetStep)));

  return {
    step,
    setStep: goToStep,
    nextStep,
    prevStep,
  };
}
