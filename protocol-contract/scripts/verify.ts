import { ethers, run } from "hardhat";
import datas from '../datas/contracts.json';

async function main() {
  // 1. verify dummy usdc
  await run("verify:verify", {
    address: datas.networkDetail.avalanche.DummyUsdc,
    constructorArguments: []
  })

  // 2. deploy upkeep
  await run("verify:verify", {
    address: datas.networkDetail.avalanche.UpKeep,
    constructorArguments: [datas.networkDetail.avalanche.chainlink.linkToken, datas.networkDetail.avalanche.chainlink.regstrarAutomation]
  })
  // 3. deploy shieldhub
  await run("verify:verify", {
    address: datas.networkDetail.avalanche.ShieldHub,
    constructorArguments: [datas.networkDetail.avalanche.DummyUsdc, datas.networkDetail.avalanche.UpKeep]
  })
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
