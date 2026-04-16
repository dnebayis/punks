// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Script.sol";
import "../src/CryptoPunks.sol";

contract DeployCryptoPunks is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        CryptoPunks nft = new CryptoPunks(deployer, deployer);

        vm.stopBroadcast();

        console.log("CryptoPunks deployed at:", address(nft));
        console.log("Admin:", deployer);
        console.log("Minter:", deployer);
        console.log("Max Supply: 1000");
        console.log("Symbol: PUNK");
    }
}
