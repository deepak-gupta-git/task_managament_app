const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');


dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://task-managament-app.vercel.app/login', credentials: true }));


// MongoDB Connection

const mongoURI = process.env.MONGODB_URI; 
mongoose.connect(mongoURI, 
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
         { console.log('MongoDB connected'); }).catch(err => 
            { console.error('MongoDB connection error:', err); });


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
    res.json("Hello From Backend")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
