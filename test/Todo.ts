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

  it("Should update a todo", async function () {
    const { todoContract } = await loadFixture(deployTodoContractFixture);

    await todoContract.createTodo("Wash Clothes", "You must wash all clothes");

    await todoContract.updateTodo(
      0,
      "Don't Wash Clothes",
      "You must not wash all clothes"
    );

    const [title, description, isDone] = await todoContract.getTodo(0);
    expect(title).to.equal("Don't Wash Clothes");
    expect(description).to.equal("You must not wash all clothes");
    expect(isDone).to.equal(false);
  });

  it("Should toggle the status of a todo", async function () {
    const { todoContract } = await loadFixture(deployTodoContractFixture);

    await todoContract.createTodo("Wash Clothes", "You must wash all clothes");

    await todoContract.toggleTodo(0);
    const [title, description, isDone] = await todoContract.getTodo(0);
    expect(isDone).to.equal(true);
  });

  it("Should delete a todo", async function () {
    const { todoContract } = await loadFixture(deployTodoContractFixture);

    await todoContract.createTodo("Wash Clothes", "You must wash all clothes");

    await todoContract.deleteTodo(0);
    // Try to get the deleted todo, it should fail
    try {
      await todoContract.getTodo(0);
      // If getTodo succeeds, it means the todo was not deleted
      expect.fail("Cannot get todo, it has been deleted");
    } catch (error: any) {
      expect(error.message).to.contain("todo does not exist");
    }
  });
});
