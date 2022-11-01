const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert } = require("chai");
const { getNamedAccounts, ethers, network } = require("hardhat");
const { develpmentChains } = require("../../helper-hardhat-config");

develpmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("1");
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      it("allows people to fund and withraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);

        assert.equal(endingBalance.toString(), "0");
      });
    });
