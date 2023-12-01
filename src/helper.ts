import type { Menus } from "./types"
import { Gear,CursorArrowRays, Bolt } from "./components/Icons"

export const listBenefit = () : Menus[] => {
  return [
    {
      title: 'Automatic Protection',
      description: 'Using Chainlink price feeds, CryptoShield automates insurance triggers based on predefined thresholds, securing your assets without manual intervention.',
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