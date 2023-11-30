import { ethers, network } from "hardhat";
import datas from '../datas/contracts.json';
import { FeedConsumer__factory, ShieldHub__factory } from "../typechain-types";

export const getPrice = async () => {


  const shieldhubProvider = await ethers.getContractFactory("ShieldHub");
  const shieldhub = ShieldHub__factory.connect(datas.networkDetail.avalanche.ShieldHub, shieldhubProvider.runner);
  const oracleAddress = await shieldhub.marketAddress(datas.dataFeed.assets.avalanche[0].contractName);
  
  const feed = await ethers.getContractFactory("FeedConsumer");
  const feed_ = FeedConsumer__factory.connect(oracleAddress, feed.runner);
  const e = await feed_.getLatestRoundData();
  
 return Number(e[1]);

}