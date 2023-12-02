export interface ITabs {
  tabname: string;
  listab: string[];
  setTab: (v: string) => void
}

export interface ICardAsset {
  image: string;
  name: string;
  chain: string;
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