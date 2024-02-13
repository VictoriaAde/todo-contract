import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Todo", function () {
  async function deployTodoContractFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Todo = await ethers.getContractFactory("Todo");
    const todoContract = await Todo.deploy();
    return { todoContract, owner, otherAccount };
  }

  describe("Creating, updating, toggling, and deleting todos", function () {
    it("Should create a todo", async function () {
      const { todoContract } = await loadFixture(deployTodoContractFixture);
      await todoContract.createTodo(
        "Wash Clothes",
        "You must wash all clothes"
      );
      const [title, description, isDone] = await todoContract.getTodo(0);
      expect(title).to.equal("Wash Clothes");
      expect(description).to.equal("You must wash all clothes");
      expect(isDone).to.equal(false);
    });
  });
});
