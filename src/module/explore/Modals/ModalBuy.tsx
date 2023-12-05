import { FormBuy, LoadingFormBuy } from "@/types";
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAccount, useNetwork } from "wagmi";
import { DummyUsdc__factory, ShieldHub__factory } from "../../../../protocol-contract/typechain-types";
import { formatCurrency } from "@/helper";
import datas from '../../../../protocol-contract/datas/contracts.json';
import data from '@/data.json';

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
  const [limit, setLimit] = useState(BigInt(0));

  const { chain } = useNetwork();
  const { address } = useAccount();

  const [debounced] = useDebounce(value, 500);
  const [debouncedStrike] = useDebounce(strikePrice, 500);

  const networkData = datas.networkDetail[data.listNetworkKey[chain?.name as keyof typeof data.listNetworkKey] as keyof typeof datas.networkDetail];

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
      try {
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
      } catch (error) {
        setLoading(prevState => ({
          ...prevState,
          loadingCover: false
        }))
      }
    }

    if (!!debounced && !!debouncedStrike) {
      getData()
    }
  }, [debounced, debouncedStrike, decimal, networkData?.ShieldHub, price])

  const getApproval = useCallback(async () => {
    try {
      setLoading(prevState => ({
        ...prevState,
        loadingApprove: true
      }))
      const data = await readContract({
        abi: DummyUsdc__factory.abi,
        address: networkData?.DummyUsdc as `0x${string}`,
        functionName: 'allowance',
        args: [address as `0x${string}`, networkData?.ShieldHub as `0x${string}`]
      })
      setAllowance(data);
      setLoading(prevState => ({
        ...prevState,
        loadingApprove: false
      }))
    } catch (error) {
      setLoading(prevState => ({
        ...prevState,
        loadingApprove: false
      }))
    }
  }, [address, networkData?.DummyUsdc, networkData?.ShieldHub])

  const getBalance = useCallback(async () => {
    try {
      setLoading(prevState => ({
        ...prevState,
        loadingBalance: true
      }))
      const data = await readContract({
        abi: DummyUsdc__factory.abi,
        address: networkData?.DummyUsdc as `0x${string}`,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      })
      setBalance(data);
      setLoading(prevState => ({
        ...prevState,
        loadingBalance: false
      }))
    } catch (error) {
      setLoading(prevState => ({
        ...prevState,
        loadingBalance: false
      }))
    }
  }, [address, networkData?.DummyUsdc])

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
        args: [market, BigInt(Number(value) * (10 ** 18)), BigInt(assetType === 'Assets' ? 0 : 1), BigInt(Number(strikePrice) * (10 ** decimal))],
      })

      const data = await waitForTransaction({
        hash: hash
      })
      setLoading(prevState => ({
        ...prevState,
        loadingBuy: false
      }))
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
        address: networkData?.DummyUsdc as `0x${string}`,
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

  const getLimit = useCallback(async () => {
    const r = await readContract({
      abi: ShieldHub__factory.abi,
      address: networkData.ShieldHub as `0x${string}`,
      functionName: "getLimitCover"
    })

    setLimit(r);
  }, [networkData?.ShieldHub])

  const dialogRef = useRef(document.createElement('dialog'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'open')) {
        if (dialogRef.current.open) {
          setCoverAmount(BigInt(0));
          setStrikePrice('');
          setValue('');
          getApproval();
          getBalance();
          getLimit();
        }
      }
    });

    observer.observe(dialogRef.current, { attributes: true });

    return () => observer.disconnect();
  }, [getApproval, getBalance, getLimit]);

  return (
    <dialog id="modal_buy" className="modal" ref={dialogRef}>
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
          <span className="label-text flex items-center gap-2 px-1">
            <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs'>5</div>
            <div>Amount Premium</div>
          </span>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text flex items-center gap-1 text-xs">Max Limit Cover: {formatCurrency(limit, 18)} <img src="cryptos/usdc.svg" alt="" className='w-3 h-3' /></span>
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