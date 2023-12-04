'use client';

import { FormBuy, ICardAsset, ICardNFT, IModalTx, ITabs, ListAssets, LoadingFormBuy } from '@/types';
import datas from '../../../protocol-contract/datas/contracts.json';
import data from '@/data.json'
import { useCallback, useEffect, useState } from "react";
import { useAccount, useNetwork } from 'wagmi';
import { Check, DisconnectWallet, EmptyState } from '@/components/Icons';
import { readContract, waitForTransaction, writeContract } from '@wagmi/core'
import { DummyUsdc__factory, ShieldHub__factory } from '../../../protocol-contract/typechain-types'
import { formatCurrency } from '@/helper';
import { useDebounce } from 'use-debounce';

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
                      <CardNFT key={`card-nft-${index}`} name={item.contractName} image={`cryptos/${item.image}`} chain={chain?.name as string} />
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

export const CardAsset = ({ image, name, chain, setMarket }: ICardAsset) => {
  const { chain: chains } = useNetwork()
  const [price, setPrice] = useState(BigInt(0));
  const [loading, setLoading] = useState(false);
  const decimal = datas.dataFeed.assets[data.listNetworkKey[chains?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.dataFeed.assets].filter((item) => item.contractName === name)[0].decimal;
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
      setLoading(true);
      const dataPrice = await readContract({
        address: datas.networkDetail[data.listNetworkKey[chains?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.networkDetail].ShieldHub as `0x${string}`,
        abi: ShieldHub__factory.abi,
        functionName: "checkPrice",
        args: [name]
      });
      setPrice(dataPrice);
      setLoading(false);
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

export const ModalBuy = ({ price, assetType, decimal, market, setTx }: FormBuy) => {
  const [value, setValue] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [allowance, setAllowance] = useState(BigInt(0));
  const [balance, setBalance] = useState(BigInt(0));
  const [loading, setLoading] = useState<LoadingFormBuy>({
    loadingApprove: false,
    loadingBalance: false,
    loadingBuy: false,
    loadingCover: false
  })
  const [coverAmount, setCoverAmount] = useState(BigInt(0));

  const { chain } = useNetwork();
  const { address } = useAccount();

  const [debounced] = useDebounce(value, 500);
  const [debouncedStrike] = useDebounce(strikePrice, 500);

  const handleValue = (v: string, isPremium = true) => {
    let filteredValue = v.replace(/[^0-9.]/g, '');
    let dotCount = (filteredValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      filteredValue = filteredValue.replace(/\./g, (match, index) => index === filteredValue.indexOf('.') ? '.' : '');
    }
    if (isPremium) {
      setValue(filteredValue);
    } else {
      setStrikePrice(filteredValue);
    }
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(prevState => ({
        ...prevState,
        loadingCover: true
      }))
      const data = await readContract({
        abi: ShieldHub__factory.abi,
        address: networkData.ShieldHub as `0x${string}`,
        functionName: 'calculateCoverAmount',
        args: [BigInt(Number(debounced) * (10 ** 18)), BigInt((Number(debouncedStrike) * (10 ** decimal))), price]
      })
      if (!!data) {
        setCoverAmount(data);
      }
      setLoading(prevState => ({
        ...prevState,
        loadingCover: false
      }))
    }

    if (!!debounced && !!debouncedStrike) {
      getData()
    }
  }, [debounced, debouncedStrike])

  const networkData = datas.networkDetail[data.listNetworkKey[chain?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.networkDetail];
  const getApproval = useCallback(async () => {
    setLoading(prevState => ({
      ...prevState,
      loadingApprove: true
    }))
    const data = await readContract({
      abi: DummyUsdc__factory.abi,
      address: networkData.DummyUsdc as `0x${string}`,
      functionName: 'allowance',
      args: [address as `0x${string}`, networkData.ShieldHub as `0x${string}`]
    })
    setAllowance(data);
    setLoading(prevState => ({
      ...prevState,
      loadingApprove: false
    }))
  }, [address])

  const getBalance = useCallback(async () => {
    setLoading(prevState => ({
      ...prevState,
      loadingBalance: true
    }))
    const data = await readContract({
      abi: DummyUsdc__factory.abi,
      address: networkData.DummyUsdc as `0x${string}`,
      functionName: "balanceOf",
      args: [address as `0x${string}`]
    })
    setBalance(data);
    setLoading(prevState => ({
      ...prevState,
      loadingBalance: false
    }))
  }, [address])

  useEffect(() => {
    if (!!price && !!assetType && !!decimal && !!market) {
      setCoverAmount(BigInt(0));
      setStrikePrice('');
      setValue('');
      getApproval();
      getBalance();
      console.log('here')
    }
  }, [price, assetType, decimal, market, getApproval, getBalance])

  const handleBuy = async () => {
    try {
      setLoading(prevState => ({
        ...prevState,
        loadingBuy: true
      }))
      const { hash } = await writeContract({
        abi: ShieldHub__factory.abi,
        address: networkData.ShieldHub as `0x${string}`,
        functionName: "buyInsurance",
        args: [market, BigInt(Number(value) * (10 ** 18)), BigInt(0), BigInt(Number(strikePrice) * (10 ** decimal))]
      })

      const data = await waitForTransaction({
        hash: hash
      })
      setLoading(prevState => ({
        ...prevState,
        loadingBuy: false
      }))
      console.log(data.status)
      if (data.status === 'success') {
        if (!!setTx) {
          setTx(data.transactionHash);
          (document.getElementById("modal_tx") as HTMLDialogElement).showModal();
          (document.getElementById("modal_buy") as HTMLDialogElement).close();
        }
      } else {
        alert("transation reverted!");
      }
    } catch (error) {
      console.log(error)
      setLoading(prevState => ({
        ...prevState,
        loadingBuy: false
      }))
    }
  }

  const handleApprove = async () => {
    setLoading(prevState => ({
      ...prevState,
      loadingApprove: true
    }))

    try {
      const { hash } = await writeContract({
        abi: DummyUsdc__factory.abi,
        address: networkData.DummyUsdc as `0x${string}`,
        functionName: "approve",
        args: [networkData.ShieldHub as `0x${string}`, BigInt(Number(value) * (10 ** 18))]
      })

      const data = await waitForTransaction({
        hash: hash
      })

      await getApproval();

      setLoading(prevState => ({
        ...prevState,
        loadingApprove: false
      }))
      if (data.status === 'success') {
        console.log("approve success")
      } else {
        alert("Transaction Failed!");
      }
    } catch (error) {
      setLoading(prevState => ({
        ...prevState,
        loadingApprove: false
      }))
    }
  }
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
            <input type="text" placeholder="Type here" value={market} className="input input-ghost input-md w-full" disabled />
          </label>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>2</div>
                <div>Current Price in {assetType === 'Assets' ? 'USD' : 'ETH'}</div>
              </span>
            </div>
            <input type="text" placeholder="Type here" value={formatCurrency(price, decimal)} className="input input-ghost input-md w-full" disabled />
          </label>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>3</div>
                <div>Expire Time</div>
              </span>
            </div>
            <input type="text" placeholder="Type here" value={"1 Month"} className="input input-ghost input-md w-full" disabled />
          </label>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>4</div>
                <div>Strike Price in {assetType === 'Assets' ? 'USD' : 'ETH'}</div>
              </span>
            </div>
            <input type="text" placeholder="Input Strike Price here" className="input input-ghost input-md bg-[#1c1c1c] focus:outline-none focus:border-none w-full" value={strikePrice} onChange={(v) => handleValue(v.target.value, false)} />
            <div className="label">
              <span className="label-text-alt">
                {
                  !!strikePrice ? BigInt(Number(strikePrice) * (10 ** decimal)) >= price ? <div className='text-red-600'>strike price should be lower than current price</div> : null : null
                }
              </span>
            </div>
          </label>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text flex items-center gap-2">
                <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>5</div>
                <div>Amount Premium</div>
              </span>
              <span className="label-text-alt">Your balance : {loading.loadingBalance ? <span className="loading loading-spinner loading-xs"></span> : <span> {formatCurrency(balance, 18)}</span>} {Number(balance) === 0 && (<span role='button' className='underline' onClick={() => { ((document.getElementById("modal_buy") as HTMLDialogElement).close(), (document.getElementById("modal_faucet") as HTMLDialogElement).showModal()) }}>(get faucet)</span>)}</span>
            </div>
            <input type="text" placeholder="Input your premium amount here" className="input input-ghost input-md bg-[#1c1c1c] focus:outline-none focus:border-none w-full" value={value} onChange={(v) => handleValue(v.target.value)} />
            <div className="label">
              <span className="label-text-alt">
                {!!value ? BigInt(Number(value) * (10 ** 18)) > balance && <div className='text-red-600'>Insuficient Balance</div> : null}
              </span>
              <span className="label-text-alt">You will receive: {loading.loadingCover ? <span className="loading loading-spinner loading-xs"></span> : <span className='text-secondary font-semibold'>{formatCurrency(coverAmount, 18)}</span>}</span>
            </div>
          </label>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            <button className='btn btn-primary btn-sm w-full' disabled={loading.loadingApprove || allowance >= BigInt(Number(value) * (10 ** 18))} onClick={() => handleApprove()}>
              {loading.loadingApprove && <span className="loading loading-spinner loading-xs"></span>} Approve
            </button>
            <button className='btn btn-primary btn-sm w-full' disabled={loading.loadingBuy || !(allowance >= BigInt(Number(value) * (10 ** 18)) && !!value)} onClick={() => handleBuy()}>
              {loading.loadingBuy && <span className="loading loading-spinner loading-xs"></span>} Buy Cover
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

export const ModalTxSuccess = ({ tx }: IModalTx) => {
  const { chain } = useNetwork()
  const handleCover = () => {
    (document.getElementById("modal_tx") as HTMLDialogElement).close();
    (document.getElementById("modal_account") as HTMLDialogElement).showModal();
  }
  return (
    <>
      <dialog id="modal_tx" className="modal">
        <div className="modal-box max-w-full w-[400px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className='flex items-center justify-center flex-col'>
            <Check customClass='w-32 h-32 fill-primary' />
            <h3 className="font-bold text-lg text-center mt-6">Transaction Success</h3>
            <p className='opacity-[0.5] text-center'>Your transaction is success, you can see all your cover at your account -{'>'} your cover. or click your cover button below.</p>
          </div>
          <div className='grid grid-cols-2 gap-2 mt-8'>
            <button className='btn btn-outline btn-sm' onClick={() => handleCover()}>
              Your Cover
            </button>
            <a href={chain?.blockExplorers?.default.url + '/tx/' + tx} target="_blank" rel="noopener noreferrer" className='w-full'>
              <button className='btn btn-primary btn-sm w-full'>
                View on explorer
              </button>
            </a>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export const ModalFaucet = () => {
  const { chain } = useNetwork()
  const { address } = useAccount();
  const [tx, setTx] = useState('');
  const [loading, setLoading] = useState(false);

  const getFaucet = async () => {
    try {
      setLoading(true);

      const dusdc = datas.networkDetail[data.listNetworkKey[chain?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.networkDetail].DummyUsdc;
      const d = await writeContract({
        abi: DummyUsdc__factory.abi,
        address: dusdc as `0x${string}`,
        functionName: "faucet",
        args: [address as `0x${string}`]
      })

      const dat = await waitForTransaction({
        hash: d.hash
      })
      setTx(dat.transactionHash);
      setLoading(false);

      (document.getElementById("modal_faucet") as HTMLDialogElement).close();
      (document.getElementById("modal_tx_faucet") as HTMLDialogElement).showModal();
    } catch (error) {
      setLoading(false);
    }

  }
  return (
    <>
      <dialog id="modal_faucet" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Faucet</h3>
          <p className="py-4 text-base-content flex items-center">Get 200 Dummy USDC <img src="cryptos/usdc.svg" className='w-4 h-4 mr-2 ml-1' alt="" /> for testing</p>
          <input type="text" placeholder="Type here" value={"200"} className="input input-ghost input-md w-full" disabled />
          <button className='btn btn-primary btn-md w-full mt-4' disabled={loading} onClick={() => getFaucet()}>
            {loading && <span className="loading loading-spinner loading-xs"></span>}
            <div>Faucet</div>
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="modal_tx_faucet" className="modal">
        <div className="modal-box max-w-full w-[400px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className='flex items-center justify-center flex-col'>
            <Check customClass='w-32 h-32 fill-primary' />
            <h3 className="font-bold text-lg text-center mt-6">Transaction Success</h3>
            <p className='opacity-[0.5] text-center'>Your transaction is success</p>
          </div>
          <div className='grid grid-cols-1 gap-2 mt-8'>
            <a href={chain?.blockExplorers?.default.url + '/tx/' + tx} target="_blank" rel="noopener noreferrer" className='w-full'>
              <button className='btn btn-primary btn-sm w-full'>
                View on explorer
              </button>
            </a>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}


export const ModalFaucetTx = ({ tx }: IModalTx) => {
  const { chain } = useNetwork()
  return (
    <>
      <dialog id="modal_tx" className="modal">
        <div className="modal-box max-w-full w-[400px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className='flex items-center justify-center flex-col'>
            <Check customClass='w-32 h-32 fill-primary' />
            <h3 className="font-bold text-lg text-center mt-6">Transaction Success</h3>
            <p className='opacity-[0.5] text-center'>Your transaction is success</p>
          </div>
          <div className='grid grid-cols-1 gap-2 mt-8'>
            <a href={chain?.blockExplorers?.default.url + '/tx/' + tx} target="_blank" rel="noopener noreferrer" className='w-full'>
              <button className='btn btn-primary btn-sm w-full'>
                View on explorer
              </button>
            </a>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
export default Explore;