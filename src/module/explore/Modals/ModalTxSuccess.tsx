import { Check } from "@/components/Icons";
import { IModalTx } from "@/types";
import { useNetwork } from "wagmi";

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