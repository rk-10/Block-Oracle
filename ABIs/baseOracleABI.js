exports.ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "db",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_address",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "data",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "_id",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "_proof",
                "type": "string"
            }
        ],
        "name": "Querysent",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "myid",
                "type": "bytes32"
            },
            {
                "name": "result",
                "type": "string"
            }
        ],
        "name": "__callback",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "datasource",
                "type": "string"
            },
            {
                "name": "url",
                "type": "string"
            },
            {
                "name": "_proof",
                "type": "string"
            }
        ],
        "name": "query",
        "outputs": [
            {
                "name": "myid",
                "type": "bytes32"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "datasource",
                "type": "string"
            },
            {
                "name": "url",
                "type": "string"
            }
        ],
        "name": "query",
        "outputs": [
            {
                "name": "myid",
                "type": "bytes32"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "user",
                "type": "address"
            }
        ],
        "name": "show_id",
        "outputs": [
            {
                "name": "id",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdrawfunds",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];