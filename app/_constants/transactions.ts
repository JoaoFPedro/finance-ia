import {
  TransactionsCategory,
  TransactionsPaymentMethod,
  TransactionsType,
} from "@prisma/client";

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionsType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionsType.EXPENSE,
    label: "Gasto",
  },
  {
    value: TransactionsType.INVESTMENT,
    label: "Investimento",
  },
];

export const TRANSACTIONS_CATEGORY_OPTIONS = [
  {
    value: TransactionsCategory.HOUSING,
    label: "Moradia",
  },
  {
    value: TransactionsCategory.TRANSPORTATION,
    label: "Transporte",
  },
  {
    value: TransactionsCategory.FOOD,
    label: "Comida",
  },
  {
    value: TransactionsCategory.ENTERTAINMENT,
    label: "Entretenimento",
  },
  {
    value: TransactionsCategory.HEALTH,
    label: "Saúde",
  },
  {
    value: TransactionsCategory.UTILITY,
    label: "Proveito",
  },
  {
    value: TransactionsCategory.SALARY,
    label: "Salário",
  },
  {
    value: TransactionsCategory.EDUCATION,
    label: "Educação",
  },
  {
    value: TransactionsCategory.OTHER,
    label: "Outros",
  },
];
export const TRANSACTIONS_PAYMENTMETHOD_OPTIONS = [
  {
    value: TransactionsPaymentMethod.CREDIT_CARD,
    label: "Cartão de crédito",
  },
  {
    value: TransactionsPaymentMethod.DEBIT_CARD,
    label: "Cartão de débito",
  },
  {
    value: TransactionsPaymentMethod.BANK_TRANSFER,
    label: "Transferência bancária",
  },
  {
    value: TransactionsPaymentMethod.BANK_SLIP,
    label: "Boleto bancário",
  },
  {
    value: TransactionsPaymentMethod.CASH,
    label: "Dinheiro",
  },
  {
    value: TransactionsPaymentMethod.PIX,
    label: "Pix",
  },
  {
    value: TransactionsPaymentMethod.OTHER,
    label: "Outro",
  },
];
export const TRANSACTIONS_CATEGORY_LABELS: Record<string, string> = {
  TRANSPORTATION: "Transporte",
  OTHER: "Outros",
  HOUSING: "Moradia",
  FOOD: "Alimentação",
  ENTERTAINMENT: "Entretenimento",
  HEALTH: "Saúde",
  UTILITY: "Utilidade",
  EDUCATION: "Educação",
  SALARY: "Salário",
};
export const TRANSACTIONS_PAYMENT_METHOD_ICONS = {
  CREDIT_CARD: "icon.png",
  DEBIT_CARD: "icon.png",

  BANK_TRANSFER: "icon.png",

  BANK_SLIP: "icon.png",

  CASH: "icon.png",

  PIX: "icon.png",

  OTHER: "icon.png",
};

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionsPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionsPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionsPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionsPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionsPaymentMethod.CASH]: "money.svg",
  [TransactionsPaymentMethod.PIX]: "pix.png",
  [TransactionsPaymentMethod.OTHER]: "other.svg",
};
