pragma solidity ^0.4.18;

contract BaseOracle{

    event Querysent(address _address, string data, bytes32 _id, string  _proof);
    mapping(string => uint) dSource;
    mapping(address => uint) gPrice;
    address _owner;

    modifier onlyOwner{
        if(msg.sender!=_owner) return;
        _;
    }

    function BaseOracle(){
        _owner = msg.sender;
    }

    function query(string datasource, string url, string _proof) payable external returns(bytes32 myid){
        myid = keccak256(msg.sender, datasource, url);
        Querysent(msg.sender, url, myid, _proof);
        return myid;
    }

    function withdrawfunds() onlyOwner {
        _owner.send(this.balance);
    }

    //add datasource in uppercase as well as lowercase
    function add_DataSource(string ds, uint price) onlyOwner {
        dSource[ds] = price;
    }

    uint gasprice = 2000000;

    function setGasPrice(uint _price){
        gPrice[msg.sender] = _price;
    }

    function get_gasPrice(address addr, string datasource, uint gas_limit) external returns(uint tprice){
        uint _dsPrice = dSource[datasource];

        if(gPrice[addr] == 0){
            tprice = _dsPrice + gasprice*gas_limit;
        }
        else{
            uint _GAS_PRICE = gPrice[addr];
            tprice = _dsPrice + _GAS_PRICE*gas_limit;
        }
        return tprice;
    }

    function __callback(bytes32 myid, string result) public {
        return;
    }
}