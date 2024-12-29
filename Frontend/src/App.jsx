import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import { AuthProvider, useAuth } from './context/AuthContext';
import RegisterForm from './components/RegisterForm';
import AddTask from './components/AddTask';
import 'react-toastify/dist/ReactToastify.css';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect the root path to login or dashboard based on authentication */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/register" /> : <Navigate to="/login" />} />
          {/* Define other routes */}
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/addtask" element={<AddTask onAddTask={handleAddTask} />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/tasklist" element={
            <PrivateRoute>
              <TaskList tasks={tasks} />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
