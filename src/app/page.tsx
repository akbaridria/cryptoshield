'use client';

import { Claims, Liquidity, Shield, Underwritten } from "@/components/Icons";
import { listBenefit } from "@/helper";
import { useState } from "react";
import datas from '@/data.json';

export default function Home() {
  return (
    <main>
      <section className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="text-center">
            <div className="brightness-150 text-[2rem] md:text-[3.625rem]  font-bold max-w-full w-[800px] mx-auto leading-tight">
              Safeguarding Your Digital <span className="text-primary">Assets</span> & <span className="text-secondary">NFTs</span> with Insurance
            </div>
            <div className="max-w-full w-[800px] mx-auto mt-8 text-md md:text-base">
              Leveraging the power of <span className="brightness-150 font-semibold">Chainlink price feeds</span>, our platform detects market fluctuations and automatically
              triggers actions when asset prices hit predefined strike points. This seamless automation is using <span className="brightness-150 font-semibold">chainlink automation</span> to ensures that users
              receive rewards or insurance payouts in real-time, offering unparalleled protection for your valuable investments in the
              volatile crypto space
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button className="btn btn-primary btn-sm">Launch App</button>
            <button className="btn btn-link">Read more</button>
          </div>
          <div className="flex items-center justify-center mt-12">
            <div className="stats stats-vertical lg:stats-horizontal shadow w-[800px] max-w-full">
              <div className="stat">
                <div className="stat-figure text-primary"><Liquidity customClass="w-8 h-8 stroke-primary" /></div>
                <div className="stat-title">Total Liquidity</div>
                <div className="stat-value text-primary">$31M</div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary"><Underwritten customClass="w-8 h-8 stroke-secondary fill-secondary" /></div>
                <div className="stat-title">Cover Underwritten</div>
                <div className="stat-value text-secondary">$1M</div>
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
              </div>

              <div className="stat">
                <div className="stat-figure text-primary"><Claims customClass="w-8 h-8 stroke-primary" /></div>
                <div className="stat-title">Claims Paid</div>
                <div className="stat-value text-primary">$12M</div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="divider my-12">
        <Shield customClass="w-12 h-12 stroke-base-100 fill-primary" />
      </div>
      <section className="container mx-auto p-6">
        <div>
          <div className="text-center text-[1.5rem] md:text-[2.5rem] font-bold mb-24">
            The Benefit of CryptoShield
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
              listBenefit().map((item, index) => {
                return (
                  <div key={index} className="card w-96 bg-base-100 shadow-xl justify-self-center">
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">
                        {item.title}
                      </h2>
                      <p className="brightness-50">{item.description}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>

      <div className="divider my-12">
        <Shield customClass="w-12 h-12 stroke-base-100 fill-primary" />
      </div>

      <section className="w-[800px] max-w-full mx-auto p-6">
        <div>
          <h2 className="text-[1.5rem] md:text-[2.5rem] font-bold text-center mb-12">You Ask, We Answer</h2>
          <Accordions />
        </div>
      </section>
    </main>
  )
}

export const Accordions = () => {
  const [check, setCheck] = useState(0);

  return (
    <div>
      {
        datas.faq.map((item, index) => {
          return (
            <div key={`faq-${index}`} className="collapse collapse-plus bg-base-200">
              <input type="radio" name="accordion-faq" value={index} checked={check === index} onChange={() => setCheck(index)} />
              <div className="collapse-title text-base md:text-xl font-medium">
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