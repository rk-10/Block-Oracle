var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var web3 = new Web3();
var config = require('../config');
var privatekey = config.privateKey;
var publickey = config.publicKey;
var providerUri = config.provider;

var exports = module.exports = {};
web3.setProvider(new web3.providers.HttpProvider(providerUri));

exports.send_callback = function (abi, address, result, id, proof) {
    var contract = web3.eth.contract(abi);
    var contract_instance = contract.at(address);

    var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);
    var gasLimitHex = web3.toHex(300000);
    var nonce =  web3.eth.getTransactionCount(publickey) ;

    var rawTransaction = {
        "from": publickey,
        "nonce": web3.toHex(nonce),
        "gasLimit": gasLimitHex,
        "gasPrice": gasPriceHex,
        "to": address,
        "value": "0x0",
        "data": contract_instance.__callback.getData(id, result, proof, {from: publickey}),
        "chainId": 0x03
    };

    var tx = new Tx(rawTransaction);

    tx.sign(new Buffer(privatekey, 'hex'));

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Transaction hash: ' + hash);
    });
};