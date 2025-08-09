// src/components/Suggestions.jsx
function Suggestions({ mostUsed, onAcceptChallenge }) {
  const tips = {
    water: [
      "Fix leaky taps and pipes promptly.",
      "Install low-flow showerheads and faucets.",
      "Use a bucket instead of a hose for washing.",
      "Harvest rainwater for gardening.",
      "Run washing machines only with full loads.",
      "Turn off the tap while brushing teeth.",
      "Use water-efficient appliances.",
      "Reuse greywater for plants.",
      "Mulch your garden to retain moisture.",
      "Educate others about water conservation."
    ],
    waste: [
      "Reduce single-use items.",
      "Recycle paper, plastic, and glass regularly.",
      "Compost food scraps and garden waste.",
      "Buy products with minimal packaging.",
      "Avoid disposable cutlery and plates.",
      "Donate or repurpose old items.",
      "Use cloth bags instead of plastic.",
      "Sort waste properly at home.",
      "Support zero-waste stores.",
      "Host a community clean-up."
    ],
    electricity: [
      "Switch to LED bulbs.",
      "Unplug devices when not in use.",
      "Use energy-efficient appliances.",
      "Install solar panels if possible.",
      "Set AC to optimal temperatures.",
      "Use natural light during the day.",
      "Turn off lights when leaving a room.",
      "Use smart power strips.",
      "Insulate your home properly.",
      "Monitor your energy usage monthly."
    ],
    plastic: [
      "Carry a reusable water bottle.",
      "Say no to plastic straws.",
      "Use cloth bags for shopping.",
      "Avoid products with excessive packaging.",
      "Buy in bulk to reduce waste.",
      "Choose glass or metal containers.",
      "Support plastic-free brands.",
      "Recycle plastic responsibly.",
      "Make DIY cleaning products.",
      "Educate others about plastic pollution."
    ],
    carbon: [
      "Carpool or use public transport.",
      "Walk or bike for short distances.",
      "Limit air travel when possible.",
      "Offset your carbon emissions.",
      "Switch to electric or hybrid vehicles.",
      "Eat more plant-based meals.",
      "Support local produce.",
      "Reduce meat consumption.",
      "Use energy-efficient heating/cooling.",
      "Advocate for climate policies."
    ]
  };

  const images = {
    water: "/images/water.jpg",
    waste: "/images/waste.jpg",
    electricity: "/images/electricity.jpg",
    plastic: "/images/plastic.jpg",
    carbon: "/images/carbon.jpg"
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-4">🌱 Your Eco Challenges</h2>
      <h3 className="text-xl text-center mb-4 capitalize text-gray-700">Focus Area: {mostUsed}</h3>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={images[mostUsed]}
          alt={`${mostUsed} illustration`}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
        />

        <div className="flex-1">
          <p className="text-gray-600 mb-4">
            Here are some actionable challenges you can take on to reduce your impact in <strong>{mostUsed}</strong>. Try completing at least 3 this week!
          </p>

          <ul className="space-y-3">
            {tips[mostUsed]?.map((tip, index) => (
              <li
                key={index}
                className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md shadow-sm flex justify-between items-center"
              >
                <span className="text-gray-800">{tip}</span>
                                <button
                  onClick={onAcceptChallenge}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
