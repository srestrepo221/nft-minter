async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("\nAccount balance:", (await deployer.getBalance()).toString());

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(1);

  console.log("\nNFT contract address:", nft.address);
  console.log("\nMarket-place contract address:", marketplace.address);
 
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });