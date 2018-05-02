var chai = require('chai');
var expect = chai.expect;
var url = require('../src/url_filter');
var assert = require('assert');

describe("URL parser test", function () {
    it("parser should return json", function () {
        var str1 = "json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        var parser = url._filterPARSER(str1);
        expect(parser).to.equal("json")
    });

    it("parser should return xml", function () {
        var str1 = "xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel";
        var parser = url._filterPARSER(str1);
        expect(parser).to.equal("xml")
    })
});


describe("URL parameters test", function () {
    it("parameters retured mentioned in the url string should have same length", function () {
        var str1 = "json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        var test_params = str1.split('(')[1].split(')')[1].split('.');
        var params = url._filterPARAMS(str1);
        expect(params.split('.').length).to.equal(test_params.length)
    });

    it("parameters retured mentioned in the url string should be same", function () {
        var str1 = "json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        var test_params = str1.split(')')[1];
        var params = url._filterPARAMS(str1);
        /*for(var i=0;i<=params.length-1;i++){
            expect(params[i]).to.equal(test_params[i])
        }*/
        // expect(params).to.deep.equal(test_params);
        // expect(params).to.eql(test_params);
        assert.deepEqual(params,test_params)
    })
});


describe("URL test", function () {
    it("should return url containing HTTPS", function () {
        var str1 = "json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        var _url = url._filterURL(str1);
        expect(_url).to.include("https://")
    });

    it("should return url containing HTTP", function () {
        var str1 = "json(http://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        var _url = url._filterURL(str1);
        expect(_url).to.include("http://")
    })
});





