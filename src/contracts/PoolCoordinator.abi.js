module.exports = [
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
