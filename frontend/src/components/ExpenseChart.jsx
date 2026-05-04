import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ExpenseChart({ expenses }) {
  // group expenses by category
  const categoryMap = {};

  expenses.forEach((exp) => {
    if (!categoryMap[exp.category]) {
      categoryMap[exp.category] = 0;
    }
    categoryMap[exp.category] += Number(exp.amount);
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryMap),
      },
    ],
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📊 Expense Chart</h3>
      <Bar data={data} />
    </div>
  );
}

export default ExpenseChart;