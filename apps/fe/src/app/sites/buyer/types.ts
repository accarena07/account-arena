export type TransactionStatusVariant = "pending_payment" | "in_progress" | "completed";

export type TransactionStepState = "pending" | "in_progress" | "completed";

export type PaymentSummaryRow = {
  label: string;
  value: string;
  valueClassName?: string;
};

export type PaymentSummaryAction = {
  label: string;
  href?: string;
  icon?: string;
  className: string;
};

export type PaymentMethodInfo = {
  methodName: string;
  methodSubtitle: string;
  methodSubtitleClassName?: string;
  bankCode?: string;
  accountLabel?: string;
  accountNumber?: string;
  infoText?: string;
};

export type BuyerTransactionListItem = {
  game: string;
  date: string;
  title: string;
  orderId: string;
  total: string;
  status: string;
  statusVariant: TransactionStatusVariant;
  action: string;
  actionClass: string;
  actionHref: string;
  image: string;
};
