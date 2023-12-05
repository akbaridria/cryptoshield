"use client"

import Link from "next/link";
import { Blockies } from "./Blockies";
import { Chevron, Refresh, Shield } from "./Icons";
import { Logo } from "./Logo";
import datas from '@/data.json';
import dataContract from '../../protocol-contract/datas/contracts.json';
import { usePathname } from "next/navigation";
import { formatCurrency, listSubMenuAccount, trimWallet } from "@/helper";
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { useCallback, useEffect, useRef, useState } from "react";
import { readContract } from "@wagmi/core";
import { ShieldHub__factory } from "../../protocol-contract/typechain-types";
import { IHistory } from "@/types";
import moment from 'moment';

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
              {isConnected && <ButtonListNetwork />}
              {isConnected && <ButtonUserConnected />}
              {!isConnected && <ButtonConnectWallet />}
            </div>
          </div>
        </div>
      </div>

      {/* start modal  */}
      {isConnected && <ModalAccount />}
      {/* end modal  */}
    </div>
  )
}

export const ButtonUserConnected = () => {
  const { address } = useAccount()
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const handleClick = (idx: number) => {
    if (idx === 0) (document.getElementById('modal_account') as HTMLDialogElement)?.showModal();
    if (idx === 1) window.open(chain?.blockExplorers?.default.url as string + '/address/' + address, '_blank');
    if (idx === 2) disconnect();
  }
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
        <Blockies address="0x694aCF4DFb7601F92A0D2a41cdEC5bf7726C7294" customClass="w-4 h-4 rounded-full" />
        <div>{trimWallet(address as string)}</div>
        <Chevron customClass="w-4 h-4 rotate-[90deg]" />
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-5 shadow bg-base-100 rounded-box w-52">
        {
          listSubMenuAccount().map((item, index) => {
            return (
              <li key={`account-sub-menu-${index}`}>
                <button className="flex flex-row items-center gap-2" onClick={() => handleClick(index)}>
                  {item.icon}
                  {item.name}
                </button>
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
          <img src={`cryptos/${datas.listNetworkImage[chain?.name as keyof typeof datas.listNetworkImage]}`} alt={chain?.name} className="w-4 h-4" />
          <div>{chain?.name}</div>
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
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export const ModalAccount = () => {
  const { address } = useAccount()
  const { chain } = useNetwork();

  const [history, setHistory] = useState<readonly IHistory[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(datas.listNetworkKey[chain?.name as keyof typeof datas.listNetworkKey], chain?.name)
  const networkData = dataContract.networkDetail[datas.listNetworkKey[chain?.name as keyof typeof datas.listNetworkKey] as keyof typeof dataContract.networkDetail];

  const getHistory = useCallback(async () => {
    try {
      setLoading(true)
      const data = await readContract({
        abi: ShieldHub__factory.abi,
        address: networkData.ShieldHub as `0x${string}`,
        functionName: "getUserFullInfo",
        args: [address as `0x${string}`]
      })
      setHistory(data);
      setLoading(false);
    } catch (error) {
      setLoading(false)
    }
  }, [address, networkData?.ShieldHub])

  const dialogRef = useRef(document.createElement('dialog'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'open')) {
        if (dialogRef.current.open) {
          getHistory()
        }
      }
    });

    observer.observe(dialogRef.current, { attributes: true });

    return () => observer.disconnect();
  }, [getHistory]);

  const convertStrikePrice = (v: bigint, i: number, m: string) => {
    console.log(i)
    const d = dataContract.dataFeed[i === 0 ? 'assets' : 'nft']
    const e = d[datas.listNetworkKey[chain?.name as keyof typeof datas.listNetworkKey] as keyof typeof d]
    const filterData = e.filter((item) => item.contractName === m)
    const decimal = filterData.length === 0 ? 8 : filterData[0].decimal;
    return formatCurrency(v, decimal);
  }

  return (
    <dialog id="modal_account" className="modal" ref={dialogRef}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Your Account</h3>
        <div className="mt-6">
          <div className="flex items-center gap-4">
            <div className="flex-none">
              <Blockies address={address as string} customClass="w-14 h-14 rounded-full" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div>{trimWallet(address as string)}</div>
              <div className="items-center gap-4 hidden md:flex">
                <div className="badge badge-accent">Active ({history.filter((item) => item.status === 0).length})</div>
                <div className="badge badge-primary">Claimed ({history.filter((item) => item.status === 1).length})</div>
                <div className="badge badge-neutral">Expired ({history.filter((item) => item.status === 2).length})</div>
              </div>
            </div>
          </div>
          <div className="divider my-4">
            <Shield customClass="w-12 h-12 stroke-base-100 fill-primary" />
          </div>
          <div className="flex items-center justify-end mb-4">
            <button className="btn btn-primary btn-sm" onClick={() => getHistory()}>
              <Refresh customClass={`w-4 h-4 ${loading && 'animate-spin'}`} />
              <div>Refresh</div>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto">
            {
              history.toReversed().map((item, index) => {
                return (
                  <div key={index} className="border-[1px] border-base-content/5 rounded-sm p-3 grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="opacity-[0.5]">Assets Name</div>
                      <div>{item.market}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="opacity-[0.5]">Strike Price in {Number(item.iType) === 0 ? 'USD' : 'ETH'}</div>
                      <div>{convertStrikePrice(item.strikePrice, Number(item.iType), item.market)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="opacity-[0.5]">Premium Amount</div>
                      <div>{formatCurrency(item.amount, 18)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="opacity-[0.5]">Cover Amount</div>
                      <div>{formatCurrency(item.coverAmount, 18)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="opacity-[0.5]">Expire Time</div>
                      <div>{moment(Number(item.expireTime) * 1000).format('llll')}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="opacity-[0.5]">Status</div>
                      {
                        Number(item.status) === 0 && <div className="badge badge-accent">Active</div>
                      }
                      {
                        Number(item.status) === 1 && <div className="badge badge-primary">Claimed</div>
                      }
                      {
                        Number(item.status) === 2 && <div className="badge badge-neutral">Expired</div>
                      }
                    </div>
                  </div>
                )
              })
            }
            {
              (history.length === 0 && !loading) && <div className="text-center text-sm">You dont have any insurance <br /> or try refresh the data with the button above.</div>
            }
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
export default Header;