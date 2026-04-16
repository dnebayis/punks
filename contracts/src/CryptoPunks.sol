// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./interfaces/IArcAIArtNFT.sol";

contract CryptoPunks is
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    AccessControl,
    ReentrancyGuard,
    IArcAIArtNFT
{
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MAX_PER_WALLET = 5;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 private _nextTokenId = 1;
    mapping(address => uint256) private _walletMintCount;

    constructor(
        address defaultAdmin,
        address minter
    ) ERC721("CryptoPunks", "PUNK") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, minter);
    }

    function publicMint(
        string calldata _tokenURI
    ) external nonReentrant {
        require(totalSupply() < MAX_SUPPLY, "Max supply reached");
        require(
            _walletMintCount[msg.sender] < MAX_PER_WALLET,
            "Wallet mint limit reached"
        );

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _walletMintCount[msg.sender]++;

        emit Minted(msg.sender, tokenId, _tokenURI);
    }

    function mintTo(
        address _to,
        string calldata _uri
    ) external nonReentrant onlyRole(MINTER_ROLE) {
        require(totalSupply() < MAX_SUPPLY, "Max supply reached");

        uint256 tokenId = _nextTokenId++;
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _uri);

        emit Minted(_to, tokenId, _uri);
    }

    function walletMintCount(
        address wallet
    ) public view returns (uint256) {
        return _walletMintCount[wallet];
    }

    function totalSupply()
        public
        view
        override(ERC721Enumerable, IArcAIArtNFT)
        returns (uint256)
    {
        return ERC721Enumerable.totalSupply();
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(
            ERC721,
            ERC721URIStorage,
            ERC721Enumerable,
            AccessControl
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
}
