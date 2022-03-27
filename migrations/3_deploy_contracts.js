const VerifySignatureUpgraded = artifacts.require("VerifySignatureUpgraded");


module.exports = function(deployer) {
  deployer.deploy(VerifySignatureUpgraded);
};
