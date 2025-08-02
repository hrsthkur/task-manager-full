const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');


// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', authMiddleware, upload.array('documents', 3), taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.get('/:id', authMiddleware, taskController.getTask);
router.put('/:id', authMiddleware, upload.array('documents', 3), taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);


module.exports = router;
