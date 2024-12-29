const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();

app.use(cors({
  origin: "task-managament-app.vercel.app",
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true
}));


app.get("/", (req, res) => {
    res.status(200).send("Hello from Backend");
});

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI; 
mongoose.connect(mongoURI, 
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
         { console.log('MongoDB connected'); }).catch(err => 
            { console.error('MongoDB connection error:', err); });


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
