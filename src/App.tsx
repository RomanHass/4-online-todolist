import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  // BLL
  const todolistTitle: string = "What to learn";

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },    
    { id: v1(), title: "CSS", isDone: true },    
    { id: v1(), title: "JS/TS", isDone: false },    
  ]);

  const removeTask = (taskId: string) => {
    const nextState:Array<TaskType> = tasks.filter(task => task.id !== taskId);
    setTasks(nextState);
  };

  const addTask = (title: string) => {
    setTasks([{ id: v1(), title: title, isDone: false }, ...tasks])  
  };

  const changeTaskStatus = (taskId: string, newStatus: boolean) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newStatus} : t))
  };


  // UI
  const [filter, setFilter] = useState<FilterValuesType>('all');

  let filteredTasks: Array<TaskType> = tasks;

  if (filter === 'active') {
    filteredTasks = tasks.filter(t => !t.isDone);
  }

  if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.isDone);
  }

  const changeFilter = (newFilterValue: FilterValuesType) => {
    setFilter(newFilterValue);
  };

  return (
    <div className="App">
      <Todolist title={todolistTitle} 
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
      />
    </div>
    
  );
}

export default App;
