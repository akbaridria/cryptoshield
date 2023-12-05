'use client';

import { FormBuy, ListAssets } from '@/types';
import datas from '../../../protocol-contract/datas/contracts.json';
import data from '@/data.json'
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from 'wagmi';
import { DisconnectWallet, EmptyState } from '@/components/Icons';
import CardAsset from '@/module/explore/Cards/CardAsset';
import { CardNFT } from '@/module/explore/Cards/CardNFT';
import { Tabs } from '@/module/explore/Tabs';
import { ModalBuy } from '@/module/explore/Modals/ModalBuy';
import { ModalTxSuccess } from '@/module/explore/Modals/ModalTxSuccess';
import { ModalFaucet } from '@/module/explore/Modals/ModalFaucet';

export const Explore = () => {
  const tabs = ['Assets', 'NFTs'];
  const { chain } = useNetwork()
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [listAssets, setListAssets] = useState<ListAssets[]>([]);
  const [listNFTs, setListNFTs] = useState<ListAssets[]>([]);
  const [modalValue, setModalValue] = useState<FormBuy>({
    assetType: 'Assets',
    decimal: 8,
    price: BigInt(0),
    market: ''
  })
  const [tx, setTx] = useState('');

  useEffect(() => {
    if (!!data.listNetworkKey[chain?.name as keyof typeof data.listNetworkKey]) {
      setListAssets(datas.dataFeed.assets[data.listNetworkKey[chain?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.dataFeed.assets])
      setListNFTs(datas.dataFeed.nft[data.listNetworkKey[chain?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.dataFeed.nft]);
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
            {
              isConnected &&
              <div className='mt-3'>
                <button className='btn btn-sm btn-primary' onClick={() => (document.getElementById("modal_faucet") as HTMLDialogElement).showModal()}>
                  Get Faucet
                </button>
              </div>
            }
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs listab={tabs} tabname={activeTab} setTab={setActiveTab} />
        {
          isConnected &&
          <>
            <div className="my-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                  activeTab === 'Assets' && listAssets.map((item, index) => {
                    return (
                      <CardAsset key={`card-asset-${index}`} name={item.contractName} image={`cryptos/${item.image}`} chain={chain?.name as string} setMarket={(v: FormBuy) => setModalValue(v)} />
                    )
                  })
                }

                {
                  activeTab === "NFTs" && listNFTs.map((item, index) => {
                    return (
                      <CardNFT key={`card-nft-${index}`} name={item.contractName} image={`cryptos/${item.image}`} chain={chain?.name as string} setMarket={(v: FormBuy) => setModalValue(v)} />
                    )
                  })
                }
              </div>
            </div>
            {
              ((activeTab === 'Assets' && listAssets.length === 0) || (activeTab === 'NFTs' && listNFTs.length === 0)) &&
              <div className='flex flex-col items-center justify-center w-full -my-10'>
                <EmptyState />
                <div className='text-2xl font-bold'>No Market Is Available</div>
                <div className='opacity-[0.5]'>Seems like there&apos;s no {activeTab} market insurance for this chain</div>
              </div>
            }
          </>
        }
        {
          !isConnected &&
          <div className='flex flex-col items-center justify-center w-full my-10'>
            <DisconnectWallet />
            <div className='text-2xl font-bold'>Wallet is not connected</div>
            <div className='opacity-[0.5]'>Connect your wallet to get started</div>
          </div>
        }
      </div>

      {/* start modal  */}
      <ModalBuy price={modalValue.price} assetType={modalValue.assetType} decimal={modalValue.decimal} market={modalValue.market} setTx={(v: string) => setTx(v)} />
      <ModalTxSuccess tx={tx} />
      <ModalFaucet />
      {/* end modal  */}
    </div>
  )
}
export default Explore;