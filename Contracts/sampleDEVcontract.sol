pragma solidity ^0.4.18;

import "./usingorcle.sol";

contract OracleA is Usingoracle{

    address oracle_address;
    string public _result;
    bytes32 public _myid;
    string public _proof;

    address _owner;

    event querySent(string description);
    event callbackReceived(string result);

    function OracleA() {
        // oracle_address = addr;
        _owner = msg.sender;
        // queryOracle();
    }

    function queryOracle() payable {
        querySent('The query has been sent');
        call_query("URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c.0");
    }

    function queryOracle_withProof() payable {
        querySent('The query has been sent');
        call_query("URL", "json(https://api.kraken.com/0/public/Ticker?pair=ETHXBT).result.XETHXXBT.c.0", "Yes");
    }

    function __callback(bytes32 myid, string result, string proof) public payable {
        callbackReceived(result);
        _result = result;
        _myid = myid;
        _proof = proof;
    }
}