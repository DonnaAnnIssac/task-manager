import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, toggleTask } from "../store/taskSlice";
import { RootState } from "../store";
import { Task } from "../types";

const TaskManager = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  const handleAddTask = () => {
    dispatch(addTask({ title: newTaskTitle, description: newTaskDescription }));
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleToggleTask = (id: number, status: string) => {
    dispatch(toggleTask({ id, status }));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add New Task Title here"
        />
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Add New Task Description here"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="mb-4">
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <div>
              <input
                type="checkbox"
                checked={task.status === "DONE"}
                onChange={() => handleToggleTask(task.id, task.status)}
              />
              <span>{task.title}</span>
              <span>{task.description}</span>
            </div>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
