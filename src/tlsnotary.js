var PythonShell = require('python-shell');
var tlspath = require('../config').tlsPath;

var exports = module.exports = {};

exports.Notarize = function (url) {

    var options = {
        mode: 'text',
        scriptPath: tlspath,
        args: [url]
    };

    return new Promise(function (resolve, reject) {
        PythonShell.run('notarize.py',options,function (err,res) {
            if (err){
                console.log('Error while running the script');
                return reject(err)
            }
            console.log(res);
            var path = exports.NotarizeFile_path_finder(res);
            console.log(path);
            return resolve(path)
        })
    })
};


exports.NotarizeFile_path_finder = function (result) {
    var str = 'You can pass the file(s)';
    for(var i=0;i<=result.length-1;i++){
        var string = result[i];
        if (string.includes(str)){
            return string.split(')')[1].split(' ')[2]
        }
    }
};

exports.get_tls_url = function (complete_url) {
    return complete_url.split('(')[1].split(')')[0].split("://")[1]
};