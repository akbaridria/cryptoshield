export interface ITabs {
  tabname: string;
  listab: string[];
  setTab: (v: string) => void
}

export interface ICardAsset {
  image: string;
  name: string;
  chain: string;
  setMarket: ({ price, market, assetType, decimal}: FormBuy) => void
}

export interface ICardNFT {
  image: string;
  name: string;
  chain: string;
}

export interface ListAssets {
  contractName: string;
  contractAddress: string;
  heartbeat: number;
  decimal: number;
  image: string;
}

export interface FormBuy {
  price: bigint;
  market: string;
  assetType: string;
  decimal: number;
  setTx?: (v: string) => void;
}

export interface LoadingFormBuy {
  loadingApprove: boolean;
  loadingBalance: boolean;
  loadingBuy: boolean;
  loadingCover: boolean;
}

export interface IModalTx {
  tx: string;
}