// src/components/CarbonCal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = {
  electricity: [
    { text: "Do you use renewable energy at home?", type: "positive" },
    { text: "Do you leave appliances plugged in?", type: "negative" },
    { text: "Do you monitor your electricity usage monthly?", type: "positive" }
  ],
  water: [
    { text: "Do you fix leaks promptly?", type: "positive" },
    { text: "Do you leave taps running while brushing?", type: "negative" },
    { text: "Do you reuse water for gardening or cleaning?", type: "positive" }
  ],
  waste: [
    { text: "Do you segregate waste properly?", type: "positive" },
    { text: "Do you compost organic waste?", type: "positive" },
    { text: "Do you burn or dump waste?", type: "negative" }
  ],
  carbon: [
    { text: "Do you use public transport or carpool?", type: "positive" },
    { text: "Do you drive a petrol/diesel vehicle daily?", type: "negative" },
    { text: "Do you limit air travel?", type: "positive" }
  ],
  plastic: [
    { text: "Do you carry reusable bags and bottles?", type: "positive" },
    { text: "Do you frequently buy packaged goods?", type: "negative" },
    { text: "Do you choose biodegradable alternatives?", type: "positive" }
  ]
};

const OPTIONS = [
  { label: "✅ Always", value: 0 },
  { label: "⚖️ Sometimes", value: 50 },
  { label: "❌ Never", value: 100 }
];

function CarbonCal() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(() => {
    const initial = {};
    Object.keys(QUESTIONS).forEach(source => {
      QUESTIONS[source].forEach((_, idx) => {
        initial[`${source}_${idx}`] = 0;
      });
    });
    return initial;
  });

  const handleChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleCalculate = () => {
    const excess = {};

    Object.entries(QUESTIONS).forEach(([source, questions]) => {
      let total = 0;
      questions.forEach((q, idx) => {
        const key = `${source}_${idx}`;
        const value = answers[key];
        const impact = q.type === "positive" ? value : 100 - value;
        total += impact;
      });
      excess[source] = total;
    });

    const mostUsed = Object.entries(excess).reduce(
      (max, [key, value]) => value > max.value ? { key, value } : max,
      { key: null, value: -Infinity }
    ).key;

    navigate("/results", { state: { excess, mostUsed } });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-700">🌱 Carbon Footprint Survey</h2>

      {Object.entries(QUESTIONS).map(([source, questions]) => (
        <div key={source} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 capitalize text-blue-700">{source}</h3>
          {questions.map((q, idx) => {
            const key = `${source}_${idx}`;
            return (
              <div key={key} className="mb-4">
                <label className="block text-lg mb-2">{q.text}</label>
                <div className="space-y-2">
                  {OPTIONS.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={key}
                        value={opt.value}
                        checked={answers[key] === opt.value}
                        onChange={e => handleChange(key, e.target.value)}
                        className="accent-green-600"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <button
        onClick={handleCalculate}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md"
      >
        Calculate Impact
      </button>
    </div>
  );
}

export default CarbonCal;
