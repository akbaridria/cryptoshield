import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';

async function main() {
  // 1. deploy dummy usdc
  // const dUsdc = await ethers.deployContract("DummyUsdc");
  // await dUsdc.waitForDeployment();
  // console.log("deploy dummy usdc at ", dUsdc.target);

  // 2. deploy upkeep
  // const linkToken = datas.networkDetail[network.name as keyof typeof datas.networkDetail].chainlink.linkToken;
  // const registrar = datas.networkDetail[network.name as keyof typeof datas.networkDetail].chainlink.regstrarAutomation;

  // const upkeep = await ethers.deployContract("UpkeepIDConditional", [linkToken, registrar]);
  // await upkeep.waitForDeployment();
  // console.log("deploy upkeep at ", upkeep.target);

  // 3. deploy shieldhub
  const dUsdc = datas.networkDetail[network.name as keyof typeof datas.networkDetail].DummyUsdc;
  const upkeep = datas.networkDetail[network.name as keyof typeof datas.networkDetail].UpKeep;
  const shieldhub = await ethers.deployContract("ShieldHub", [dUsdc, upkeep]);
  await shieldhub.waitForDeployment();
  console.log("deploy shieldhub at ", shieldhub.target);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
