import './style.css';
import Task from './modules/task';
import Project from './modules/project';

const task1 = Task('Elden Ring', 'PC', '2/25/22', 'High');
const task2 = Task('Monster Hunter Rise', 'PC', '2/22/22', 'Low');
const project1 = Project('Video Game Backlog');

project1.addTask(task1);
project1.addTask(task2);
console.log(project1.getTasks());
console.log(project1.getTitle());
console.log(project1.getTaskCount());
