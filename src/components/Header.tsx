"use client"

import Link from "next/link";
import { Blockies } from "./Blockies";
import { Chevron } from "./Icons";
import { Logo } from "./Logo";
import datas from '@/data.json';
import dataContract from '../../protocol-contract/datas/contracts.json';
import { usePathname } from "next/navigation";
import { listSubMenuAccount, trimWallet } from "@/helper";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";

export const Header = () => {
  const { isConnected } = useAccount()
  const pathname = usePathname();
  
  return (
    <div className="sticky top-0 z-[100] bg-base-100">
      <div className="container mx-auto ">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {
                  datas.menus.map((item, index) => {
                    return (
                      <li key={`link-${item.name}-${index}-${pathname}`}>
                        <Link href={item.link} className={`${pathname === item.link ? 'text-accent font-semibold' : null}`}>{item.name}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <Logo />
          </div>
          <div className="navbar-end">
            <div className="hidden items-center gap-2 md:flex">
              { isConnected && <ButtonListNetwork /> }
              { isConnected && <ButtonUserConnected />}
              { !isConnected && <ButtonConnectWallet />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ButtonUserConnected = () => {
  const { address } = useAccount()
  
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
        <Blockies address="0x694aCF4DFb7601F92A0D2a41cdEC5bf7726C7294" customClass="w-4 h-4 rounded-full" />
        <div>{ trimWallet(address as string) }</div>
        <Chevron customClass="w-4 h-4 rotate-[90deg]" />
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-5 shadow bg-base-100 rounded-box w-52">
        {
          listSubMenuAccount().map((item, index) => {
            return (
              <li key={`account-sub-menu-${index}`}>
                <div className="flex flex-row items-center gap-2">
                  {item.icon}
                  {item.name}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export const ButtonListNetwork = () => {
  const { chain } = useNetwork()
  const { isLoading, switchNetwork } = useSwitchNetwork()

  return (
    <div className="dropdown dropdown-end">
      {
        !chain?.unsupported && <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
          <img src={`cryptos/${datas.listNetwork[chain?.name as keyof typeof datas.listNetwork]}`} alt={chain?.name} className="w-4 h-4" />
          <div>{ chain?.name }</div>
          <Chevron customClass="w-4 h-4 rotate-[90deg]" />
        </div>
      }
      {
        chain?.unsupported && <div tabIndex={0} role="button" className="btn btn-error btn-sm">
          Wrong Network
          <Chevron customClass="w-4 h-4 rotate-[90deg]" />
        </div>
      }
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-5 shadow bg-base-100 rounded-box w-52">
        {
          Object.keys(dataContract.networkDetail).map((item, index) => {
            return (
              <li key={`account-sub-menu-${index}`}>
                <button disabled={isLoading} className="flex flex-row items-center justify-between" onClick={() => dataContract.networkDetail[item as keyof typeof dataContract.networkDetail].chainId !== chain?.id ? switchNetwork?.(dataContract.networkDetail[item as keyof typeof dataContract.networkDetail].chainId) : null}>
                  <div className="flex flex-row items-center gap-2">
                    <img src={`cryptos/${dataContract.networkDetail[item as keyof typeof dataContract.networkDetail].icon}`} alt="" className="w-4 h-4" />
                    {dataContract.networkDetail[item as keyof typeof dataContract.networkDetail].chainName}
                  </div>
                  {
                    dataContract.networkDetail[item as keyof typeof dataContract.networkDetail].chainId === chain?.id &&
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  }
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export const ButtonConnectWallet = () => {
  const { connect, connectors, isLoading } = useConnect();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-primary btn-sm">
        <div>Connect Wallet</div>
        <Chevron customClass="w-4 h-4 rotate-[90deg]" />
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-5 shadow bg-base-100 rounded-box w-52">
        {
          connectors.map((connector) => {
            return (
              <li key={`account-sub-menu-${connector.id}`}>
                <button disabled={isLoading} onClick={() => connect({ connector })} className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <img src={`cryptos/${connector.id}.svg`} alt="" className={`w-4 h-4 ${connector.id === 'coinbaseWallet' ? 'rounded-full' : null}`} />
                    {connector.name}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export default Header;