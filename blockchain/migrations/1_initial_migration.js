const SmartOdometer = artifacts.require("SmartOdometer");

module.exports = function (deployer) {
  deployer.deploy(SmartOdometer);
};
