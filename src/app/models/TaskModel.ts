import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  }
})

const TaskModel = mongoose.model('Task', taskSchema)

export { TaskModel }
