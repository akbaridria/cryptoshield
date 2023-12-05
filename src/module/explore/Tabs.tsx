import { ITabs } from "@/types"

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