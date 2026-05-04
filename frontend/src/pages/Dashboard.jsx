import { useEffect, useState } from "react";
import { getExpenses, addExpense, deleteExpense } from "../services/api";

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

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>

      <div style={styles.form}>
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

      <div style={styles.list}>
        {expenses.map((exp) => (
          <div key={exp._id} style={styles.card}>
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

const styles = {
  container: {
    padding: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    background: "#f4f4f4",
  },
};

export default Dashboard;