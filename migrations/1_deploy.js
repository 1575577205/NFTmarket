var NFT = artifacts.require("NFT");
var market = artifacts.require("market");

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(NFT, { overwrite: true });
    await deployer.deploy(market, NFT.address, { overwrite: true });
  });
};
