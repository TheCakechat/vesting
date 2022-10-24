async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const DesupToken = await ethers.getContractFactory('DesupToken');
  const token = await DesupToken.deploy('5000000000000000000000000000');

  console.log('Token address:', token.address);

  const TokenVesting = await ethers.getContractFactory('DesupTokenVesting');
  const tokenVesting = await TokenVesting.deploy(token.address);
  console.log('TokenVesting address:', tokenVesting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
