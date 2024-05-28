const express = require('express')
const router = express.Router()
const TaskModel = require('../schema/task')
require('dotenv').config()

router.get('/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params
        const tasks = await TaskModel.find({ projectId: projectId })
        res.json(tasks)
    } catch (error) {
        console.error('Error fetching tasks:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

//need to fix --Akash
router.get('/:userId', async (req, res) => {
    try {
        const { projectId } = req.params
        const tasks = await TaskModel.find({ projectId: projectId })
        res.json(tasks)
    } catch (error) {
        console.error('Error fetching tasks:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newTask = new TaskModel({ ...req.body })
        const insertedTask = await newTask.save()

        return res.status(201).json(insertedTask)
    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.put('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: taskId },
            req.body,
            { new: true }
        )

        return res.status(201).json(updatedTask)
    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.delete('/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params
        const deletedTask = await TaskModel.deleteOne({ _id: taskId })
        if (deletedTask.deletedCount === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }
        return res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.delete('/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params
        const deletedTask = await TaskModel.deleteMany({ projectId: projectId })
        if (deletedTask.deletedCount === 0) {
            return res.status(404).json({ error: 'Tasks not found' })
        }
        return res.status(200).json({ message: 'Tasks deleted successfully' })
    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.put('/addUsers', async (req, res) => {})

router.put('/deleteUsers', async (req, res) => {})

module.exports = router
