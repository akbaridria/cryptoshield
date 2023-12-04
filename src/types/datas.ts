export interface IFAQ {
  question: string;
  answer: string;
}

export interface  IHistory {
  isExist: boolean;
  policyHolder: `0x${string}`;
  amount: bigint;
  iType: number;
  market: string;
  price: bigint;
  strikePrice: bigint;
  expireTime: bigint;
  coverAmount: bigint;
  status: number;
  orderNumber: bigint;
}
