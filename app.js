require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to mongoDB cluster!')

  // Create schemas, compile to model, instantiate objects, save to db
  const Schema = mongoose.Schema
  const taskSchema = new Schema({
    task: String,
    dueDate: Date,
    isCompleted: Boolean
  }) // add keys later with Schema.add

  const Task = mongoose.model('Task', taskSchema) // instances of models are documents
  const goWalk = new Task({
    task: 'Go for a walk!',
    dueDate: Date.now(),
    isCompleted: false
  })

  goWalk.save((error, goWalk) => {
    if (error) return console.log(error)
    return console.log(`Saved task ${goWalk.task}`)
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})
