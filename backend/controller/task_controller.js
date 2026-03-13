import Task from "../models/tasks_model.js";
import { v4 as uuidv4 } from "uuid";

const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }
        const task = await Task.create({
            title,
            description,
            taskid: uuidv4(),       // auto-generate task ID
            priority,
            dueDate,
            user: req.user.id,      // from auth middleware
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating task",
            error: error.message,
        });
    }
};
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching tasks",
            error: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.body;
        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.user.id,      // ensure task belongs to the logged-in user
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting task",
            error: error.message,
        });
    }
};
const setPriority = async (req, res) => {
    try {
        const { id } = req.body;
        const { priority } = req.body;              // priority from body, not params

        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Priority must be low, medium, or high",
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },         // scoped to current user
            { priority },
            { new: true }                           // return updated document
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Priority updated successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error setting priority",
            error: error.message,
        });
    }
};
const setStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;  // expects true or false

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Completed must be a boolean (true or false)",
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { completed },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: `Task marked as ${completed ? "completed" : "incomplete"}`,
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating task status",
            error: error.message,
        });
    }
};

export { createTask, getTasks, deleteTask, setPriority, setStatus };


