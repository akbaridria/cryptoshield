import { useState } from "react";
import datas from '@/data.json';

export const Accordions = () => {
  const [check, setCheck] = useState(0);

  return (
    <div>
      {
        datas.faq.map((item, index) => {
          return (
            <div key={`faq-${index}`} className="collapse collapse-plus bg-base-100">
              <input type="radio" name="accordion-faq" value={index} checked={check === index} onChange={() => setCheck(index)} />
              <div className="collapse-title text-base md:text-[1.2rem] font-medium">
                { item.question }
              </div>
              <div className="collapse-content">
                <p className="opacity-[0.5]">{ item.answer }</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}