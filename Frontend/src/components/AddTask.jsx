
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("Pending");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title || !priority || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const totalTime = Math.abs(
      new Date(endTime) - new Date(startTime)
    ) / 36e5;

    onAddTask({
      title,
      priority: parseInt(priority),
      status,
      startTime,
      endTime,
      totalTime: totalTime.toFixed(2),
    });

    // Clear input fields
    setTitle("");
    setPriority("");
    setStatus("Pending");
    setStartTime("");
    setEndTime("");
  };

  return (
    <form
      className="mb-6 space-y-4 p-4 bg-gray-100 rounded shadow"
      onSubmit={handleAddTask}
    >
      <h2 className="text-xl font-bold">Add New Task</h2>
      <div>
        <label className="block font-medium">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter task title"
        />
      </div>
      <div>
        <label className="block font-medium">Priority (1-5):</label>
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter priority"
          min="1"
          max="5"
        />
      </div>
      <div>
        <label className="block font-medium">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <NavLink to="/tasklist">
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    + Add Task
  </button>
</NavLink>
    </form>
  );
};

export default AddTask;

