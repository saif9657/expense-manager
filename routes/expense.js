const express = require("express");
const router = express.Router();

const Expense = require("../models/expense");
const auth = require("../middleware/auth");


// ➕ ADD EXPENSE
router.post("/", auth, async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user
  });
  res.json(expense);
});


// 📥 GET EXPENSES
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user });
  res.json(expenses);
});


// ❌ DELETE EXPENSE
router.delete("/:id", auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;