var chai = require('chai');
var expect = chai.expect;
// var assert_chai = chai.assert;
var TLSnotary = require('../src/tlsnotary');
// var assert = require('assert');


describe("TLS NOTARY TESTS", function () {

    it("TLS notary url should not contain http:// | https:// and it should be a string", function () {
        var str1 = "json(http://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c[0]";
        this.timeout(100000);
        var tls_url = TLSnotary.get_tls_url(str1);
        expect(tls_url).to.be.a('string');
        expect(tls_url).does.not.include("https://");
        expect(tls_url).does.not.include("http://");
    });

    // If first test fails, this will also fail!!
    it("TLS notary file path should contain /Users/rk/tlsnotary/src/auditee and should be a string", function () {
        var url = "api.kraken.com/0/public/Ticker?pair=ETHXBT";
        this.timeout(100000);
        TLSnotary.Notarize(url)
            .then(function (result) {
                expect(result).to.be.a('string');
                expect(result).to.include('/Users/rk/tlsnotary/src/auditee')
            })
    })
});