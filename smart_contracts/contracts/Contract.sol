// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenDistributorV1 {
    address payable public owner;
    IERC20 public token;

    constructor(address _token) {
        owner = payable(msg.sender);
        token = IERC20(_token);
    }

    uint8 public constant decimals = 18;
    uint256 public constant DECIMALS_MULTIPLIER = 10**decimals;

    // Generate a pseudo-random number between 100 and 300,000
    function random() private view returns (uint256) {
        uint256 randomness = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, token.balanceOf(address(this)))));
        uint256 scaled = (randomness % 299901) + 100;  // scaled to [100, 300000]
        return scaled * DECIMALS_MULTIPLIER;  // scale by decimals
    }


    // This function is called whenever someone sends MATIC to the contract
    receive() external payable {
        require(msg.value >= 5 ether, "Send exactly 0.1 MATIC to get tokens.");

        uint256 tokenBalance = token.balanceOf(address(this));
        require(tokenBalance > 0, "Contract has no tokens to give.");

        uint256 randomTokens = (random() % tokenBalance) + 1;
        require(token.transfer(msg.sender, randomTokens), "Token transfer failed.");

        // Forward the received MATIC to your wallet
        owner.transfer(msg.value);
    }

    // Allow you to withdraw any remaining tokens in the contract
    function withdrawTokens() external {
        require(msg.sender == owner, "Only owner can withdraw.");
        uint256 tokenBalance = token.balanceOf(address(this));
        token.transfer(owner, tokenBalance);
    }

    // Allow the owner to withdraw any MATIC from the contract
    function withdrawMatic() external {
        require(msg.sender == owner, "Only owner can withdraw.");
        owner.transfer(address(this).balance);
    }

}
