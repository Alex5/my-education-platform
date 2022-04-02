const Video = artifacts.require("Video");

module.exports = function(deployer) {
    deployer.deploy(Video);
};