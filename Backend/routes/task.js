const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body, userId: req.userId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Get Tasks with Pagination and Filters
router.get('/', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10, priority, status } = req.query;
        const filters = { userId: req.userId };
        if (priority) filters.priority = priority;
        if (status) filters.status = status;

        const tasks = await Task.find(filters)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Update Task
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

module.exports = router;