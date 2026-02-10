import type { AdminStatus } from "./components/AdminStatusBadge";

export type UserRole = "Seller" | "Buyer";

export type AdminUserStatus = Extract<AdminStatus, "active" | "suspended">;
export type KycStatus = Extract<AdminStatus, "pending_review" | "approved" | "rejected">;
export type TransactionStatus = Extract<AdminStatus, "success" | "pending" | "refunded">;
export type DisputeStatus = Extract<AdminStatus, "open" | "under_review" | "resolved">;
export type DisputePriority = "HIGH" | "MEDIUM" | "LOW";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinDate: string;
  status: AdminUserStatus;
};

export type KycRow = {
  name: string;
  email: string;
  submittedDate: string;
  verificationType: string;
  status: KycStatus;
};

export type TransactionRow = {
  id: string;
  orderId: string;
  buyer: string;
  seller: string;
  amount: string;
  paymentMethod: string;
  status: TransactionStatus;
};

export type DisputeRow = {
  id: string;
  order: string;
  desc: string;
  initiator: string;
  initiatorType: "Buyer" | "Seller";
  initiatorColor?: string;
  reason: string;
  date: string;
  priority: DisputePriority;
  status: DisputeStatus;
  action?: "View Log";
};
