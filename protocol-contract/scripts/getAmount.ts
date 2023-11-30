import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';
import { ShieldHub__factory } from "../typechain-types";
import { getPrice } from "./checkPrice";

async function main() {

  const shieldhubProvider = await ethers.getContractFactory("ShieldHub");
  const shieldhub = ShieldHub__factory.connect(datas.networkDetail.avalanche.ShieldHub, shieldhubProvider.runner);
  const latestPrice = await getPrice();

  const amount = latestPrice - (2 * 10 ** 8);
  console.log( (((BigInt(latestPrice) - BigInt(amount)) * BigInt(100)) / BigInt(latestPrice)) * BigInt(10 * 10 ** 8))
  const t = await shieldhub.calculateCoverAmount(BigInt(10 * 10 ** 8), BigInt(amount), latestPrice);
  console.log(t)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
