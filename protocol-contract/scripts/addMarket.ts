import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';
import { ShieldHub__factory } from "../typechain-types";

async function main() {

  const shieldhubProvider = await ethers.getContractFactory("ShieldHub");
  const shieldhub = ShieldHub__factory.connect(datas.networkDetail.avalanche.ShieldHub, shieldhubProvider.runner);
  const tx = await shieldhub.addMarket(datas.dataFeed.assets.avalanche[0].contractName, datas.dataFeed.assets.avalanche[0].contractAddres);
  await tx.wait();
  console.log("done add market at : ", tx.hash);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
