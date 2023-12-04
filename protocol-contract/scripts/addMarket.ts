import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';
import { ShieldHub__factory } from "../typechain-types";

async function main() {

  const shieldhubProvider = await ethers.getContractFactory("ShieldHub");
  const shieldhub = ShieldHub__factory.connect(datas.networkDetail.avalanche.ShieldHub, shieldhubProvider.runner);
  const dataAssets = datas.dataFeed.assets[network.name as keyof typeof datas.dataFeed.assets];
  console.log("Add asset market :")
  console.log("===============================")
  for(let i in dataAssets ) {
    const tx = await shieldhub.addMarket(dataAssets[i].contractName, dataAssets[i].contractAddress);
    await tx.wait();
    console.log("done add asset market at : ", tx.hash);
  }
  const dataNft = datas.dataFeed.nft[network.name as keyof typeof datas.dataFeed.nft];
  console.log("")
  console.log("Add nft market :")
  console.log("===============================")
  for(let i in dataNft) {
    const tx = await shieldhub.addMarket(dataNft[i].contractName, dataNft[i].contractAddress);
    await tx.wait();
    console.log("done add nft market at : ", tx.hash);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
