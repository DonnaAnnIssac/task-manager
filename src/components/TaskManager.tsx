import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTask,
  fetchTasks,
} from "../store/taskSlice";
import { RootState } from "../store";
import { Task, TaskStatus } from "../types";

const TaskManager = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [filter, setFilter] = useState<TaskStatus | "ALL">("ALL");

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      dispatch(
        addTask({ title: newTaskTitle, description: newTaskDescription })
      );
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const handleToggleTask = (id: number, status: string) => {
    dispatch(toggleTask({ id, status }));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "IN_PROGRESS") return task.status === "IN_PROGRESS";
    if (filter === "DONE") return task.status === "DONE";
    if (filter === "ALL") return task;
    return true;
  });

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
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as TaskStatus | "ALL")}
        >
          <option value="ALL">All</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        {filteredTasks.map((task: Task) => (
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
