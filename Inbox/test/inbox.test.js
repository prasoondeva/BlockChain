const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Web3 start with capital letter because it is considered as Class and can be used to make instance of web3

const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //Get list of all the accounts
    accounts = await web3.eth.getAccounts();
    
    //Use one of the account
    //to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode, arguments : ['Hi There!']})
    .send({from : accounts[0], gas : '1000000'});

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract',() => {
        assert.ok(inbox.options.address);
    });

    it('has a defualt messsage', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There!');
    });

    it('can set new message', async () => {
        await inbox.methods.SetMessage('Bye').send({ from : accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    });
});