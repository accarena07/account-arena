import type { KycRow } from "../types";

export const kycRows: KycRow[] = [
  {
    name: "John Doe",
    email: "john.doe@email.com",
    submittedDate: "Oct 24, 2023 • 14:20",
    verificationType: "ID Card & Selfie",
    status: "pending_review",
  },
  {
    name: "Sarah Wilson",
    email: "sarah.w@gmail.com",
    submittedDate: "Oct 23, 2023 • 09:15",
    verificationType: "Passport",
    status: "approved",
  },
  {
    name: "Budi Kusuma",
    email: "budi.k@outlook.com",
    submittedDate: "Oct 22, 2023 • 17:45",
    verificationType: "ID Card",
    status: "rejected",
  },
  {
    name: "Alex Johnson",
    email: "ajohnson@gaming.net",
    submittedDate: "Oct 22, 2023 • 12:00",
    verificationType: "ID Card & Selfie",
    status: "pending_review",
  },
];
