import express from "express";

import {addTask,
    getTask,
    deleteTask
}  from "../controller/taskController.js";



const router = express.Router();


//Add task

router.post("/add",addTask);

//Delete Task
router.delete("/:id",deleteTask);

//get tasks
router.get("/",getTask);

export default router;