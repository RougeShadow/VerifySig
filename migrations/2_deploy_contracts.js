const verify = artifacts.require("Verify");


module.exports = function(deployer) {
  deployer.deploy(verify);
};
