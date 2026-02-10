export const sellerListingWizardSteps = [
  { id: 1, label: "Account Info" },
  { id: 2, label: "Media & Media" },
  { id: 3, label: "Pricing & Delivery" },
  { id: 4, label: "Review & Publish" },
] as const;

export const sellerListingWizardSubtitle: Record<number, string> = {
  1: "Basic Info",
  2: "Media",
  3: "Pricing",
  4: "Review",
};

export const sellerVerificationWizardSteps = [
  { id: 1, label: "Info", icon: "person" },
  { id: 2, label: "Identity", icon: "badge" },
  { id: 3, label: "Selfie", icon: "face" },
  { id: 4, label: "Review", icon: "verified" },
] as const;
