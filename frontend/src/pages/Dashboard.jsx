import { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "../services/api";

import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async () => {
    await addExpense({ title, amount, category });
    setTitle("");
    setAmount("");
    setCategory("");
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  // 💡 total calculation
  const total = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <h3>Total Spending: ₹{total}</h3>

      <div style={{ marginBottom: "20px" }}>
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
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* 📊 Chart */}
      <ExpenseChart expenses={expenses} />

      <hr />

      <div>
        {expenses.map((exp) => (
          <div
            key={exp._id}
            style={{
              background: "#f4f4f4",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h4>{exp.title}</h4>
            <p>₹{exp.amount}</p>
            <p>{exp.category}</p>
            <button onClick={() => handleDelete(exp._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;