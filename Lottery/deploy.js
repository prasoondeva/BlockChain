const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface , bytecode } = require('./compile');

const provider  = new HDWalletProvider(
    'fatigue joke sort street tragic target owner daughter visit casual pair broccoli',
    'https://rinkeby.infura.io/v3/255cf1b881f24797bf024232ebf40c38'
); 

const web3 = new Web3(provider);

const deploy = async () => {
    
    const accounts = await web3.eth.getAccounts();
    
    console.log('Deploying constract to Rinkeby using account: ',accounts[0]);

    const contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode })
    .send({from : accounts[0], gas : '1000000'});

    console.log('Contract deployed at: ',contract.options.address);
};

deploy();