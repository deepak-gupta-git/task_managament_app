import React, { useState } from "react";
import { NavLink } from "react-router-dom";



const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Make A website for Reunion",
      priority: 5,
      status: "Pending",
      startTime: "26-Nov-24 11:00 AM",
      endTime: "30-Nov-24 11:00 AM",
      totalTime: 96,
    },
    {
      id: 2,
      title: "Finish code",
      priority: 2,
      status: "Finished",
      startTime: "25-Nov-24 09:05 AM",
      endTime: "25-Nov-24 03:15 PM",
      totalTime: 6.17,
    },
    {
      id: 3,
      title: "Having Food",
      priority: 5,
      status: "Finished",
      startTime: "25-Nov-24 09:05 AM",
      endTime: "25-Nov-24 03:15 PM",
      totalTime: 6.17,
    },
    {
      id: 4,
      title: "Make a website",
      priority: 2,
      status: "Finished",
      startTime: "25-Nov-24 09:05 AM",
      endTime: "25-Nov-24 03:15 PM",
      totalTime: 6.17,
    },
    {
      id: 5,
      title: "Go for Running",
      priority: 2,
      status: "Finished",
      startTime: "25-Nov-24 09:05 AM",
      endTime: "25-Nov-24 03:15 PM",
      totalTime: 6.17,
    },
    // Other tasks...
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Add Task handler
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 }, // Generate a new ID for the new task
    ]);
  };

  // Delete Task handler
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit Task handler
  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
  };

  // Save edited task
  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask ? { ...task, title: editTitle } : task
      )
    );
    setEditingTask(null);
    setEditTitle("");
  };

  return (
    <div className="p-4">
    <NavLink to="/dashboard"><h1 className="text-2xl font-bold mb-4">Task List</h1></NavLink>
    <NavLink to="/addtask">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        + Add Task
      </button>
    </NavLink>




      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Task ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Priority</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Edit</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
              >
                <td className="border border-gray-300 px-4 py-2">{task.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{task.priority}</td>
                <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingTask === task.id ? (
                    <button
                      onClick={saveEdit}
                      className="text-green-500 hover:underline"
                    >
                      ✅ Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-500 hover:underline"
                    >
                      ✏️ Edit
                    </button>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <AddTask onAddTask={handleAddTask} /> */}
    </div>

    
  );
};

export default TaskList;
