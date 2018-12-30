const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'Contracts', 'inbox.sol');

const sourceCode = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(sourceCode, 1).contracts[':Inbox'];