#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

console.log(chalk.magenta('\n \t Work to be done  \n'));

let toDoList:string[] = [];

let Conditions = true;

let main = async () => {
  while (Conditions) {
    let option = await inquirer.prompt([
      {
        name: 'Choice',
        type: 'list',
        message: 'Select an option you want to perform',
        choices: ['AddTask', 'DeleteTask', 'UpdateTask', 'ViewList', 'Exit'],
      },
    ]);

    if (option.Choice === 'AddTask') {
      await addTask();
    } else if (option.Choice === 'DeleteTask') {
      await deleteTask();
    } else if (option.Choice === 'UpdateTask') {
      await updateTask();
    } else if (option.Choice === 'ViewList') {
      await viewList();
    } else if (option.Choice === 'Exit') {
      Conditions = false;
    }
  }
};

let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: 'NewTask',
      type: 'input',
      message: 'Enter your new task',
    },
  ]);

  toDoList.push(newTask.NewTask);

  console.log(`\n ${newTask.NewTask} task added successfully to your list`);
};

let deleteTask = async () => {
  if (toDoList.length === 0) {
    console.log('\n No tasks to delete');
    return;
  }

  let taskToDelete = await inquirer.prompt([
    {
      name: 'TaskIndex',
      type: 'list',
      message: 'Select the task you want to delete',
      choices: toDoList.map((task, index) => ({ name: task, value: index })),
    },
  ]);

  let deletedTask = toDoList.splice(taskToDelete.TaskIndex, 1);
  console.log(`\n ${deletedTask} task deleted successfully from your list`);
};

let updateTask = async () => {
  if (toDoList.length === 0) {
    console.log('\n No tasks to update');
    return;
  }

  let taskToUpdate = await inquirer.prompt([
    {
      name: 'TaskIndex',
      type: 'list',
      message: 'Select the task you want to update',
      choices: toDoList.map((task, index) => ({ name: task, value: index })),
    },
    {
      name: 'UpdatedTask',
      type: 'input',
      message: 'Enter the updated task',
    },
  ]);

  toDoList[taskToUpdate.TaskIndex] = taskToUpdate.UpdatedTask;
  console.log(`\n Task updated successfully`);
};

let viewList = () => {
  console.log(`\n Your To-Do list: \n`);
  toDoList.forEach((task, index) => {
    console.log(`${index}: ${task}`);
  });
};

main();
