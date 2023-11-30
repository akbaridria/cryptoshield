import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';
import { ShieldHub__factory } from "../typechain-types";

async function main() {

  const shieldhubProvider = await ethers.getContractFactory("ShieldHub");
  const shieldhub = ShieldHub__factory.connect(datas.networkDetail.avalanche.ShieldHub, shieldhubProvider.runner);
  const userInfo = await shieldhub.getUserFullInfo("0x694acf4dfb7601f92a0d2a41cdec5bf7726c7294")
  console.log(userInfo);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
