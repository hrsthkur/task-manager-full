const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo: req.user._id  
    });

    await task.save();

    res.status(201).json({ msg: 'Task created successfully', task });
  } catch (error) {
    res.status(400).json({
      msg: 'Task creation failed',
      error: error.message
    });
  }
};


// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch tasks', error: error.message });
  }
};

// Get Task by ID
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'email');
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({task});
  } catch (err) {
    res.status(500).json({ msg: 'Error finding task' });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const updatedFields = req.body;
    if (req.files) {
      updatedFields.documents = req.files.map(file => file.path);
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    res.json({ msg: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(400).json({ msg: "Task update failed", error: error.message });
  }
};


// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting task' });
  }
};
