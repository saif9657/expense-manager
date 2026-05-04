import { useEffect, useState } from "react";
import { getExpenses, addExpense, deleteExpense } from "../services/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // 🔄 Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ➕ Add expense
  const handleAdd = async () => {
    try {
      await addExpense({ title, amount, category });
      setTitle("");
      setAmount("");
      setCategory("");
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete expense
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Add Expense */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleAdd}>Add Expense</button>

      <hr />

      {/* Expense List */}
      {expenses.map((exp) => (
        <div key={exp._id}>
          <p>
            {exp.title} - ₹{exp.amount} ({exp.category})
          </p>
          <button onClick={() => handleDelete(exp._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;