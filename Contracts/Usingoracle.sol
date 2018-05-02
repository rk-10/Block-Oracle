pragma solidity ^0.4.18;

contract baseOracle{
    // function query(string datasource, string url) payable public returns(bytes32 myid);
    function query(string datasource, string url, string _proof) payable external returns(bytes32 myid);
    function get_gasPrice(address addr, string datasource, uint gas_limit) external returns(uint totalprice);
}

contract Usingoracle{

    address _owner;
    baseOracle base;
    // uint public gasPrice;

    modifier owner{
        if(msg.sender!=_owner) return;
        _;
    }

     function Usingoracle(address base_addr){
         _owner = msg.sender;
         base = baseOracle(base_addr);
     }

    function setBaseAddr(address base_addr) owner {
        baseOracle base = baseOrace(base_addr);
    }


    function call_query(string datasource, string url) internal returns(bytes32 myid){
        uint gasPrice = base.get_gasPrice(msg.sender, datasource, 2000000);
        string proof;
        base.query.value(gasPrice)(datasource,url,proof);
    }

    function call_query(string datasource, string url, string _proof) internal returns(bytes32 myid){
        uint gasPrice = base.get_gasPrice(msg.sender, datasource, 2000000);
        base.query.value(gasPrice)(datasource,url,_proof);
    }
}
