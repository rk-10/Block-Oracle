var chai = require('chai');
var expect = chai.expect;
var assert_chai = chai.assert;
var ABI = require('../src/ABI');
// var assert = require('assert');
const contractADDR = '';


describe("ABI TEST", function () {

    it("Returns an array which has a length between 2 and 50", function () {
        const fetchABI_url = 'http://ropsten.etherscan.io/api?module=contract&action=getabi&address=' + contractADDR;
        this.timeout(10000);

        ABI.fetch(fetchABI_url)
            .then(function (result) {
                // console.log(result)
                expect(result).to.be.an('array');
                expect(result.length).to.be.within(2, 50);
            })
            .catch(function (err) {
                console.log(err)
            })
    });

    it("Checks whether ABI has a callback function or not and whether that function is payable or not", function () {
        const fetchABI_url = 'http://ropsten.etherscan.io/api?module=contract&action=getabi&address=' + contractADDR;
        this.timeout(10000);

        ABI.fetch(fetchABI_url)
            .then(function (result) {
                // console.log(result)
                for(var i=0;i<=result.length-1;i++){
                    if(i.name === "__callback"){ //if i.name is not found it will throw an error!
                        expect(i.payable === true);
                        // expect(result[i]).to.deep.include(callback)
                    }
                }
            })
    })
});

/* ************************ ABI Tests completed *********************** */