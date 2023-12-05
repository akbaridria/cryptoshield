import { waitForTransaction, writeContract } from "@wagmi/core";
import { useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { DummyUsdc__factory } from "../../../../protocol-contract/typechain-types";
import datas from '../../../../protocol-contract/datas/contracts.json';
import data from '@/data.json';
import { Check } from "@/components/Icons";

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
            <div className='text-base'>Faucet</div>
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
