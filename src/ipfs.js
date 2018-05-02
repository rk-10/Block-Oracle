var ipfsAPI = require('ipfs-api');
var exports = module.exports = {};

var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}); // leaving out the arguments will default to these values

exports.Upload_to_IPFS = function (file_path) {

    return new Promise(function (resolve,reject) {
        ipfs.util.addFromFs(file_path,{recursive: true}, function (err,result) {
            if(err) return reject(err);
            console.log(result);
            return resolve(result[0].hash)
        });
    })
};

exports.ViewFile_IPFS = function (file_hash) {

    var filepath = '/ipfs/'+file_hash;

    return new Promise(function (resolve, reject) {
        ipfs.files.cat(filepath, function (err, file) {
            if (err) {
                reject("Error while uploading file: "+err)
            }
            console.log(file.toString('utf8'));
            return resolve(file.toString('utf-8'));
        });
    })
};
