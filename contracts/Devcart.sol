//SPDX-Lisence-Identifier:UNLICENSED
pragma solidity ^0.8.0;

contract Devcart {
    address public owner;

    struct Item {
        string name;
        uint256 price;
        uint256 count;
    }

    struct Order {
        uint256 time;
        Item[] cart;
    }

    Order[] public order;

    mapping(address => mapping(uint256 => Order)) public totalOrders;
    mapping(address => uint256) public orderCount;

    event Buy(address buyer, uint orderCount);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function buy(
        uint256 totalPrice,
        Item[] memory recievedCart
    ) public payable {
        require(msg.value >= totalPrice);
        orderCount[msg.sender]++;

        Order storage currentOrder = order.push();

        currentOrder.time = block.timestamp;
        for (uint256 i = 1; i < recievedCart.length; i++) {
            currentOrder.cart[i] = recievedCart[i];
        }
        totalOrders[msg.sender][orderCount[msg.sender]] = currentOrder;

        emit Buy(msg.sender, orderCount[msg.sender]);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
