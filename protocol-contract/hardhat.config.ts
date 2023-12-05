import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import "@nomicfoundation/hardhat-verify";
import 'dotenv/config'

import datas from "./datas/contracts.json";


const PRIVATE_KEY  = process.env.PRIVATE_KEY;
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: datas.networkDetail.polygon.rpc,
      accounts: [PRIVATE_KEY as string, PRIVATE_KEY2 as string],
      chainId: datas.networkDetail.polygon.chainId,
    },
    avalanche: {
      url: datas.networkDetail.avalanche.rpc,
      accounts: [PRIVATE_KEY as string, PRIVATE_KEY2 as string],
      chainId: datas.networkDetail.avalanche.chainId,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY as string,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY as string,
    },
  }
};

export default config;
