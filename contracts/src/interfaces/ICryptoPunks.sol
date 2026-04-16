// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface ICryptoPunks {
    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    function publicMint(string calldata _tokenURI) external;
    function mintTo(address _to, string calldata _uri) external;
    function totalSupply() external view returns (uint256);
    function walletMintCount(address wallet) external view returns (uint256);
}
