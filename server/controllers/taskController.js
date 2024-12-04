const Task = require('../models/taskSchema')
const users = require('../models/userModel')

module.exports.usertask = async (req, res, next) => {
    const { _id } = req.query;
    const taskData = await Task.findOne({ userId: _id })
    if (taskData) return res.json({ status: true, taskData })
    else return res.json({ status: false, msg: "No task found" })
}

module.exports.alltask = async (req, res, next) => {
    const alltasks = await Task.find().select(["taskCounts", "_id", "username"])
    return res.json({ status: true, alltasks })
}

module.exports.addtask = async (req, res, next) => {
    try {
        const { tasktitle, taskdate, assignto, category, taskdescription } = req.body
        var user = await users.findOne({ username: assignto })


        if (!user)
            return res.json({ msg: "User does not exist", status: false })
        user = user.toObject()
        delete user.password
        delete user.avatarImage
        let usernameCheck = await Task.findOne({ username: assignto })

        if (!usernameCheck) {
            usernameCheck = new Task({
                username: assignto,
                usertype: user.usertype,  // Or whatever default usertype you want to assign
                userId: user._id,
                taskCounts: {
                    active: 0,
                    newTask: 0,
                    completed: 0,
                    failed: 0,
                },
                tasks: [],  // Empty task array
            });
        }

        const newTask = {
            active: true, // Assuming a new task is active by default
            newTask: true, // Assuming it's a newly assigned task
            completed: false,
            failed: false,
            taskTitle: tasktitle,
            taskDescription: taskdescription,
            taskDate: new Date(taskdate),
            category: category,
        };

        usernameCheck.tasks.push(newTask)
        usernameCheck.taskCounts.active += 1;
        usernameCheck.taskCounts.newTask += 1;
        await usernameCheck.save();

        return res.json({ status: true, msg: "task added successfully", user: user._id })
    } catch (err) {
        next()
    }



}