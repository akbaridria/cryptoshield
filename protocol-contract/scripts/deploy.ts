import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';

async function main() {
  // 1. deploy dummy usdc
  // const dUsdc = await ethers.deployContract("DummyUsdc");
  // await dUsdc.waitForDeployment();
  // console.log("deploy dummy usdc at ", dUsdc.target);

  // 2. deploy upkeep
  const upkeep = await ethers.deployContract("UpkeepIDConditional", [datas.networkDetail.avalanche.chainlink.linkToken, datas.networkDetail.avalanche.chainlink.regstrarAutomation]);
  await upkeep.waitForDeployment();
  console.log("deploy upkeep at ", upkeep.target);

  // 3. deploy shieldhub
  const shieldhub = await ethers.deployContract("ShieldHub", [datas.networkDetail.avalanche.DummyUsdc, upkeep.target]);
  await shieldhub.waitForDeployment();
  console.log("deploy shieldhub at ", shieldhub.target);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
