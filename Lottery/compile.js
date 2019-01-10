const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'Contracts', 'lottery.sol');

const sourceCode = fs.readFileSync(lotteryPath, 'utf8');

module.exports = solc.compile(sourceCode, 1).contracts[':Lottery'];