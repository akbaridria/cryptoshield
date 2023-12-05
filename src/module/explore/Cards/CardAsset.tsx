import { ICardAsset } from "@/types";
import { readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { ShieldHub__factory } from "../../../../protocol-contract/typechain-types";
import { formatCurrency } from "@/helper";
import datas from '../../../../protocol-contract/datas/contracts.json';
import data from '@/data.json';

export const CardAsset = ({ image, name, chain, setMarket }: ICardAsset) => {
  const { chain: chains } = useNetwork()
  const [price, setPrice] = useState(BigInt(0));
  const [loading, setLoading] = useState(false);
  const [decimal, setDecimal] = useState(0);

  useEffect(() => {
    try {
      if (datas.dataFeed.assets[data.listNetworkKey[chains?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.dataFeed.assets].filter((item) => item.contractName === name).length > 0) {
        setDecimal(datas.dataFeed.assets[data.listNetworkKey[chains?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.dataFeed.assets].filter((item) => item.contractName === name)[0].decimal)
      }
    } catch (error) {
      setDecimal(0);
    }
  }, [chains?.name, name])

  const handleBuy = () => {
    setMarket({
      price: price,
      market: name,
      assetType: 'Assets',
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
        console.log(dataPrice)
        setPrice(dataPrice);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    }

    getPrice();
  }, [chains?.name, name])

  return (
    <div className="card max-w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <img src={image} alt="Shoes" className='w-6 h-6' />
          <div>{name}</div>
          <div className="badge badge-secondary text-xs">{chain}</div>
        </h2>
        {loading && <div className='skeleton w-half h-8'></div>}
        {!loading && <p className="text-xl font-semibold text-accent">{formatCurrency(price, decimal)}</p>}
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm" onClick={() => handleBuy()} disabled={loading}>Buy Cover</button>
        </div>
      </div>
    </div>
  )
}
export default CardAsset;