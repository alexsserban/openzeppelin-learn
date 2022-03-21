const { ethers, upgrades } = require("hardhat");

async function main() {
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    console.log("Upgrading Box...");
    await upgrades.upgradeProxy("0x0165878A594ca255338adfa4d48449f69242Eb8F", BoxV2);
    console.log("Box upgraded");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
