const chains = {
    56: {
        id: 56,
        name: 'bsc',
        rpc: 'https://bsc-dataseed.binance.org/',
        subgraph: 'https://api.thegraph.com/subgraphs/name/apyvision/block-info',
    },
    128: {
        id: 128,
        name: 'heco',
        rpc: 'https://http-mainnet.hecochain.com',
        blockinterval: 3
    },
    25: {
        id: 25,
        name: 'cronos',
        rpc: 'https://evm-cronos.crypto.org',
        blockinterval: 5.8
    },
    1666600000: {
        id: 1666600000,
        name: 'harmony',
        rpc: 'https://rpc.s0.t.hmny.io',
        blockinterval: 3
    },
    137: {
        id: 137,
        name: 'polygon',
        subgraph: 'https://api.thegraph.com/subgraphs/name/sameepsi/maticblocks',
    },
    250: {
        id: 250,
        name: 'fantom',
        subgraph: 'https://api.thegraph.com/subgraphs/name/wigoswap/blocks',
    },
    1285: {
        id: 1285,
        name: 'moonriver',
        subgraph: 'https://api.thegraph.com/subgraphs/name/solarbeamio/blocklytics',
    },
    42161: {
        id: 42161,
        name: 'arbitrum',
        subgraph: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks',
    },
    42220: {
        id: 42220,
        name: 'celo',
        subgraph: 'https://api.thegraph.com/subgraphs/name/ubeswap/celo-blocks',
    },
    43114: {
        id: 43114,
        name: 'avalanche',
        subgraph: 'https://api.thegraph.com/subgraphs/name/dasconnor/avalanche-blocks',
    },
    // 1088: {
    //     id: 1088,
    //     name: 'metis',
    //     rpc: 'https://andromeda.metis.io/?owner=1088',
    //     blockinterval: 15
    // },
    122: {
        id: 122,
        name: 'fuse',
        rpc: 'https://rpc.fuse.io',
        subgraph: 'https://api.thegraph.com/subgraphs/name/sushiswap/fuse-blocks',
        blockinterval: 5
    },
    1284: {
        id: 1284,
        name: 'moonbeam',
        rpc: 'https://rpc.api.moonbeam.network',
        blockinterval: 12
    },
    1313161554: {
        id: 1313161554,
        name: 'aurora',
        rpc: 'https://mainnet.aurora.dev'
    }
}

export default chains;