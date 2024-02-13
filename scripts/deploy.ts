import { ethers } from "hardhat";

async function main() {
  const todocontract = await ethers.deployContract("Todo");

  await todocontract.waitForDeployment();

  console.log(`Todo Contract deployed to ${todocontract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
