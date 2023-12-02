'use client';

import { ICardAsset, ICardNFT, ITabs, ListAssets } from '@/types';
import datas from '../../../protocol-contract/datas/contracts.json';
import { listNetworkKey } from '@/data.json'
import { useEffect, useState } from "react";
import { useNetwork } from 'wagmi';
import { EmptyState } from '@/components/Icons';

export const Explore = () => {
  const tabs = ['Assets', 'NFTs'];
  const { chain } = useNetwork()
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [listAssets, setListAssets] = useState<ListAssets[]>([]);
  const [listNFTs, setListNFTs] = useState<ListAssets[]>([]);

  useEffect(() => {
    if (!!listNetworkKey[chain?.name as keyof typeof listNetworkKey]) {
      setListAssets(datas.dataFeed.assets[listNetworkKey[chain?.name as keyof typeof listNetworkKey] as keyof typeof datas.dataFeed.assets])
      setListNFTs(datas.dataFeed.nft[listNetworkKey[chain?.name as keyof typeof listNetworkKey] as keyof typeof datas.dataFeed.nft]);
    } else {
      setListAssets([]);
      setListNFTs([]);
    }
  }, [chain?.name]);

  return (
    <div className='min-h-screen'>
      <div className="bg-base-200 h-[200px] min-h-fit">
        <div className="container mx-auto p-6 flex items-center h-full">
          <div className="min-h-fit">
            <div className="font-bold text-[2rem]">
              Browse Insurance
            </div>
            <div className="text-[1rem] font-semibold opacity-[0.5]">
              In the volatile world of crypto, Cryptoshield is your shield against unforeseen storms.
              Protect your digital assets and navigate the market with confidence.
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs listab={tabs} tabname={activeTab} setTab={setActiveTab} />
        <div className="my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              activeTab === 'Assets' && listAssets.map((item, index) => {
                return (
                  <CardAsset key={`card-asset-${index}`} name={item.contractName} image={`cryptos/${item.image}`} chain={chain?.name as string} />
                )
              })
            }

            {
              activeTab === "NFTs" && listNFTs.map((item, index) => {
                return (
                  <CardNFT key={`card-nft-${index}`} name={item.contractName} image={`cryptos/${item.image}`} chain={chain?.name as string} />
                )
              })
            }
          </div>
        </div>
        {
          ((activeTab === 'Assets' && listAssets.length === 0) || (activeTab === 'NFTs' && listNFTs.length === 0)) && <div className='flex flex-col items-center justify-center w-full -my-10'>
            <EmptyState />
            <div className='text-2xl font-bold'>No Market Is Available</div>
            <div className='opacity-[0.5]'>Seems like there&apos;s no {activeTab} market insurance for this chain</div>
          </div>
        }
      </div>

      {/* start modal  */}
      <ModalBuy />
      {/* end modal  */}
    </div>
  )
}

export const CardAsset = ({ image, name, chain }: ICardAsset) => {
  return (
    <div className="card max-w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <img src={image} alt="Shoes" className='w-6 h-6' />
          {name}
          <div className="badge badge-secondary text-xs">{chain}</div>
        </h2>
        <p className="text-xl font-semibold text-accent">$36,000</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm" onClick={() => (document.getElementById('modal_buy') as HTMLDialogElement)?.showModal()}>Buy Cover</button>
        </div>
      </div>
    </div>
  )
}

export const CardNFT = ({ image, name, chain }: ICardNFT) => {
  return (
    <div className="card max-w-full bg-base-200 shadow-xl">
      <figure><img src={image} alt="Shoes" className='w-full h-24 object-cover' /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary text-xs">{chain}</div>
        </h2>
        <p className="text-xl font-semibold text-accent">$36,000</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">Buy Cover</button>
        </div>
      </div>
    </div>
  )
}

export const Tabs = ({ tabname, listab, setTab }: ITabs) => {

  return (
    <div role="tablist" className="tabs tabs-boxed w-fit">
      {
        listab.map((item, index) => {
          return (
            <a key={`tab-${index}`} role="tab" className={`tab ${tabname === item ? 'tab-active opacity-[1]' : 'opacity-[0.5]'} hover:opacity-[1] hover: transition-all `} onClick={() => setTab(item)}>
              {item}
            </a>
          )
        })
      }
    </div>
  )
}

export const ModalBuy = () => {
  return (
    <dialog id="modal_buy" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Order Confirmation</h3>
        <div className='mt-5'>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>1</div>
                <div>Insurance Type</div>
              </span>
            </div>
            <input type="text" placeholder="Type here" value={"Akuzi (NFT)"} className="input input-ghost input-md w-full" disabled />
          </label>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>2</div>
                <div>Current Price in USD</div>
              </span>
            </div>
            <input type="text" placeholder="Type here" value={"35.000,53"} className="input input-ghost input-md w-full" disabled />
          </label>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>3</div>
                <div>Strike Price</div>
              </span>
              <span className="label-text-alt">Your balance : 1000</span>
            </div>
            <input type="text" placeholder="Input Strike Price here" className="input input-ghost input-md bg-[#1c1c1c] focus:outline-none focus:border-none w-full" />
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt">You will receive $99,000</span>
            </div>
          </label>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            <button className='btn btn-primary btn-sm w-full'>
              Approve
            </button>
            <button className='btn btn-primary btn-sm w-full' disabled={true}>
              Buy Cover
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default Explore;