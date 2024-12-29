import React, { useState, useEffect } from 'react';
import Header from './Header';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Buy clothes',
      priority: 5,
      status: 'Pending',
      startTime: '26-Nov-24 11:00 AM',
      endTime: '30-Nov-24 11:00 AM',
      totalTime: 96,
    },
    {
      id: 2,
      title: 'Finish code',
      priority: 2,
      status: 'Finished',
      startTime: '25-Nov-24 09:05 AM',
      endTime: '25-Nov-24 03:15 PM',
      totalTime: 6.17,
    },
    {
      id: 3,
      title: 'Book travel tickets',
      priority: 4,
      status: 'Pending',
      startTime: '19-Nov-24 10:00 PM',
      endTime: '20-Nov-24 11:00 PM',
      totalTime: 25,
    },
    {
      id: 4,
      title: 'Order groceries',
      priority: 3,
      status: 'Finished',
      startTime: '14-Oct-24 10:30 AM',
      endTime: '16-Oct-24 10:30 PM',
      totalTime: 60,
    },
    {
      id: 5,
      title: 'Medical checkup',
      priority: 1,
      status: 'Pending',
      startTime: '19-Nov-24 01:15 PM',
      endTime: '21-Dec-24 05:00 PM',
      totalTime: 51.75,
    },
  ]);

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'Finished').length;
  const pendingTasks = totalTasks - completedTasks;
  const completedPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  const pendingPercentage = totalTasks ? (pendingTasks / totalTasks) * 100 : 0;
  const averageCompletionTime =
    completedTasks > 0
      ? tasks
          .filter((task) => task.status === 'Finished')
          .reduce((sum, task) => sum + task.totalTime, 0) / completedTasks
      : 0;

  return (
    <div>
      <Header />

      <div className="p-4">
        <h1 id="dashboard" className="text-2xl font-bold mb-4">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="font-semibold">Total Tasks</h2>
            <p>{totalTasks}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="font-semibold">Completed Tasks</h2>
            <p>{completedPercentage.toFixed(2)}%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="font-semibold">Pending Tasks</h2>
            <p>{pendingPercentage.toFixed(2)}%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="font-semibold">Average Completion Time</h2>
            <p>{averageCompletionTime.toFixed(2)} hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
