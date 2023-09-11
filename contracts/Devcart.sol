// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Devcart {
    address public owner;

    mapping(address => string[]) public storageCID;
    mapping(address => uint256) public orderCount;

    event Buy(
        address indexed buyer,
        uint256 indexed orderCount,
        uint indexed timestamp
    ); // Added "indexed" keyword for better event filtering

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function buy(string calldata CID) public payable {
        require(msg.value > 0, "Value cannot be 0");
        orderCount[msg.sender]++;
        storageCID[msg.sender].push(CID);
        emit Buy(msg.sender, orderCount[msg.sender], block.timestamp);
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Contract balance is empty");
        (bool success, ) = payable(owner).call{value: address(this).balance}(
            ""
        );
        require(success, "Withdrawal failed");
    }

    function getCIDs(
        address userAddress
    ) public view returns (string[] memory) {
        return storageCID[userAddress];
    }
}
