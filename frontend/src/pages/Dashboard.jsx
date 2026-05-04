import { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "../services/api";

import ExpenseChart from "../components/ExpenseChart";

function Dashboard({ dark }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async () => {
    await addExpense({ title, amount, category });
    resetForm();
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const handleEdit = (exp) => {
    setEditId(exp._id);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category);
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/expenses/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, amount, category }),
    });

    resetForm();
    fetchExpenses();
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setEditId(null);
  };

  const total = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <h3>Total: ₹{total}</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />

        {editId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <ExpenseChart expenses={expenses} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
        gap: "15px",
        marginTop: "20px"
      }}>
        {expenses.map((exp) => (
          <div
            key={exp._id}
            style={{
              padding: "15px",
              borderRadius: "10px",
              background: dark ? "#1e1e1e" : "#fff"
            }}
          >
            <h4>{exp.title}</h4>
            <p>₹{exp.amount}</p>
            <p>{exp.category}</p>

            <button onClick={() => handleEdit(exp)}>Edit</button>
            <button onClick={() => handleDelete(exp._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;