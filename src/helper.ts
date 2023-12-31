import type { Menus, IAccountSubMenu } from "./types"
import { 
  Gear,
  CursorArrowRays, 
  Bolt, 
  Liquidity,
  ArrowDiagonalSquare,
  ArrowSquare
} from "./components/Icons"
import { DummyUsdc__factory, ShieldHub__factory } from "../protocol-contract/typechain-types";
import datas from '../protocol-contract/datas/contracts.json';
import { ethers } from "ethers";

export const listBenefit = () : Menus[] => {
  return [
    {
      title: 'Automatic Protection',
      description: 'Using Chainlink Automation, CryptoShield automates insurance triggers based on predefined thresholds, securing your assets without manual intervention.',
      icon: Gear({ customClass: "w-12 h-12 stroke-primary"})
    },
    {
      title: 'NFT Protection',
      description: 'CryptoShield extends its coverage to safeguard non-fungible tokens (NFTs) against market volatility, preserving the value of your unique digital collectibles.',
      icon: Bolt({ customClass: "w-12 h-12 stroke-primary"})
    },
    {
      title: 'User-Friendly Interface',
      description: 'An intuitive platform makes it easy for users to set preferences and manage their insurance coverage seamlessly.',
      icon: CursorArrowRays({ customClass: "w-12 h-12 stroke-primary"})
    }
  ]
}

export const listSubMenuAccount = ():IAccountSubMenu[] => {
  return [
    {
      name: "Your Cover",
      icon: Liquidity({ customClass: 'w-4 h-4 stroke-base-content'})
    },
    {
      name: "View In Explorer",
      icon: ArrowDiagonalSquare({ customClass: 'w-4 h-4 stroke-base-content'})
    },
    {
      name: "Disconnect",
      icon: ArrowSquare({ customClass: 'w-4 h-4 stroke-base-content rotate-[180deg]'})
    }
  ]
}

export const trimWallet = (v: string) => {
  return v.slice(0, 6) + '...' + v.slice(-4)
}

export const formatCurrency = (v: bigint, decimal: number) => {
  return new Intl.NumberFormat('en',{ minimumFractionDigits: 0, maximumFractionDigits: decimal}).format(Number(v) / (10 ** decimal))
}

export const getTotalCapital = async () => {
  let result = BigInt(0);

  for(let i in Object.keys(datas.networkDetail)) {
    const provider = new ethers.JsonRpcProvider(datas.networkDetail[Object.keys(datas.networkDetail)[i] as keyof typeof datas.networkDetail].rpc);
    const d = DummyUsdc__factory.connect(datas.networkDetail[Object.keys(datas.networkDetail)[i] as keyof typeof datas.networkDetail].DummyUsdc, provider);
    const e = await d.balanceOf(datas.networkDetail[Object.keys(datas.networkDetail)[i] as keyof typeof datas.networkDetail].ShieldHub);
    result += e;
  }
  return new Intl.NumberFormat('en', { notation: 'compact'}).format( Number(result) / (10 ** 18));
}

export const getTotalUnderCover = async () => {
  let result = BigInt(0);

  for(let i in Object.keys(datas.networkDetail)) {
    const provider = new ethers.JsonRpcProvider(datas.networkDetail[Object.keys(datas.networkDetail)[i] as keyof typeof datas.networkDetail].rpc);
    const d = ShieldHub__factory.connect(datas.networkDetail[Object.keys(datas.networkDetail)[i] as keyof typeof datas.networkDetail].ShieldHub, provider);
    const e = await d.totalUnrealizedCoverAmount();
    result += e;
  }
  return new Intl.NumberFormat('en', { notation: 'compact'}).format( Number(result) / (10 ** 18));
}

export const getTotalClaimed = async () => {
  let result = BigInt(0);

  for(let i in Object.keys(datas.networkDetail)) {
    const provider = new ethers.JsonRpcProvider(datas.networkDetail[Object.keys(datas.networkDetail)[i] as keyof typeof datas.networkDetail].rpc);
    const d = ShieldHub__factory.connect(datas.networkDetail[Object.keys(datas.networkDetail)[i] as keyof typeof datas.networkDetail].ShieldHub, provider);
    const e = await d.totalClaimed();
    result += e;
  }
  return new Intl.NumberFormat('en', { notation: 'compact'}).format( Number(result) / (10 ** 18));
}