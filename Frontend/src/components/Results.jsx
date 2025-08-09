// src/components/Results.jsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Results({ scores, totalFootprint, mostUsed, excess, onViewSuggestions }) {
  if (!scores) {
    return (
      <div className="text-center mt-6 text-red-600">
        ⚠️ Unable to load footprint data. Please try again later.
      </div>
    );
  }

  const data = {
    labels: ["Water", "Waste", "Electricity", "Plastic", "Carbon Emissions"],
    datasets: [
      {
        data: [
          scores.water,
          scores.waste,
          scores.electricity,
          scores.plastic,
          scores.carbon
        ],
        backgroundColor: [
          "#60A5FA", "#FBBF24", "#34D399", "#F87171", "#A78BFA"
        ],
        borderColor: "#fff",
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw.toFixed(2)} units`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
        Your Carbon Footprint Overview
      </h2>

      <div className="relative h-64 w-full">
        <Pie data={data} options={options} />
      </div>

      <p className="mt-6 text-center text-lg">
        🌍 Total Footprint: <strong>{totalFootprint?.toFixed(2)}</strong>
      </p>
      <p className="mt-2 text-center text-md">
        ⚠️ Highest Impact Area:{" "}
        <strong className="capitalize text-red-600">{mostUsed}</strong>
      </p>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onViewSuggestions}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Get Suggestions to Reduce {mostUsed}
        </button>
      </div>
    </div>
  );
}

export default Results;
