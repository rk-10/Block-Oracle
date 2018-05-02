var Web3 = require('web3');
var request = require('request');
var web3 = new Web3();
var config = require('./config');
var provider = config.provider;
web3.setProvider(new web3.providers.HttpProvider(provider));
const usingoracle_address = config.usingOracleAddr;
var ABI = require("./ABIs/baseOracleABI");

var contract = web3.eth.contract(ABI);
var Usingoracle = contract.at(usingoracle_address);
const fetchABI_url = 'http://ropsten.etherscan.io/api?module=contract&action=getabi&address=';

var queryevent = Usingoracle.Querysent();

queryevent.watch(function (error,result) {
    if (!error) {
        console.log(result.args._address);
        console.log(result.args.data);
        console.log(result.args._id);

        console.log(result.args._proof);
        var url_string = result.args.data;
        var developer_address = result.args._address;
        var id = result.args._id;
        var proof = result.args._proof;

        if (proof !== ''){

            var json = {
                'ID': id,
                'address': developer_address,
                'data': url_string,
                'proof': 'true'
            };
            hitAPI(json)
        }
        else {
            var _json = {
                ID: id,
                address: developer_address,
                data: url_string,
                proof: 'false'
            };
            hitAPI(_json)
        }
    }
    else{
        console.log(error)
    }
});


var hitAPI = function (json) {
    request({
        url: 'http://13.250.34.192:3000/entry',
        method: 'POST',
        json: true,
        body: json,
        followAllRedirects: true,

    }, function (err,res,body) {
        if(err) console.log('Error while hitting api: '+err);
        // console.log(res);
        console.log(body)
    })
};