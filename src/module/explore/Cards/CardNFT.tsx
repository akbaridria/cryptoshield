import { ICardNFT } from "@/types";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { ShieldHub__factory } from "../../../../protocol-contract/typechain-types";
import datas from '../../../../protocol-contract/datas/contracts.json';
import data from '@/data.json';
import { formatCurrency } from "@/helper";

export const CardNFT = ({ image, name, chain, setMarket }: ICardNFT) => {
  const { chain: chains } = useNetwork()
  const [price, setPrice] = useState(BigInt(0));
  const [loading, setLoading] = useState(false);
  const [decimal, setDecimal] = useState(0);

  useEffect(() => {
    if (datas.dataFeed.nft[data.listNetworkKey[chains?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.dataFeed.nft].filter((item) => item.contractName === name).length > 0) {
      setDecimal(datas.dataFeed.nft[data.listNetworkKey[chains?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.dataFeed.nft].filter((item) => item.contractName === name)[0].decimal)

    }
  }, [chains?.name, name])

  const handleBuy = () => {
    setMarket({
      price: price,
      market: name,
      assetType: 'NFTs',
      decimal: decimal
    });
    (document.getElementById('modal_buy') as HTMLDialogElement)?.showModal()
  }
  useEffect(() => {
    const getPrice = async () => {
      try {
        setLoading(true);
        const dataPrice = await readContract({
          address: datas.networkDetail[data.listNetworkKey[chains?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.networkDetail].ShieldHub as `0x${string}`,
          abi: ShieldHub__factory.abi,
          functionName: "checkPrice",
          args: [name]
        });
        setPrice(dataPrice);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getPrice();
  }, [chains?.name, name])

  return (
    <div className="card max-w-full bg-base-200 shadow-xl">
      <figure><img src={image} alt="Shoes" className='w-full h-24 object-cover' /></figure>
      <div className="card-body">
        <h2 className="card-title">
          <div>{name}</div>
          <div className="badge badge-secondary text-xs">{chain}</div>
        </h2>
        {loading && <div className='skeleton w-half h-8'></div>}
        {!loading && <p className="text-xl font-semibold text-accent flex items-center gap-1">{formatCurrency(price, decimal)} <img src="cryptos/eth.svg" className='w-5 h-5 rounded-full' alt="" /></p>}
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm" onClick={() => handleBuy()} disabled={loading}>Buy Cover</button>
        </div>
      </div>
    </div>
  )
}
