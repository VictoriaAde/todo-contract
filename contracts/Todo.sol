// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Write a todo smart Contract that makes use of struct and arrays.
// This contract has nothing to do with mapping.
// A user can create a todo see all todos they create.
// Add a status of isDone using a boolean.
// One function should toggle the isDone status.
// Users should be able to update title, description, isdone status and delete todo.
// Finally, write and test with remix and hardhat.

contract Todo{

 struct TodoStruc{
        string title;
        string description;
        bool isDone;
   }

   TodoStruc[] private todos; 

   modifier  checkIfTodoExists(uint256 _index){
        require(_index < todos.length, "Todo does not exist");
    _;
    }

   function createTodo(string calldata _title, string calldata _description ) external  {
     todos.push(TodoStruc({title: _title, description: _description, isDone: false}));
   }

    function getTodo(uint _index) external  view  checkIfTodoExists(_index)  returns (string memory title, string memory description, bool isDone)  {
        TodoStruc storage todo = todos[_index];
        return (todo.title, todo.description, todo.isDone);
    }

    function updateTodo(uint256 _index, string calldata _title, string calldata _description) public checkIfTodoExists(_index) {
        TodoStruc storage todo = todos[_index];
        todo.title = _title;
        todo.description = _description;
   }

    function toggleTodo(uint256 _index) external   checkIfTodoExists(_index) {
        TodoStruc storage todo = todos[_index];
        todo.isDone = !todo.isDone;
    }

    function deleteTodo( uint256 _index) external  checkIfTodoExists(_index)  {
        delete todos[_index];
    }

}