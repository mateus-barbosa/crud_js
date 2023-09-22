const Task = require('../models/Task.js');

const taskController = {};

taskController.getAllTasks = (request, resolve) => {
  Task.getAll((err, tasks) => {
    if (err) {
      resolve.status(500).json({ error: err.message })
      return;
    }
    resolve.status(200).json({tasks: tasks})
  })
}

taskController.createTask = (request, resolve) => {
  const task = {
    description: request.body.description,
  }

  Task.create(task, (err) => {
    if (err) {
      resolve.status(500).json({ error: err.message })
      return;
    }
    resolve.json({ message: 'Task created succesfully' })
  })
}

taskController.getTaskById = (req, res) => {
  const id = req.params.id;

  Task.getById(id, (err, task) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return;
    }
    res.json(task)
  })
}

taskController.updateTask = (req, res) => {
  const id = req.params.id;
  const task = {
    description: req.body.description,
  };

  Task.update(id, task, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
};

taskController.deleteTask = (req, res) => {
  const id = req.params.id;

  Task.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
};

module.exports = taskController;