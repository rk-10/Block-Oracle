var mongoose = require('mongoose');
var Model = mongoose.model('Model1');
var IPFS = require('../src/ipfs');
var ABI = require('../src/ABI');
var callback = require('../src/callback');

var module = module.exports = {};

module.ipfsFile = function (req,res) {

    var data_dict = {
        ID: req.body.ID,
        address: req.body.address,
        data: req.body.data,
        datasource: req.body.datasource,
        proof: req.body.proof,
    };
    var abi_url = "http://ropsten.etherscan.io/api?module=contract&action=getabi&address=" + data_dict.address;

    var db_entry = new Model(data_dict);
    db_entry.save()
        .then((res) => {
            console.log("Data saved to db successfully: "+res)
        });

    Promise.all([
        IPFS.ViewFile_IPFS(data_dict.data),
        ABI.fetch(abi_url)
    ])
        .then(function (result) {
            var proof = "";
            callback.send_callback(result[1],data_dict.address,result[0],data_dict.ID,proof)
        })
        .catch(function (err) {
            console.log("Something went wrong during execution :"+err)
        });

    res.json({
        message: "Process initiated"
    })
};