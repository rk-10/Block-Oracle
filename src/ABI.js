var request = require('request');
var exports = module.exports = {};


exports.fetch = function (url) {

    return new Promise(function (resolve, reject) {

        request.get(url, function (err,res,body) {
            if (err) {
                return reject(err);
            }
            var jsonObject = JSON.parse(body);
            var abi = jsonObject.result;
            var result = JSON.parse(abi);
            return resolve(result)
        });
    })
};

