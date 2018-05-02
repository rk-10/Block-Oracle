var request = require('request');
var parseString = require('xml2js').parseString;

var exports = module.exports = {};


exports._filterPARSER = function (string) {
    var parser = string.split('(')[0];
    console.log(parser);
    return parser
};

exports._filterURL = function (string) {

    var _url = string.split('(')[1].split(')')[0];
    console.log(_url);
    return _url
};

exports._filterPARAMS = function (string) {
    var params = string.split(')')[1];
    console.log(params);
    return params
};


// TODO : Request data can also be fetched from tlsnotary file

exports._requestJSON = function (url,param,callback) {
    request.get(url,function (err,res,body) {
        if (err){
            console.log('Error while hitting the url')
        }
        else {
            // console.log(param);
            var jsonobject = JSON.parse(body);
            var _res = 'jsonobject' + param;
            var final_result = eval(_res);
            console.log(final_result);
            return callback(final_result)
        }
    })
};


exports._requestXML = function (url,param,callback) {
    request.get(url,function (err,res,body) {
        if (err){
            console.log('Error while hitting the url')
        }
        else {
            // console.log(param);
            // console.log(body);
            parseString(body, function (err,res) {
                console.dir(res);
                var xml = res;
                var finres = 'xml' + param;
                var final_result = eval(finres);
                console.log(final_result[0]);
                return callback(final_result[0])
            });
        }
    })
};


exports.hitURL = function (complete_url) {
    var parser = exports._filterPARSER(complete_url);
    var url = exports._filterURL(complete_url);
    var params = exports._filterPARAMS(complete_url);

    return new Promise(function (resolve, reject) {
        if(parser.toLowerCase() === "json"){
            exports._requestJSON(url,params, function (result) {
                console.log(result);
                return resolve(result)
            })
        }
        else if(parser.toLowerCase() === "xml"){
            exports._requestXML(url,params, function (result) {
                console.log(result);
                return resolve(result)
            })
        }
        else {
            return reject(Error("parser not found"));
        }
    })
};