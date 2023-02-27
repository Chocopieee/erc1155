import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

describe("ExampleToken", function () {
  let accounts: Signer[];
  let exampleToken: Contract;

  const URI = "https://example.com/token/{id}.json";
  const INITIAL_SUPPLY = 100;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const ExampleToken = await ethers.getContractFactory("ExampleToken");
    exampleToken = await ExampleToken.deploy();

    await exampleToken.deployed();
  });

  it("should allow the owner to mint tokens", async function () {
    const tokenId = 0;
    const tokenAmount = 10;

    await exampleToken.connect(accounts[0]).mint(accounts[0].getAddress(), tokenId, tokenAmount, []);

    expect(await exampleToken.balanceOf(accounts[0].getAddress(), tokenId)).to.equal(tokenAmount);
  });

  it("should allow the owner to mint tokens in batch", async function () {
    const tokenIds = [0, 1, 2];
    const tokenAmounts = [10, 20, 30];

    await exampleToken.connect(accounts[0]).mintBatch(accounts[0].getAddress(), tokenIds, tokenAmounts, []);

    for (let i = 0; i < tokenIds.length; i++) {
      expect(await exampleToken.balanceOf(accounts[0].getAddress(), tokenIds[i])).to.equal(tokenAmounts[i]);
    }
  });
});


