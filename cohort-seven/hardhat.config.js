require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
networks:{
 sepolia: {
    url:'https://eth-sepolia.g.alchemy.com/v2/${process.with.c}',
  accounts: [process.env.WALLET_PRIVATE_KEY],
},
ethereum:{
  url: 'https://eth-mainet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}',
  accounts: [process.env.WALLET_PRIVATE_KEY],
  chainId: 44787,
},

},

  solidity: "0.8.27",
};