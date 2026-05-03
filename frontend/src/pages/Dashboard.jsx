import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await API.get("/expenses", {
      headers: { Authorization: token }
    });
    setExpenses(res.data);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {expenses.map((e) => (
        <div key={e._id}>
          {e.title} - ₹{e.amount}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;