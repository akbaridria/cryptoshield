import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';
import { DummyUsdc__factory, ShieldHub__factory } from "../typechain-types";
import { getPrice } from "./checkPrice";

async function main() {
  // 1. approve dummy usdc
  const dUsdcProvider = await ethers.getContractFactory("DummyUsdc");
  const dusdc = DummyUsdc__factory.connect(datas.networkDetail.avalanche.DummyUsdc, dUsdcProvider.runner);

  const amount = ethers.parseEther("10");
  const txApprove =  await dusdc.approve(datas.networkDetail.avalanche.ShieldHub, amount );
  await txApprove.wait();
  console.log("success approve at", txApprove.hash);

  // 2. buy insurance
  const shieldhubProvider = await ethers.getContractFactory("ShieldHub");
  const shieldhub = ShieldHub__factory.connect(datas.networkDetail.avalanche.ShieldHub, shieldhubProvider.runner);
  const price = await getPrice();
  const strikePrice = price - (2 * 10 ** 8);

  const txBuy = await shieldhub.buyInsurance(datas.dataFeed.assets.avalanche[0].contractName, amount, 1, strikePrice);
  await txBuy.wait();
  console.log("buy succes at ", txBuy.hash);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
