const { ethers, upgrades } = require("hardhat");

async function main() {
  const Devcart = await ethers.getContractFactory("Devcart");
  const deployedContract = await upgrades.deployProxy(Devcart, [], {});
  await deployedContract.waitForDeployment();
  const address = await deployedContract.getAddress();
  console.log(address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
