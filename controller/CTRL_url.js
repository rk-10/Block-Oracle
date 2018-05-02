var mongoose = require('mongoose');
var Model = mongoose.model('Model1');
var urlRequest = require('../src/url_filter');
var tlsnotary = require('../src/tlsnotary');
var IPFS = require('../src/ipfs');
var ABI = require('../src/ABI');
var callback = require('../src/callback');

var module = module.exports = {};

module.url_controller = function (req,res) {

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

    var url = urlRequest._filterURL(data_dict.data);
    console.log(url);
    var tlsnotaryurl = tlsnotary.get_tls_url(data_dict.data);

    if(data_dict.proof.toLowerCase() === "true"){

        Promise.all([
            proof_hash(tlsnotaryurl), //Notarization and uploading proof on ipfs: returns ipfs hash
            urlRequest.hitURL(data_dict.data), //fetches data from the provided url
            ABI.fetch(abi_url) //fetches ABI of the developer's contract
        ])
            .then(function (result) {
                console.log(result[0]);
                console.log(result[1]);
                console.log(result[2]);

                callback.send_callback(result[2], data_dict.address, result[1], data_dict.ID, result[0])
            })
            .catch(function (err) {
                console.log("Something went wrong during execution :"+err)
            });
    }
    else {
        Promise.all([
            urlRequest.hitURL(data_dict.data),
            ABI.fetch(abi_url)
        ])
            .then(function (result) {
                console.log(result[0]);
                console.log(result[1]);

                var proof = "";
                callback.send_callback(result[1], data_dict.address, result[0], data_dict.ID, proof)
            })
            .catch(function (err) {
                console.log("Something went wrong during execution :"+err)
            });
    }

    res.json({
        message: "Process initiated"
    })

};


var proof_hash = function (URL) {

    return new Promise(function (resolve, reject) {

        tlsnotary.Notarize(URL)
            .then(function (proof_path) {
                return IPFS.Upload_to_IPFS(proof_path)
            })
            .then(function (ipfs_hash) {
                return resolve(ipfs_hash)
            })
            .catch(function (error) {
                return reject(error)
            })
    })
};