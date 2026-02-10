export type SellerStatusKind =
  | "active"
  | "sold"
  | "draft"
  | "success"
  | "processing"
  | "failed";

export type SellerListing = {
  id: number;
  title: string;
  game: string;
  level: string;
  price: string;
  status: string;
  statusKind: SellerStatusKind;
  image: string;
};

export type SellerListingTab = {
  label: string;
  count: number;
  active?: boolean;
};

export type SellerPayoutTransaction = {
  id: number;
  date: string;
  time: string;
  amount: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  status: string;
  statusKind: SellerStatusKind;
};

export type SellerDashboardStat = {
  label: string;
  value: string;
  icon: string;
  trend?: string;
  suffix?: string;
  note?: string;
};

export type SellerInventorySnapshotItem = {
  label: string;
  count: number;
  color: string;
  trend: string;
};

export type SellerCreateListingRequirement = {
  title: string;
  desc: string;
};
