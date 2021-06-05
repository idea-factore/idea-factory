// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum

export const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = 'PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8'

// EXTERNAL CONTRACTS
export const VOTE_ABI = [
  {
    inputs:
      [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'expirationTimestamp',
              type: 'uint256'
            },
            {
              internalType:
              'uint256',
              name:
              'withdrawalLiveness',
              type: 'uint256'
            },
            {
              internalType: 'address',
              name: 'collateralAddress',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'finderAddress',
              type: 'address'
            }, { internalType: 'address', name: 'tokenFactoryAddress', type: 'address' }, { internalType: 'address', name: 'timerAddress', type: 'address' }, { internalType: 'address', name: 'excessTokenBeneficiary', type: 'address' }, { internalType: 'bytes32', name: 'priceFeedIdentifier', type: 'bytes32' }, { internalType: 'string', name: 'syntheticName', type: 'string' }, { internalType: 'string', name: 'syntheticSymbol', type: 'string' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'minSponsorTokens', type: 'tuple' }, { internalType: 'uint256', name: 'liquidationLiveness', type: 'uint256' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'collateralRequirement', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'disputeBondPct', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'sponsorDisputeRewardPct', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'disputerDisputeRewardPct', type: 'tuple' }],
          internalType: 'struct Liquidatable.ConstructorParams',
          name: 'params',
          type: 'tuple'
        }],
    stateMutability: 'nonpayable',
    type: 'constructor'
  }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'caller', type: 'address' }], name: 'ContractExpired', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralAmount', type: 'uint256' }], name: 'Deposit', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'caller', type: 'address' }, { indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'address', name: 'liquidator', type: 'address' }, { indexed: false, internalType: 'address', name: 'disputer', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'liquidationId', type: 'uint256' }, { indexed: false, internalType: 'bool', name: 'disputeSucceeded', type: 'bool' }], name: 'DisputeSettled', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'caller', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'originalExpirationTimestamp', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'shutdownTimestamp', type: 'uint256' }], name: 'EmergencyShutdown', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }], name: 'EndedSponsorPosition', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'FinalFeesPaid', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'address', name: 'liquidator', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'liquidationId', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'tokensOutstanding', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'lockedCollateral', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'liquidatedCollateral', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'liquidationTime', type: 'uint256' }], name: 'LiquidationCreated', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'address', name: 'liquidator', type: 'address' }, { indexed: true, internalType: 'address', name: 'disputer', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'liquidationId', type: 'uint256' }, { indexed: false, internalType: 'uint256', name: 'disputeBondAmount', type: 'uint256' }], name: 'LiquidationDisputed', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'caller', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'withdrawalAmount', type: 'uint256' }, { indexed: true, internalType: 'enum Liquidatable.Status', name: 'liquidationStatus', type: 'uint8' }, { indexed: false, internalType: 'uint256', name: 'settlementPrice', type: 'uint256' }], name: 'LiquidationWithdrawn', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }], name: 'NewSponsor', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralAmount', type: 'uint256' }, { indexed: true, internalType: 'uint256', name: 'tokenAmount', type: 'uint256' }], name: 'PositionCreated', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralAmount', type: 'uint256' }, { indexed: true, internalType: 'uint256', name: 'tokenAmount', type: 'uint256' }], name: 'Redeem', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'uint256', name: 'regularFee', type: 'uint256' }, { indexed: true, internalType: 'uint256', name: 'lateFee', type: 'uint256' }], name: 'RegularFeesPaid', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'oldSponsor', type: 'address' }], name: 'RequestTransferPosition', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'oldSponsor', type: 'address' }], name: 'RequestTransferPositionCanceled', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'oldSponsor', type: 'address' }, { indexed: true, internalType: 'address', name: 'newSponsor', type: 'address' }], name: 'RequestTransferPositionExecuted', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralAmount', type: 'uint256' }], name: 'RequestWithdrawal', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralAmount', type: 'uint256' }], name: 'RequestWithdrawalCanceled', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralAmount', type: 'uint256' }], name: 'RequestWithdrawalExecuted', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'caller', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralReturned', type: 'uint256' }, { indexed: true, internalType: 'uint256', name: 'tokensBurned', type: 'uint256' }], name: 'SettleExpiredPosition', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'sponsor', type: 'address' }, { indexed: true, internalType: 'uint256', name: 'collateralAmount', type: 'uint256' }], name: 'Withdrawal', type: 'event' }, { inputs: [], name: 'cancelTransferPosition', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'cancelWithdrawal', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'collateralCurrency', outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'collateralRequirement', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'contractState', outputs: [{ internalType: 'enum PricelessPositionManager.ContractState', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' }, { inputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'collateralAmount', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'numTokens', type: 'tuple' }], name: 'create', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'sponsor', type: 'address' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'minCollateralPerToken', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'maxCollateralPerToken', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'maxTokensToLiquidate', type: 'tuple' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'createLiquidation', outputs: [{ internalType: 'uint256', name: 'liquidationId', type: 'uint256' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'tokensLiquidated', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'finalFeeBond', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'cumulativeFeeMultiplier', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'collateralAmount', type: 'tuple' }], name: 'deposit', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'sponsor', type: 'address' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'collateralAmount', type: 'tuple' }], name: 'depositTo', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'liquidationId', type: 'uint256' }, { internalType: 'address', name: 'sponsor', type: 'address' }], name: 'dispute', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'totalPaid', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'disputeBondPct', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'disputerDisputeRewardPct', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'emergencyShutdown', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'excessTokenBeneficiary', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'expirationTimestamp', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'expire', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'expiryPrice', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'finder', outputs: [{ internalType: 'contract FinderInterface', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'sponsor', type: 'address' }], name: 'getCollateral', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'collateralAmount', type: 'tuple' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'getCurrentTime', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'sponsor', type: 'address' }], name: 'getLiquidations', outputs: [{ components: [{ internalType: 'address', name: 'sponsor', type: 'address' }, { internalType: 'address', name: 'liquidator', type: 'address' }, { internalType: 'enum Liquidatable.Status', name: 'state', type: 'uint8' }, { internalType: 'uint256', name: 'liquidationTime', type: 'uint256' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'tokensOutstanding', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'lockedCollateral', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'liquidatedCollateral', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'rawUnitCollateral', type: 'tuple' }, { internalType: 'address', name: 'disputer', type: 'address' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'settlementPrice', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'finalFee', type: 'tuple' }], internalType: 'struct Liquidatable.LiquidationData[]', name: 'liquidationData', type: 'tuple[]' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'liquidationLiveness', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'uint256', name: '', type: 'uint256' }], name: 'liquidations', outputs: [{ internalType: 'address', name: 'sponsor', type: 'address' }, { internalType: 'address', name: 'liquidator', type: 'address' }, { internalType: 'enum Liquidatable.Status', name: 'state', type: 'uint8' }, { internalType: 'uint256', name: 'liquidationTime', type: 'uint256' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'tokensOutstanding', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'lockedCollateral', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'liquidatedCollateral', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'rawUnitCollateral', type: 'tuple' }, { internalType: 'address', name: 'disputer', type: 'address' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'settlementPrice', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'finalFee', type: 'tuple' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'minSponsorTokens', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'payRegularFees', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'totalPaid', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'pfc', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: '', type: 'tuple' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'positions', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'tokensOutstanding', type: 'tuple' }, { internalType: 'uint256', name: 'withdrawalRequestPassTimestamp', type: 'uint256' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'withdrawalRequestAmount', type: 'tuple' }, { components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'rawCollateral', type: 'tuple' }, { internalType: 'uint256', name: 'transferPositionRequestPassTimestamp', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'priceIdentifier', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'rawLiquidationCollateral', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'rawTotalPositionCollateral', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'numTokens', type: 'tuple' }], name: 'redeem', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'amountWithdrawn', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'remargin', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'requestTransferPosition', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'collateralAmount', type: 'tuple' }], name: 'requestWithdrawal', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'time', type: 'uint256' }], name: 'setCurrentTime', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'settleExpired', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'amountWithdrawn', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'sponsorDisputeRewardPct', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'timerAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'tokenCurrency', outputs: [{ internalType: 'contract ExpandedIERC20', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'totalPositionCollateral', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'totalCollateral', type: 'tuple' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'totalTokensOutstanding', outputs: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'newSponsorAddress', type: 'address' }], name: 'transferPositionPassedRequest', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'contract IERC20', name: 'token', type: 'address' }], name: 'trimExcess', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'amount', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'collateralAmount', type: 'tuple' }], name: 'withdraw', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'amountWithdrawn', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'liquidationId', type: 'uint256' }, { internalType: 'address', name: 'sponsor', type: 'address' }], name: 'withdrawLiquidation', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'amountWithdrawn', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'withdrawPassedRequest', outputs: [{ components: [{ internalType: 'uint256', name: 'rawValue', type: 'uint256' }], internalType: 'struct FixedPoint.Unsigned', name: 'amountWithdrawn', type: 'tuple' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'withdrawalLiveness', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }]
export const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
export const TOKEN_ABI = [{ inputs: [{ internalType: 'string', name: 'tokenName', type: 'string' }, { internalType: 'string', name: 'tokenSymbol', type: 'string' }, { internalType: 'uint8', name: 'tokenDecimals', type: 'uint8' }], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'uint256', name: 'roleId', type: 'uint256' }, { indexed: true, internalType: 'address', name: 'newMember', type: 'address' }, { indexed: true, internalType: 'address', name: 'manager', type: 'address' }], name: 'AddedSharedMember', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, { indexed: true, internalType: 'address', name: 'spender', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Approval', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'uint256', name: 'roleId', type: 'uint256' }, { indexed: true, internalType: 'address', name: 'oldMember', type: 'address' }, { indexed: true, internalType: 'address', name: 'manager', type: 'address' }], name: 'RemovedSharedMember', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'uint256', name: 'roleId', type: 'uint256' }, { indexed: true, internalType: 'address', name: 'newMember', type: 'address' }, { indexed: true, internalType: 'address', name: 'manager', type: 'address' }], name: 'ResetExclusiveMember', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, { indexed: true, internalType: 'address', name: 'to', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'addBurner', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'roleId', type: 'uint256' }, { internalType: 'address', name: 'newMember', type: 'address' }], name: 'addMember', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'addMinter', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'owner', type: 'address' }, { internalType: 'address', name: 'spender', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'approve', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'burn', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }], name: 'decreaseAllowance', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'roleId', type: 'uint256' }], name: 'getMember', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'roleId', type: 'uint256' }, { internalType: 'address', name: 'memberToCheck', type: 'address' }], name: 'holdsRole', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'addedValue', type: 'uint256' }], name: 'increaseAllowance', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isBurner', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'isMinter', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }, { internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'mint', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'removeBurner', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'roleId', type: 'uint256' }, { internalType: 'address', name: 'memberToRemove', type: 'address' }], name: 'removeMember', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'removeMinter', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'roleId', type: 'uint256' }], name: 'renounceMembership', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'roleId', type: 'uint256' }, { internalType: 'address', name: 'newMember', type: 'address' }], name: 'resetMember', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'account', type: 'address' }], name: 'resetOwner', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'sender', type: 'address' }, { internalType: 'address', name: 'recipient', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'transferFrom', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }]
export const DAI_ABI = [{ inputs: [{ internalType: 'uint256', name: 'chainId_', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'src', type: 'address' }, { indexed: true, internalType: 'address', name: 'guy', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'Approval', type: 'event' }, { anonymous: true, inputs: [{ indexed: true, internalType: 'bytes4', name: 'sig', type: 'bytes4' }, { indexed: true, internalType: 'address', name: 'usr', type: 'address' }, { indexed: true, internalType: 'bytes32', name: 'arg1', type: 'bytes32' }, { indexed: true, internalType: 'bytes32', name: 'arg2', type: 'bytes32' }, { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' }], name: 'LogNote', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'src', type: 'address' }, { indexed: true, internalType: 'address', name: 'dst', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'Transfer', type: 'event' }, { constant: true, inputs: [], name: 'DOMAIN_SEPARATOR', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'PERMIT_TYPEHASH', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'address', name: '', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'approve', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'burn', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'guy', type: 'address' }], name: 'deny', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'mint', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'src', type: 'address' }, { internalType: 'address', name: 'dst', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'move', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'nonces', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'holder', type: 'address' }, { internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'nonce', type: 'uint256' }, { internalType: 'uint256', name: 'expiry', type: 'uint256' }, { internalType: 'bool', name: 'allowed', type: 'bool' }, { internalType: 'uint8', name: 'v', type: 'uint8' }, { internalType: 'bytes32', name: 'r', type: 'bytes32' }, { internalType: 'bytes32', name: 's', type: 'bytes32' }], name: 'permit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'pull', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'push', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'guy', type: 'address' }], name: 'rely', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'dst', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'src', type: 'address' }, { internalType: 'address', name: 'dst', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'transferFrom', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'version', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'wards', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }]

export const FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'uri_',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]'
      }
    ],
    name: 'TransferBatch',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'TransferSingle',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'URI',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string'
      }
    ],
    name: 'mintedIdea',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'accounts',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]'
      }
    ],
    name: 'balanceOfBatch',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'getName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'getVotes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'ideas',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'votes',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'initalVote',
        type: 'uint256'
      }
    ],
    name: 'mintIdea',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'votes',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'setVotes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'stake',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'stakeIdea',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'uri',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
export const POOL_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'factoryAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'child',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'idea',
        type: 'uint256'
      }
    ],
    name: 'addedIdeaToChild',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'childPool',
        type: 'address'
      }
    ],
    name: 'createdChildPool',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'pool',
        type: 'address'
      }
    ],
    name: 'createdPool',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'idea',
        type: 'uint256'
      }
    ],
    name: 'stakedToIdea',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'child',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'addIdeaToChild',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      }
    ],
    name: 'addIdeaToPool',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'childPools',
    outputs: [
      {
        internalType: 'address',
        name: 'parent',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'child',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'collateral',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lastPrice',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isSet',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'address',
        name: 'parentPool',
        type: 'address'
      }
    ],
    name: 'createChildPool',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32'
      }
    ],
    name: 'createPool',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'existingPools',
    outputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address'
      }
    ],
    name: 'getChildPoolData',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'parent',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'child',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          },
          {
            internalType: 'uint256[]',
            name: 'ideas',
            type: 'uint256[]'
          },
          {
            internalType: 'address[]',
            name: 'users',
            type: 'address[]'
          },
          {
            internalType: 'uint256',
            name: 'collateral',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lastPrice',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isSet',
            type: 'bool'
          }
        ],
        internalType: 'struct CommonStructs.ChildPool',
        name: 'childPool',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address'
      }
    ],
    name: 'getChildPools',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'parent',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'child',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          },
          {
            internalType: 'uint256[]',
            name: 'ideas',
            type: 'uint256[]'
          },
          {
            internalType: 'address[]',
            name: 'users',
            type: 'address[]'
          },
          {
            internalType: 'uint256',
            name: 'collateral',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lastPrice',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isSet',
            type: 'bool'
          }
        ],
        internalType: 'struct CommonStructs.ChildPool[]',
        name: 'childPools',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getCollateral',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getIdeas',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address'
      }
    ],
    name: 'getPoolData',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pool',
            type: 'address'
          },
          {
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32'
          },
          {
            internalType: 'bytes32',
            name: 'description',
            type: 'bytes32'
          },
          {
            internalType: 'uint256[]',
            name: 'ideas',
            type: 'uint256[]'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'parent',
                type: 'address'
              },
              {
                internalType: 'address',
                name: 'child',
                type: 'address'
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string'
              },
              {
                internalType: 'string',
                name: 'description',
                type: 'string'
              },
              {
                internalType: 'uint256[]',
                name: 'ideas',
                type: 'uint256[]'
              },
              {
                internalType: 'address[]',
                name: 'users',
                type: 'address[]'
              },
              {
                internalType: 'uint256',
                name: 'collateral',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'lastPrice',
                type: 'uint256'
              },
              {
                internalType: 'bool',
                name: 'isSet',
                type: 'bool'
              }
            ],
            internalType: 'struct CommonStructs.ChildPool[]',
            name: 'childPools',
            type: 'tuple[]'
          },
          {
            internalType: 'address[]',
            name: 'users',
            type: 'address[]'
          },
          {
            internalType: 'uint256',
            name: 'collateral',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lastPrice',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isParent',
            type: 'bool'
          }
        ],
        internalType: 'struct CommonStructs.Pool',
        name: 'poolToReturn',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPools',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pool',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool'
          }
        ],
        internalType: 'struct PoolCoordinator.ExistingPools[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'mappedPools',
    outputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 'description',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'collateral',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lastPrice',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isParent',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'origin',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'idea',
        type: 'uint256'
      }
    ],
    name: 'stakeToIdea',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transferCollateral',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'users',
    outputs: [
      {
        internalType: 'address',
        name: 'userAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'TVL',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'exist',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'withdrawer',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'withdrawCollateral',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
