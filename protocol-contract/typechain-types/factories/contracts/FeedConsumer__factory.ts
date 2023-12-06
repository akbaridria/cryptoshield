/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  FeedConsumer,
  FeedConsumerInterface,
} from "../../contracts/FeedConsumer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "source",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getLatestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "round",
        type: "uint80",
      },
    ],
    name: "getPrevRound",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610538380380610538833981810160405281019061003291906100db565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610108565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100a88261007d565b9050919050565b6100b88161009d565b81146100c357600080fd5b50565b6000815190506100d5816100af565b92915050565b6000602082840312156100f1576100f0610078565b5b60006100ff848285016100c6565b91505092915050565b610421806101176000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632daae2f31461003b5780633961fba01461005b575b600080fd5b61004361008d565b60405161005293929190610253565b60405180910390f35b610075600480360381019061007091906102bb565b61013e565b60405161008493929190610253565b60405180910390f35b60008060008060008060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa158015610101573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101259190610355565b5093505092509250828282955095509550505050909192565b60008060008060008060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639a6fc8f5886040518263ffffffff1660e01b81526004016101a091906103d0565b60a060405180830381865afa1580156101bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e19190610355565b50935050925092508282829550955095505050509193909250565b600069ffffffffffffffffffff82169050919050565b61021b816101fc565b82525050565b6000819050919050565b61023481610221565b82525050565b6000819050919050565b61024d8161023a565b82525050565b60006060820190506102686000830186610212565b610275602083018561022b565b6102826040830184610244565b949350505050565b600080fd5b610298816101fc565b81146102a357600080fd5b50565b6000813590506102b58161028f565b92915050565b6000602082840312156102d1576102d061028a565b5b60006102df848285016102a6565b91505092915050565b6000815190506102f78161028f565b92915050565b61030681610221565b811461031157600080fd5b50565b600081519050610323816102fd565b92915050565b6103328161023a565b811461033d57600080fd5b50565b60008151905061034f81610329565b92915050565b600080600080600060a086880312156103715761037061028a565b5b600061037f888289016102e8565b955050602061039088828901610314565b94505060406103a188828901610340565b93505060606103b288828901610340565b92505060806103c3888289016102e8565b9150509295509295909350565b60006020820190506103e56000830184610212565b9291505056fea2646970667358221220ce23f0b0c0bd221cc118b66036497a14271f2a18a05f0f2f4c2a44b140562f5d64736f6c63430008140033";

type FeedConsumerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FeedConsumerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FeedConsumer__factory extends ContractFactory {
  constructor(...args: FeedConsumerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    source: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(source, overrides || {});
  }
  override deploy(
    source: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(source, overrides || {}) as Promise<
      FeedConsumer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FeedConsumer__factory {
    return super.connect(runner) as FeedConsumer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FeedConsumerInterface {
    return new Interface(_abi) as FeedConsumerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): FeedConsumer {
    return new Contract(address, _abi, runner) as unknown as FeedConsumer;
  }
}