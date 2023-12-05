import { ethers, network, run } from "hardhat";
import datas from '../datas/contracts.json';

async function main() {
  const networkData = datas.networkDetail[network.name as keyof typeof datas.networkDetail]
  // 1. verify dummy usdc
  await run("verify:verify", {
    address: networkData.DummyUsdc,
    constructorArguments: []
  })

  // 2. deploy upkeep
  await run("verify:verify", {
    address: networkData.UpKeep,
    constructorArguments: [networkData.chainlink.linkToken, networkData.chainlink.regstrarAutomation]
  })
  // 3. deploy shieldhub
  await run("verify:verify", {
    address: networkData.ShieldHub,
    constructorArguments: [networkData.DummyUsdc, networkData.UpKeep]
  })
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
