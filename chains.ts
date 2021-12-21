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
        rpc: 'https://a.api.s0.t.hmny.io',
        blockinterval: 3
    },
    137: {
        id: 137,
        name: 'polygon',
        rpc: 'https://bsc-dataseed.binance.org/',
        subgraph: 'https://api.thegraph.com/subgraphs/name/sameepsi/maticblocks',
    },
    250: {
        id: 250,
        name: 'fantom',
        rpc: 'https://bsc-dataseed.binance.org/',
        subgraph: 'https://api.thegraph.com/subgraphs/name/wigoswap/blocks',
    },
    1285: {
        id: 1285,
        name: 'moonriver',
        rpc: 'https://bsc-dataseed.binance.org/',
        subgraph: 'https://api.thegraph.com/subgraphs/name/solarbeamio/blocklytics',
    },
    42161: {
        id: 42161,
        name: 'arbitrum',
        rpc: 'https://bsc-dataseed.binance.org/',
        subgraph: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks',
    },
    42220: {
        id: 42220,
        name: 'celo',
        rpc: 'https://bsc-dataseed.binance.org/',
        subgraph: 'https://api.thegraph.com/subgraphs/name/ubeswap/celo-blocks',
    },
    43114: {
        id: 43114,
        name: 'avalanche',
        rpc: 'https://bsc-dataseed.binance.org/',
        subgraph: 'https://api.thegraph.com/subgraphs/name/dasconnor/avalanche-blocks',
    }
}

export default chains;