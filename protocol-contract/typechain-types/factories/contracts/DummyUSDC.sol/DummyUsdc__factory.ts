/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  DummyUsdc,
  DummyUsdcInterface,
} from "../../../contracts/DummyUSDC.sol/DummyUsdc";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
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
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50336040518060400160405280600a81526020017f44756d6d792055534443000000000000000000000000000000000000000000008152506040518060400160405280600581526020017f6455534443000000000000000000000000000000000000000000000000000000815250816003908162000090919062000778565b508060049081620000a2919062000778565b505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200011a5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620001119190620008a4565b60405180910390fd5b6200012b816200017260201b60201c565b506200016c33620001416200023860201b60201c565b600a6200014f919062000a51565b6305f5e10062000160919062000aa2565b6200024160201b60201c565b62000b93565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620002b65760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401620002ad9190620008a4565b60405180910390fd5b620002ca60008383620002ce60201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036200032457806002600082825462000317919062000aed565b92505081905550620003fa565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015620003b3578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620003aa9392919062000b39565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000445578060026000828254039250508190555062000492565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620004f1919062000b76565b60405180910390a3505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200058057607f821691505b60208210810362000596576200059562000538565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620006007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620005c1565b6200060c8683620005c1565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000659620006536200064d8462000624565b6200062e565b62000624565b9050919050565b6000819050919050565b620006758362000638565b6200068d620006848262000660565b848454620005ce565b825550505050565b600090565b620006a462000695565b620006b18184846200066a565b505050565b5b81811015620006d957620006cd6000826200069a565b600181019050620006b7565b5050565b601f8211156200072857620006f2816200059c565b620006fd84620005b1565b810160208510156200070d578190505b620007256200071c85620005b1565b830182620006b6565b50505b505050565b600082821c905092915050565b60006200074d600019846008026200072d565b1980831691505092915050565b60006200076883836200073a565b9150826002028217905092915050565b6200078382620004fe565b67ffffffffffffffff8111156200079f576200079e62000509565b5b620007ab825462000567565b620007b8828285620006dd565b600060209050601f831160018114620007f05760008415620007db578287015190505b620007e785826200075a565b86555062000857565b601f19841662000800866200059c565b60005b828110156200082a5784890151825560018201915060208501945060208101905062000803565b868310156200084a578489015162000846601f8916826200073a565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200088c826200085f565b9050919050565b6200089e816200087f565b82525050565b6000602082019050620008bb600083018462000893565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b60018511156200094f57808604811115620009275762000926620008c1565b5b6001851615620009375780820291505b80810290506200094785620008f0565b945062000907565b94509492505050565b6000826200096a576001905062000a3d565b816200097a576000905062000a3d565b81600181146200099357600281146200099e57620009d4565b600191505062000a3d565b60ff841115620009b357620009b2620008c1565b5b8360020a915084821115620009cd57620009cc620008c1565b5b5062000a3d565b5060208310610133831016604e8410600b841016171562000a0e5782820a90508381111562000a085762000a07620008c1565b5b62000a3d565b62000a1d8484846001620008fd565b9250905081840481111562000a375762000a36620008c1565b5b81810290505b9392505050565b600060ff82169050919050565b600062000a5e8262000624565b915062000a6b8362000a44565b925062000a9a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000958565b905092915050565b600062000aaf8262000624565b915062000abc8362000624565b925082820262000acc8162000624565b9150828204841483151762000ae65762000ae5620008c1565b5b5092915050565b600062000afa8262000624565b915062000b078362000624565b925082820190508082111562000b225762000b21620008c1565b5b92915050565b62000b338162000624565b82525050565b600060608201905062000b50600083018662000893565b62000b5f602083018562000b28565b62000b6e604083018462000b28565b949350505050565b600060208201905062000b8d600083018462000b28565b92915050565b6114b18062000ba36000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063715018a611610097578063a9059cbb11610066578063a9059cbb14610262578063b86d1d6314610292578063dd62ed3e146102ae578063f2fde38b146102de576100f5565b8063715018a61461020057806379cc67901461020a5780638da5cb5b1461022657806395d89b4114610244576100f5565b806323b872dd116100d357806323b872dd14610166578063313ce5671461019657806342966c68146101b457806370a08231146101d0576100f5565b806306fdde03146100fa578063095ea7b31461011857806318160ddd14610148575b600080fd5b6101026102fa565b60405161010f9190610f18565b60405180910390f35b610132600480360381019061012d9190610fd3565b61038c565b60405161013f919061102e565b60405180910390f35b6101506103af565b60405161015d9190611058565b60405180910390f35b610180600480360381019061017b9190611073565b6103b9565b60405161018d919061102e565b60405180910390f35b61019e6103e8565b6040516101ab91906110e2565b60405180910390f35b6101ce60048036038101906101c991906110fd565b6103f1565b005b6101ea60048036038101906101e5919061112a565b610405565b6040516101f79190611058565b60405180910390f35b61020861044d565b005b610224600480360381019061021f9190610fd3565b610461565b005b61022e610481565b60405161023b9190611166565b60405180910390f35b61024c6104ab565b6040516102599190610f18565b60405180910390f35b61027c60048036038101906102779190610fd3565b61053d565b604051610289919061102e565b60405180910390f35b6102ac60048036038101906102a7919061112a565b610560565b005b6102c860048036038101906102c39190611181565b61058c565b6040516102d59190611058565b60405180910390f35b6102f860048036038101906102f3919061112a565b610613565b005b606060038054610309906111f0565b80601f0160208091040260200160405190810160405280929190818152602001828054610335906111f0565b80156103825780601f1061035757610100808354040283529160200191610382565b820191906000526020600020905b81548152906001019060200180831161036557829003601f168201915b5050505050905090565b600080610397610699565b90506103a48185856106a1565b600191505092915050565b6000600254905090565b6000806103c4610699565b90506103d18582856106b3565b6103dc858585610747565b60019150509392505050565b60006012905090565b6104026103fc610699565b8261083b565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6104556108bd565b61045f6000610944565b565b6104738261046d610699565b836106b3565b61047d828261083b565b5050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546104ba906111f0565b80601f01602080910402602001604051908101604052809291908181526020018280546104e6906111f0565b80156105335780601f1061050857610100808354040283529160200191610533565b820191906000526020600020905b81548152906001019060200180831161051657829003601f168201915b5050505050905090565b600080610548610699565b9050610555818585610747565b600191505092915050565b6105898161056c6103e8565b600a6105789190611383565b60c861058491906113ce565b610a0a565b50565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b61061b6108bd565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361068d5760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016106849190611166565b60405180910390fd5b61069681610944565b50565b600033905090565b6106ae8383836001610a8c565b505050565b60006106bf848461058c565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146107415781811015610731578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161072893929190611410565b60405180910390fd5b61074084848484036000610a8c565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107b95760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016107b09190611166565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361082b5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016108229190611166565b60405180910390fd5b610836838383610c63565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108ad5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016108a49190611166565b60405180910390fd5b6108b982600083610c63565b5050565b6108c5610699565b73ffffffffffffffffffffffffffffffffffffffff166108e3610481565b73ffffffffffffffffffffffffffffffffffffffff161461094257610906610699565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016109399190611166565b60405180910390fd5b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a7c5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610a739190611166565b60405180910390fd5b610a8860008383610c63565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610afe5760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610af59190611166565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b705760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610b679190611166565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610c5d578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610c549190611058565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610cb5578060026000828254610ca99190611447565b92505081905550610d88565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d41578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610d3893929190611410565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610dd15780600260008282540392505081905550610e1e565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610e7b9190611058565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610ec2578082015181840152602081019050610ea7565b60008484015250505050565b6000601f19601f8301169050919050565b6000610eea82610e88565b610ef48185610e93565b9350610f04818560208601610ea4565b610f0d81610ece565b840191505092915050565b60006020820190508181036000830152610f328184610edf565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f6a82610f3f565b9050919050565b610f7a81610f5f565b8114610f8557600080fd5b50565b600081359050610f9781610f71565b92915050565b6000819050919050565b610fb081610f9d565b8114610fbb57600080fd5b50565b600081359050610fcd81610fa7565b92915050565b60008060408385031215610fea57610fe9610f3a565b5b6000610ff885828601610f88565b925050602061100985828601610fbe565b9150509250929050565b60008115159050919050565b61102881611013565b82525050565b6000602082019050611043600083018461101f565b92915050565b61105281610f9d565b82525050565b600060208201905061106d6000830184611049565b92915050565b60008060006060848603121561108c5761108b610f3a565b5b600061109a86828701610f88565b93505060206110ab86828701610f88565b92505060406110bc86828701610fbe565b9150509250925092565b600060ff82169050919050565b6110dc816110c6565b82525050565b60006020820190506110f760008301846110d3565b92915050565b60006020828403121561111357611112610f3a565b5b600061112184828501610fbe565b91505092915050565b6000602082840312156111405761113f610f3a565b5b600061114e84828501610f88565b91505092915050565b61116081610f5f565b82525050565b600060208201905061117b6000830184611157565b92915050565b6000806040838503121561119857611197610f3a565b5b60006111a685828601610f88565b92505060206111b785828601610f88565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061120857607f821691505b60208210810361121b5761121a6111c1565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b60018511156112a75780860481111561128357611282611221565b5b60018516156112925780820291505b80810290506112a085611250565b9450611267565b94509492505050565b6000826112c0576001905061137c565b816112ce576000905061137c565b81600181146112e457600281146112ee5761131d565b600191505061137c565b60ff841115611300576112ff611221565b5b8360020a91508482111561131757611316611221565b5b5061137c565b5060208310610133831016604e8410600b84101617156113525782820a90508381111561134d5761134c611221565b5b61137c565b61135f848484600161125d565b9250905081840481111561137657611375611221565b5b81810290505b9392505050565b600061138e82610f9d565b9150611399836110c6565b92506113c67fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846112b0565b905092915050565b60006113d982610f9d565b91506113e483610f9d565b92508282026113f281610f9d565b9150828204841483151761140957611408611221565b5b5092915050565b60006060820190506114256000830186611157565b6114326020830185611049565b61143f6040830184611049565b949350505050565b600061145282610f9d565b915061145d83610f9d565b925082820190508082111561147557611474611221565b5b9291505056fea2646970667358221220a5d433a959ad41ad1761ef742090106fa5816cf5ad119dfd71d7baf7938eaa8064736f6c63430008140033";

type DummyUsdcConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DummyUsdcConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DummyUsdc__factory extends ContractFactory {
  constructor(...args: DummyUsdcConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      DummyUsdc & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): DummyUsdc__factory {
    return super.connect(runner) as DummyUsdc__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DummyUsdcInterface {
    return new Interface(_abi) as DummyUsdcInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): DummyUsdc {
    return new Contract(address, _abi, runner) as unknown as DummyUsdc;
  }
}
