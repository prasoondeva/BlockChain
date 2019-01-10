const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Web3 start with capital letter because it is considered as Class and can be used to make instance of web3

const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
    //Get list of all the accounts
    accounts = await web3.eth.getAccounts();
    
    //Use one of the account to deploy the contract
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode })
    .send({from : accounts[0], gas : '1000000'});

    lottery.setProvider(provider);
});

describe('Lottery', () => {
    it('deploys a contract',() => {
        assert.ok(lottery.options.address);
    });

    it('allows player to enter', async () => {
        await lottery.methods.enter().send({ from : accounts[0], value : web3.utils.toWei('0.02', 'ether') });
        
        const players = await lottery.methods.getPlayers().call({ from : accounts[0] });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple players to enter', async () => {
        await lottery.methods.enter().send({ from : accounts[0], value : web3.utils.toWei('0.02', 'ether') });
        await lottery.methods.enter().send({ from : accounts[1], value : web3.utils.toWei('0.02', 'ether') });
        await lottery.methods.enter().send({ from : accounts[2], value : web3.utils.toWei('0.02', 'ether') });
        
        const players = await lottery.methods.getPlayers().call({ from : accounts[0] });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);

        assert.equal(3, players.length);
    });

    it('require minimum amount of ether to enter', async () => {
        try
        {
            await lottery.methods.enter().send({ from : accounts[0], value : web3.utils.toWei('0', 'ether') });
            assert(false);
        } catch(err)
        {
            assert(err);
        }
    });

    it('only manager can pick winner', async () => {
        try
        {
            await lottery.methods.enter().send({ from : accounts[1] });
            assert(false);
        } catch(err)
        {
            assert(err);
        }
    });
});