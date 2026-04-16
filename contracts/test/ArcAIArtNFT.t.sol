// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "forge-std/Test.sol";
import "../src/CryptoPunks.sol";

contract CryptoPunksTest is Test {
    CryptoPunks public nft;
    address public admin;
    address public minter;
    address public user1;
    address public user2;

    function setUp() public {
        admin = address(1);
        minter = address(2);
        user1 = address(3);
        user2 = address(4);

        vm.startPrank(admin);
        nft = new CryptoPunks(admin, minter);
        vm.stopPrank();
    }

    function test_InitialState() public view {
        assertEq(nft.name(), "CryptoPunks");
        assertEq(nft.symbol(), "PUNK");
        assertEq(nft.MAX_SUPPLY(), 1000);
        assertEq(nft.MAX_PER_WALLET(), 5);
        assertTrue(nft.hasRole(nft.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(nft.hasRole(nft.MINTER_ROLE(), minter));
    }

    function test_PublicMint() public {
        vm.prank(user1);
        nft.publicMint("ipfs://QmTest1");

        assertEq(nft.ownerOf(1), user1);
        assertEq(nft.tokenURI(1), "ipfs://QmTest1");
        assertEq(nft.totalSupply(), 1);
        assertEq(nft.walletMintCount(user1), 1);
    }

    function test_PublicMintMultiple() public {
        vm.startPrank(user1);
        for (uint256 i = 0; i < 5; i++) {
            nft.publicMint(string(abi.encodePacked("ipfs://QmTest", vm.toString(i))));
        }
        vm.stopPrank();

        assertEq(nft.totalSupply(), 5);
        assertEq(nft.walletMintCount(user1), 5);
        assertEq(nft.balanceOf(user1), 5);
    }

    function test_RevertWhen_WalletLimitExceeded() public {
        vm.startPrank(user1);
        for (uint256 i = 0; i < 5; i++) {
            nft.publicMint("ipfs://test");
        }

        vm.expectRevert("Wallet mint limit reached");
        nft.publicMint("ipfs://oneMore");
        vm.stopPrank();
    }

    function test_RevertWhen_MaxSupplyReached() public {
        vm.store(
            address(nft),
            bytes32(uint256(9)),
            bytes32(uint256(10000))
        );
        vm.store(
            address(nft),
            bytes32(uint256(12)),
            bytes32(uint256(10001))
        );

        assertEq(nft.totalSupply(), 10000);

        vm.prank(user2);
        vm.expectRevert("Max supply reached");
        nft.publicMint("ipfs://overLimit");
    }

    function test_MintToByMinter() public {
        vm.prank(minter);
        nft.mintTo(user2, "ipfs://QmMinter");

        assertEq(nft.ownerOf(1), user2);
        assertEq(nft.tokenURI(1), "ipfs://QmMinter");
        assertEq(nft.totalSupply(), 1);
    }

    function test_RevertWhen_MintToWithoutRole() public {
        vm.prank(user1);
        vm.expectRevert();
        nft.mintTo(user2, "ipfs://unauthorized");
    }

    function test_TokenURI() public {
        vm.prank(user1);
        nft.publicMint("ipfs://QmTokenURI");

        assertEq(nft.tokenURI(1), "ipfs://QmTokenURI");
    }

    function test_RevertWhen_TokenURIOfNonexistent() public {
        vm.expectRevert();
        nft.tokenURI(999);
    }

    function test_ERC721Transfer() public {
        vm.prank(user1);
        nft.publicMint("ipfs://test");

        vm.prank(user1);
        nft.transferFrom(user1, user2, 1);

        assertEq(nft.ownerOf(1), user2);
        assertEq(nft.balanceOf(user1), 0);
        assertEq(nft.balanceOf(user2), 1);
    }

    function test_ERC721Approve() public {
        vm.prank(user1);
        nft.publicMint("ipfs://test");

        vm.prank(user1);
        nft.approve(user2, 1);

        assertEq(nft.getApproved(1), user2);
    }

    function test_EnumerableTokenByIndex() public {
        vm.startPrank(user1);
        nft.publicMint("ipfs://a");
        nft.publicMint("ipfs://b");
        vm.stopPrank();

        assertEq(nft.tokenByIndex(0), 1);
        assertEq(nft.tokenByIndex(1), 2);
    }

    function test_EnumerableTokenOfOwnerByIndex() public {
        vm.prank(user1);
        nft.publicMint("ipfs://a");

        assertEq(nft.tokenOfOwnerByIndex(user1, 0), 1);
    }

    function test_MintToDoesNotAffectWalletCount() public {
        vm.prank(minter);
        nft.mintTo(user1, "ipfs://backend");

        assertEq(nft.walletMintCount(user1), 0);
    }

    function test_DifferentUsersCanMint() public {
        vm.prank(user1);
        nft.publicMint("ipfs://u1");

        vm.prank(user2);
        nft.publicMint("ipfs://u2");

        assertEq(nft.totalSupply(), 2);
        assertEq(nft.walletMintCount(user1), 1);
        assertEq(nft.walletMintCount(user2), 1);
    }

    function test_GrantMinterRole() public {
        vm.startPrank(admin);
        nft.grantRole(nft.MINTER_ROLE(), user1);
        vm.stopPrank();

        assertTrue(nft.hasRole(nft.MINTER_ROLE(), user1));

        vm.prank(user1);
        nft.mintTo(user2, "ipfs://newMinter");
    }

    function test_SupportsInterface() public view {
        assertTrue(nft.supportsInterface(type(IERC721).interfaceId));
        assertTrue(nft.supportsInterface(type(IERC721Metadata).interfaceId));
        assertTrue(nft.supportsInterface(type(IERC721Enumerable).interfaceId));
    }
}
