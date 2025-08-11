const { log } = require("console");
const fs = require("fs");
const filePath = "./tasks.json"; 

/**
 // print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
Launching the Node.js process as:

node process-args.js one two=three four
Would generate the output:

0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
**/

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath); //an object not string
        const dataJSON = dataBuffer.toString(); 
        return JSON.parse(dataJSON); 
    }
    catch (error) 
    {
        return []; 
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks); 
    fs.writeFileSync(filePath, dataJSON);
}

const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({task}); 
    saveTasks(tasks);
    console.log("Task added ", task);
}

const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((task, index) => console.log(`${index + 1} : ${task.task}`));    
}

const removeTask = (index) => {
    const tasks = loadTasks(); 
    if(index <1 || index > tasks.length) 
    {
        console.log("Invalid index!");
        return;
    }
    const removed = tasks.splice(index-1, 1);
    saveTasks(tasks);
    console.log(`Removed task: ${removed[0].task}`);

}

const command = process.argv[2];
const argument = process.argv[3]; 

if(command === 'add') {
    addTask(argument);
}
else if (command === 'list') {
    listTasks();
}
else if(command === 'remove') {
    removeTask(parseInt(argument)); 
}
else {
    console.log("Command not found!");
}
