var request = require("request");
var querystring = require('querystring');
var config = require("../config");
var wolframURL = config.wolfram_url;
var app_id = config.wolfram_appID;

var module = module.exports = {};

var wolframalpha_url = function (query) {
    var _url = wolframURL;
    var qp = querystring.stringify({
        "appid": app_id,
        "input": query,
        "includepodid": "Result",
        "format": "plaintext",
        "output": "json"
    });
    return _url + qp
};

module.wolframalpha_request = function (_query) {

    var url = wolframalpha_url(_query);

    return new Promise(function (resolve, reject) {
        request.get(url,function (err,res,body) {
            if(err) return reject(err);
            var parse_result = JSON.parse(body);
            var _result = parse_result.queryresult.pods[0].subpods[0].plaintext;
            console.log(_result);
            return resolve(_result)
        })
    })
};