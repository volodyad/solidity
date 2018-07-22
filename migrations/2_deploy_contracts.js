var rps = artifacts.require("./rps.sol");

module.exports = function(deployer) {
  deployer.deploy(rps);
};
