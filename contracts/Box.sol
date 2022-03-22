// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./access-control/Auth.sol";

contract Box is Initializable {
    uint256 private _value;
    Auth private _auth;

    event ValueChanged(uint256 value);

    // constructor() {
    //     _auth = new Auth(msg.sender);
    // }

    function initialize(uint256 _x) public initializer {
        _auth = new Auth(msg.sender);
        store(_x);
    }

    function store(uint256 value) public {
        // Require that the caller is registered as an administrator in Auth
        require(_auth.isAdministrator(msg.sender), "Unauthorized");

        _value = value;
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }
}
