import type { TransactionRow } from "../types";

export const transactionRows: TransactionRow[] = [
  {
    id: "#TXN-984021",
    orderId: "ORD-55209",
    buyer: "alex_gamer",
    seller: "elite_seller",
    amount: "Rp 2.450.000",
    paymentMethod: "Virtual Account",
    status: "success",
  },
  {
    id: "#TXN-984022",
    orderId: "ORD-55210",
    buyer: "ryan_king",
    seller: "pro_account",
    amount: "Rp 850.000",
    paymentMethod: "E-Wallet",
    status: "pending",
  },
  {
    id: "#TXN-984023",
    orderId: "ORD-55211",
    buyer: "shadow_user",
    seller: "mythic_store",
    amount: "Rp 15.000.000",
    paymentMethod: "Credit Card",
    status: "refunded",
  },
];
