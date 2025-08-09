// Results.jsx
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#AA66CC", "#00C49F", "#FF8042", "#8884d8"];

function Results({ excess, mostUsed, onViewSuggestions }) {
  const data = Object.entries(excess).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: Math.round(value)
  }));

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Your Excess Carbon Usage</h2>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>

      <p className="mt-4 text-lg">
        Highest impact area: <strong>{mostUsed.toUpperCase()}</strong>
      </p>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={onViewSuggestions}
      >
        View Suggestions
      </button>
    </div>
  );
}

export default Results;
