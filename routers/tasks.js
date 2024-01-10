const express = require("express");
const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getAllTask).post(createTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
