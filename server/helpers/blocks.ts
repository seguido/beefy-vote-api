import chains from "../../chains";
import axios from 'axios';
import { Block, JsonRpcProvider, Provider } from "@ethersproject/providers";

const fetchBlocks = async (timestamp: number) => {
    console.log(`Starting block fetching`);
    let startTimestamp = Date.now();
    let promises = [];
    
    Object.values(chains).forEach(chain => {
        promises.push(findBlockForChain(chain, timestamp, startTimestamp));
    });

    let results = await Promise.all(promises);
    let blockResponse = {};
    results.forEach(res => blockResponse[res.chain] = res.blockNumber);
    return blockResponse;
}

const findBlockForChain = async (chain: any, timestamp: number, start: number) => {
    let block = chain.subgraph ? await subGraphBlockSearch(chain, timestamp) : await smartBinaryBlockSearch(chain, timestamp);
    console.log(`${chain.name} finished with block ${block.blockNumber} [${((Date.now()-start)/1000).toFixed(2)}s]`);
    return block;
}

const smartBinaryBlockSearch = async (chain: any, timestamp: number) => {

    const provider = new JsonRpcProvider(chain.rpc, chain.id);
    let currentBlock = await provider.getBlock('latest');

    let blockInterval = chain.blockinterval;

    let result = currentBlock.timestamp <= timestamp ? currentBlock.number : await recursiveSearch(currentBlock, timestamp, blockInterval, provider);

    let resp = {
        chain: chain.id,
        blockNumber: result
    };

    return resp;
}

const recursiveSearch = async (currentBlock: Block, timestamp:number, interval: number, provider: JsonRpcProvider) => {
    
    let diff = currentBlock.timestamp - timestamp;
    // if (provider.network.chainId == 1088) console.log('diff ' + diff + ' ' + currentBlock.number );

    if (Math.abs(diff) <= interval) {
        const result = diff > 0 ? currentBlock.number - 1 : currentBlock.number;
        return result;
    }

    let numberOfBlocks = Math.abs((timestamp - currentBlock.timestamp)/interval);

    let factor = currentBlock.timestamp >  timestamp ? -1 : 1;

    let newBlockNumber = currentBlock.number + factor * Math.floor(numberOfBlocks);

    let newBlock = await provider.getBlock(newBlockNumber);

    let newInterval = Math.abs((newBlock.timestamp-currentBlock.timestamp) / (newBlock.number - currentBlock.number));
    // if (provider.network.chainId == 1088) console.log(newInterval);

    return await recursiveSearch(newBlock, timestamp, newInterval > 0 ? newInterval : 1, provider);
}

const subGraphBlockSearch = async (chain: any, timestamp: number) => {
    const data = `{\"query\":\"{\\n  blocks(\\n        first: 1,\\n        orderBy: number,\\n        orderDirection: desc,\\n        where: {\\n          timestamp_lte: \\n${timestamp}\\n        }\\n      ) {\\n    timestamp, number\\n  } \\n}\\n\",\"variables\":null}`;

    let response = await axios.post(chain.subgraph, data);

    let block = response.data.data.blocks[0];


    let resp = {
        chain: chain.id,
        blockNumber: parseInt(block.number)
    };

    return resp;
}

export default fetchBlocks;