require("@nomicfoundation/hardhat-toolbox");
const ALCHEMY_API_KEY = "WYFcGNcnv3MtA3dm5YCmVtHBnxGjxfX2";
const SEPOLIA_PRIVATE_KEY =
  "40aef9725745c5d4b1b06f6aaae8aba7cdd20a3b4cb2541e063a9aa7622b5f5d";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};
