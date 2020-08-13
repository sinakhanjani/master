const message = require('../../../helper/message.helper')
const Service = require('../task/task.service')

get = async (req, res) => {
    try {        
        const tasks = await Service.tasks(req,res)
        const records = tasks.length
        const response = res.generic.add({ tasks })
        .withMessage(message.success.res)
        .addRecord(records)
        
        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

add = async (req, res) => {
    try {        
        const task = await Service.addTask(req,res)
        const response = res.generic.add({ task })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

user = async (req, res) => {
    try {
        if (!req.params.id) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }   
        
        const user = await Service.user(req,res)
        const response = res.generic.add({ user })

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

task = async (req, res) => {
    try {
        const _id = req.params.id
        if (!_id) {
            const response = res.generic.unknown()

            return res
            .status(500)
            .send(response)
        }
        const task = await Service.task(req,res)

        if (!task) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }
        
        const response = res.generic.add(task)

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unSuccess(e.message)

        res
        .status(500)
        .send(response)
    }
}

tasks = async (req, res) => {
    try {
        const tasks = await Service.userTasks(req,res)

        if (!tasks) {
            const response = res.generic.notFound()

            return res
            .status(500)
            .send(response)
        }        
        const records = tasks.length
        const response = res.generic.add({ tasks }).addRecord(records)

        res
        .status(200)
        .send(response)
    } catch (e) {
        const response = res.generic.unknown()

        res
        .status(500)
        .send(response)
    }
}

module.exports = {
    get,
    add,
    user,
    task,
    tasks
}