// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.20;

library Types {
  enum InsuranceType {
    NFT,
    ASSET
  }

  enum StatusInsurance {
    ACTIVE,
    EXPIRED,
    CLAIMED
  }

  struct Order {
    bool isExist;
    address policyHolder;
    uint256 amount;
    InsuranceType iType;
    string market;
    int price;
    int strikePrice;
    uint256 expireTime;
    uint256 coverAmount;
    StatusInsurance status;
    uint256 orderNumber;
  }

  struct RegistrationParams {
    string name;
    bytes encryptedEmail;
    address upkeepContract;
    uint32 gasLimit;
    address adminAddress;
    uint8 triggerType;
    bytes checkData;
    bytes triggerConfig;
    bytes offchainConfig;
    uint96 amount;
}
}