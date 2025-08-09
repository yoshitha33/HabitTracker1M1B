// Suggestions.jsx
function Suggestions({ mostUsed, onAcceptChallenge }) {
  const tips = {
    food: [
      "Try plant-based meals 3 times a week.",
      "Buy from local farmers' markets.",
      "Reduce packaged and processed foods."
    ],
    housing: [
      "Improve insulation to reduce heating/cooling.",
      "Switch to LED lighting.",
      "Use natural ventilation when possible."
    ],
    electricity: [
      "Install solar panels or switch to green energy providers.",
      "Unplug devices when not in use.",
      "Use energy-efficient appliances."
    ],
    waste: [
      "Compost organic waste.",
      "Avoid single-use plastics.",
      "Recycle properly and reduce packaging."
    ],
    travel: [
      "Use public transport or cycle more.",
      "Carpool with friends or coworkers.",
      "Avoid short flights when alternatives exist."
    ],
    plastic: [
      "Carry reusable bags and bottles.",
      "Avoid plastic packaging.",
      "Switch to biodegradable alternatives."
    ],
    water: [
      "Fix leaks and install low-flow fixtures.",
      "Turn off tap while brushing teeth.",
      "Reuse greywater for plants."
    ]
  };

  return (
    <div className="p-6 text-left">
      <h2 className="text-xl font-bold mb-4">Suggestions for Reducing {mostUsed.toUpperCase()} Impact</h2>
      <ul className="list-disc pl-6 space-y-2">
        {tips[mostUsed].map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>

      <button
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
        onClick={onAcceptChallenge}
      >
        Accept Challenge
      </button>
    </div>
  );
}

export default Suggestions;
