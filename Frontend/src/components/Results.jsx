// src/components/Results.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { excess, mostUsed } = state;

  const data = {
    labels: Object.keys(excess),
    datasets: [
      {
        data: Object.values(excess),
        backgroundColor: [
          "#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"
        ]
      }
    ]
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 text-green-700">🌍 Your Environmental Impact</h2>
      <Pie data={data} />
      <div className="mt-6 text-xl">
        <p>Highest damage source: <strong className="text-red-600 capitalize">{mostUsed}</strong></p>
        <button
          onClick={() => navigate("/suggestions", { state: { source: mostUsed } })}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          View Suggestions to Reduce Impact
        </button>
      </div>
    </div>
  );
}

export default Results;
