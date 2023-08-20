const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();

  const Devcart = await hre.ethers.getContractFactory("Devcart");
  const devcart = await Devcart.deploy();
  await devcart.deployed();

  console.log(`deployed address'${devcart.address}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
