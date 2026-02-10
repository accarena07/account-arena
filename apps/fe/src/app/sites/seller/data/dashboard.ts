import type { SellerDashboardStat, SellerInventorySnapshotItem } from "../types";

export const sellerDashboardStats: SellerDashboardStat[] = [
  {
    label: "Daily Revenue",
    value: "Rp 2.500.000",
    icon: "payments",
    trend: "+15.4%",
  },
  {
    label: "Pending Orders",
    value: "12",
    icon: "order_approve",
    note: "New items to ship",
  },
  {
    label: "Active Listings",
    value: "48",
    icon: "layers",
    note: "Currently live",
  },
  {
    label: "Store Feedback",
    value: "4.8",
    icon: "stars",
    suffix: "/ 5.0",
    note: "From 120 reviews",
  },
];

export const sellerInventorySnapshot: SellerInventorySnapshotItem[] = [
  {
    label: "Active Nodes",
    count: 42,
    color: "bg-emerald-500",
    trend: "+4",
  },
  {
    label: "Closed Trades",
    count: 156,
    color: "bg-orange-500",
    trend: "+12",
  },
  {
    label: "Drafted Assets",
    count: 6,
    color: "bg-slate-400",
    trend: "0",
  },
];
