// Testing Non Upgradable Box

const chai = require("chai");
const { ethers, waffle } = require("hardhat");
const { solidity } = waffle;

chai.use(solidity);
const { expect } = chai;

// Start test block
describe("Box", () => {
    let Box, box;
    let owner, addr1, addr2, addrs;

    const valueString = "42";
    const value = ethers.BigNumber.from(valueString);

    before(async () => {
        Box = await ethers.getContractFactory("Box");
    });

    beforeEach(async () => {
        box = await Box.deploy();
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        await box.deployed();
    });

    it("retrieve returns a value previously stored", async () => {
        await box.store(42);
        expect((await box.retrieve()).toString()).to.equal(valueString);
    });

    it("store emits an event", async () => {
        const tx = box.store(value);
        await expect(tx).to.emit(box, "ValueChanged").withArgs(value);
    });

    it("non owner cannot store a value", async () => {
        const tx = box.connect(addr1).store(value);
        await expect(tx).to.be.revertedWith("Unauthorized");
    });
});
