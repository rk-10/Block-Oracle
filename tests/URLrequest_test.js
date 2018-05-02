var chai = require('chai');
var expect = chai.expect;
var assert_chai = chai.assert;
var url = require('../src/url_filter');
// var assert = require('assert');

describe("URL request test", function () {

    it("URL JSON request is not null and is a string", function (done) {
        // var str1 = "json(http://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        var _url = "http://api.kraken.com/0/public/Ticker?pair=ETHXBT";
        var params = ".result.XETHXXBT.c[0]";
        this.timeout(10000);
        url._requestJSON(_url, params, function (result) {
            assert_chai.isNotNull(result);
            expect(result).to.be.a('string');
            done();
        })
    });

    it("URL XML request is not null and is a string", function (done) {
        // var str1 = "xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel";
        var _url = "https://www.fueleconomy.gov/ws/rest/fuelprices";
        var params = ".fuelPrices.diesel";
        this.timeout(10000);
        url._requestXML(_url, params, function (result) {
            assert_chai.isNotNull(result);
            expect(result).to.be.a('string');
            done();
        })
    })
});


describe("Complete URL process test: Function finds parser,url,params and then requests", function () {
    it("hitURL function returns a string which is not null", function () {
        var str1 = "json(http://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        this.timeout(10000);
        url.hitURL(str1)
            .then(function (result) {
                assert_chai.isNotNull(result);
                expect(result).to.be.a('string');
            })
    })
});


/* ********************** all unit tests for url filter have been completed ********************  */