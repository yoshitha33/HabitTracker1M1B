// src/components/Suggestions.jsx
import { useLocation } from "react-router-dom";

const SUGGESTIONS = {
  electricity: [
    "Switch to renewable energy providers.",
    "Unplug devices when not in use.",
    "Use energy-efficient appliances.",
    "Install smart meters to monitor usage.",
    "Use natural lighting during the day."
  ],
  water: [
    "Install low-flow taps and showerheads.",
    "Fix leaks immediately.",
    "Reuse water for plants and cleaning.",
    "Collect rainwater for outdoor use.",
    "Turn off tap while brushing teeth."
  ],
  waste: [
    "Start composting kitchen waste.",
    "Segregate recyclables properly.",
    "Avoid single-use items.",
    "Donate or reuse old items.",
    "Use cloth bags instead of plastic."
  ],
  carbon: [
    "Use public transport or carpool.",
    "Switch to electric vehicles.",
    "Limit unnecessary air travel.",
    "Walk or bike for short distances.",
    "Support local produce to reduce transport emissions."
  ],
  plastic: [
    "Carry reusable bags and bottles.",
    "Avoid packaged goods.",
    "Choose biodegradable alternatives.",
    "Say no to plastic straws and cutlery.",
    "Buy in bulk to reduce packaging waste."
  ]
};

const BACKGROUNDS = {
  electricity: "/images/electricity.jpg",
  water: "/images/water.jpg",
  waste: "/images/waste.jpg",
  carbon: "/images/carbon.jpg",
  plastic: "/images/plastic.jpg"
};

function Suggestions() {
  const { state } = useLocation();
  const source = state?.source || "electricity";
  const tips = SUGGESTIONS[source];
  const backgroundImage = BACKGROUNDS[source];

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 p-6 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-green-700 capitalize">
          {source} Impact Reduction Tips
        </h2>
        <ul className="space-y-4">
          {tips.map((tip, idx) => (
            <li
              key={idx}
              className="bg-green-50 border border-green-200 p-4 rounded flex justify-between items-center"
            >
              <span className="text-green-800 font-medium">{tip}</span>
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                Accept Challenge
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Suggestions;
