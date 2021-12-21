import chains from "../../chains";
import axios from 'axios';
import { Block, JsonRpcProvider, Provider } from "@ethersproject/providers";

const fetchBlocks = async (timestamp: number) => {
    console.log(`Starting block fetching`);
    let promises = [];
    
    Object.values(chains).forEach(chain => {
        promises.push(findBlockForChain(chain, timestamp));
    });

    let results = await Promise.all(promises);
    let blockResponse = {};
    results.forEach(res => blockResponse[res.chain] = res.blockNumber);
    return blockResponse;
}

const findBlockForChain = async (chain: any, timestamp: number) => {
    return chain.subgraph ? subGraphBlockSearch(chain, timestamp) : smartBinaryBlockSearch(chain, timestamp);
}

const smartBinaryBlockSearch = async (chain: any, timestamp: number) => {

    const provider = new JsonRpcProvider(chain.rpc, chain.id);
    let currentBlock = await provider.getBlock('latest');

    let blockInterval = chain.blockinterval;

    let result = await recursiveSearch(currentBlock, timestamp, blockInterval, provider);


    let resp = {
        chain: chain.id,
        blockNumber: result
    };

    console.log(`${chain.name} finished with block ${result}`);

    return resp;
}

const recursiveSearch = async (currentBlock: Block, timestamp:number, interval: number, provider: Provider) => {

    let diff = currentBlock.timestamp - timestamp;

    if (Math.abs(diff) <= interval) {
        const result = diff > 0 ? currentBlock.number - 1 : currentBlock.number;
        return result;
    }

    let numberOfBlocks = Math.abs((timestamp - currentBlock.timestamp)/interval);

    let factor = currentBlock.timestamp >  timestamp ? -1 : 1;

    let newBlockNumber = currentBlock.number + factor * Math.floor(numberOfBlocks);

    let newBlock = await provider.getBlock(newBlockNumber);

    let newInterval = Math.abs((newBlock.timestamp-currentBlock.timestamp) / (newBlock.number - currentBlock.number));

    return await recursiveSearch(newBlock, timestamp, newInterval, provider);
}

const subGraphBlockSearch = async (chain: any, timestamp: number) => {
    const data = `{\"query\":\"{\\n  blocks(\\n        first: 1,\\n        orderBy: number,\\n        orderDirection: desc,\\n        where: {\\n          timestamp_lte: \\n${timestamp}\\n        }\\n      ) {\\n    timestamp, number\\n  } \\n}\\n\",\"variables\":null}`;

    let response = await axios.post(chain.subgraph, data);

    let block = response.data.data.blocks[0];


    let resp = {
        chain: chain.id,
        blockNumber: block.number
    };

    console.log(`${chain.name} finished with block ${block.number}`);

    return resp;
}

export default fetchBlocks;