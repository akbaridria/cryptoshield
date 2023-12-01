'use client';

import datas from '../../../protocol-contract/datas/contracts.json';
import { useState } from "react";

export const Explore = () => {
  const tabs = ['Assets', 'NFTs'];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
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
        <div className='flex items-center justify-between'>
          <Tabs listab={tabs} tabname={activeTab} setTab={setActiveTab} />
          <button className='btn btn-outline btn-sm'>
            Your cover
          </button>
        </div>
        <div className="my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              activeTab === 'Assets' && datas.dataFeed.assets.ethereum.map((item, index) => {
                return (
                  <div key={`card-insurance-${index}`} className="card max-w-full bg-base-200 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">
                        <img src={`cryptos/${item.image}`} alt="Shoes" className='w-6 h-6' />
                        {item.contractName}
                        <div className="badge badge-secondary text-xs">Avalanche</div>
                      </h2>
                      <p className="text-xl font-semibold text-accent">$36,000</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm">Buy Cover</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }

            {
              activeTab === "NFTs" && datas.dataFeed.nft.ethereum.map((item, index) => {
                return (
                  <div key={`nft-${index}`} className="card max-w-full bg-base-200 shadow-xl">
                    <figure><img src={`cryptos/${item.image}`} alt="Shoes" className='w-full h-24 object-cover' /></figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        { item.contractName }
                        <div className="badge badge-secondary text-xs">Avalanche</div>
                      </h2>
                      <p className="text-xl font-semibold text-accent">$36,000</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm">Buy Cover</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
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

export default Explore;