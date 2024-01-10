const Task = require("../models/task");
const asyncWrapper = require("../utils/asyncWrapper");
const { createCustomError } = require("../utils/error");

const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task)
    return next(createCustomError(404, `task with id ${id} doesn't exist`));
  res.status(200).json(task);
});

const createTask = asyncWrapper(async (req, res) => {
  const { name, isComplete } = req.body;
  const task = await Task.create({ name, isComplete });
  res.status(201).json(task);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { name, isComplete } = req.body;
  const task = await Task.findByIdAndUpdate(
    id,
    { name, isComplete },
    { new: true }
  );
  if (!task)
    return next(createCustomError(404, `task with id ${id} doesn't exist`));
  res.json(task);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task)
    return next(createCustomError(404, `task with id ${id} doesn't exist`));
  res.json(task);
});

module.exports = {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
