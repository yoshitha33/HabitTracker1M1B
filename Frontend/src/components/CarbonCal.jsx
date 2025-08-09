// src/components/CarbonCal.jsx
import { useState } from "react";

function CarbonCal({ onComplete }) {
  const [form, setForm] = useState({
    animalFoodFreq: "occasionally",
    localFoodPercent: 50,
    housingType: "multi-store apartment",
    houseMaterial: "brick or concrete",
    householdSize: 4,
    hasElectricity: true,
    energyEfficiency: "average",
    renewablePercent: 30,
    trashComparison: "same",
    carKm: 50,
    motorcycleKm: 20,
    carFuelEconomy: 15,
    motorcycleFuelEconomy: 35,
    carpoolFreq: "occasionally",
    publicTransportKm: 10,
    flightHours: 5,
    plasticUsageKg: 2,
    carryHabits: "occasionally",
    waterUsage: "always"
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseline = {
      food: 10,
      housing: 15,
      electricity: 20,
      waste: 10,
      travel: 30,
      plastic: 5,
      water: 10
    };

    const scores = {
      food:
        (form.animalFoodFreq === "very often" ? 25 :
         form.animalFoodFreq === "often" ? 20 :
         form.animalFoodFreq === "occasionally" ? 15 :
         form.animalFoodFreq === "infrequently" ? 10 : 5)
        + (100 - form.localFoodPercent) * 0.1,

      housing:
        (form.housingType === "luxury condominium" ? 25 :
         form.housingType === "multi-store apartment" ? 20 :
         form.housingType === "free-standing" ? 18 :
         form.housingType === "duplex" ? 15 :
         form.housingType === "row house" ? 12 :
         form.housingType === "building with 2-4 housing units" ? 10 : 5)
        + (form.houseMaterial === "steel" ? 10 :
           form.houseMaterial === "brick or concrete" ? 8 :
           form.houseMaterial === "wood" ? 6 :
           form.houseMaterial === "bamboo" ? 4 :
           form.houseMaterial === "straw" ? 2 : 5),

      electricity:
        form.hasElectricity
          ? (form.energyEfficiency === "efficiency-centered design" ? 10 :
             form.energyEfficiency === "above average" ? 15 :
             form.energyEfficiency === "average" ? 20 : 25)
            * (1 - form.renewablePercent / 100)
          : 0,

      waste:
        (form.trashComparison === "much more" ? 20 :
         form.trashComparison === "more" ? 15 :
         form.trashComparison === "same" ? 10 :
         form.trashComparison === "less" ? 5 : 2),

      travel:
        (form.carKm / form.carFuelEconomy) * 2 +
        (form.motorcycleKm / form.motorcycleFuelEconomy) * 1.5 +
        form.flightHours * 10 +
        form.publicTransportKm * 0.1 -
        (form.carpoolFreq === "always" ? 10 :
         form.carpoolFreq === "occasionally" ? 5 :
         form.carpoolFreq === "infrequently" ? 2 : 0),

      plastic:
        form.plasticUsageKg * 5 -
        (form.carryHabits === "always" ? 5 :
         form.carryHabits === "often" ? 3 :
         form.carryHabits === "occasionally" ? 1 : 0),

      water:
        form.waterUsage === "always" ? 15 : 8
    };

    const excess = {};
    Object.keys(scores).forEach(key => {
      excess[key] = Math.max(0, scores[key] - baseline[key]);
    });

    const mostUsed = Object.entries(excess).sort((a, b) => b[1] - a[1])[0][0];

    onComplete({ scores, excess, mostUsed });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Carbon Footprint Survey</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Each input styled with Tailwind */}
        <div>
          <label className="block font-semibold mb-1">Animal-based food frequency:</label>
          <select className="w-full p-2 border rounded" value={form.animalFoodFreq} onChange={e => handleChange("animalFoodFreq", e.target.value)}>
            <option>never</option>
            <option>infrequently</option>
            <option>occasionally</option>
            <option>often</option>
            <option>very often</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Local/unprocessed food (%):</label>
          <input type="range" min="0" max="100" value={form.localFoodPercent} onChange={e => handleChange("localFoodPercent", parseInt(e.target.value))} />
          <span className="ml-2">{form.localFoodPercent}%</span>
        </div>

        <div>
          <label className="block font-semibold mb-1">Housing type:</label>
          <select className="w-full p-2 border rounded" value={form.housingType} onChange={e => handleChange("housingType", e.target.value)}>
            <option>free-standing</option>
            <option>no running water</option>
            <option>multi-store apartment</option>
            <option>duplex</option>
            <option>row house</option>
            <option>building with 2-4 housing units</option>
            <option>luxury condominium</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">House material:</label>
          <select className="w-full p-2 border rounded" value={form.houseMaterial} onChange={e => handleChange("houseMaterial", e.target.value)}>
            <option>straw</option>
            <option>bamboo</option>
            <option>wood</option>
            <option>brick or concrete</option>
            <option>adobe</option>
            <option>steel</option>
            <option>other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Household size:</label>
          <input type="number" className="w-full p-2 border rounded" value={form.householdSize} onChange={e => handleChange("householdSize", parseInt(e.target.value))} />
        </div>

        <div>
          <label className="block font-semibold mb-1">Electricity available:</label>
          <input type="checkbox" checked={form.hasElectricity} onChange={e => handleChange("hasElectricity", e.target.checked)} />
        </div>

        <div>
          <label className="block font-semibold mb-1">Energy efficiency:</label>
          <select className="w-full p-2 border rounded" value={form.energyEfficiency} onChange={e => handleChange("energyEfficiency", e.target.value)}>
            <option>below average</option>
            <option>average</option>
            <option>above average</option>
            <option>efficiency-centered design</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Renewable electricity (%):</label>
          <input type="range" min="0" max="100" value={form.renewablePercent} onChange={e => handleChange("renewablePercent", parseInt(e.target.value))} />
          <span className="ml-2">{form.renewablePercent}%</span>
        </div>

        <div>
          <label className="block font-semibold mb-1">Trash compared to neighbors:</label>
          <select className="w-full p-2 border rounded" value={form.trashComparison} onChange={e => handleChange("trashComparison", e.target.value)}>
            <option>much less</option>
            <option>less</option>
            <option>same</option>
            <option>more</option>
            <option>much more</option>
        </select>
      </div>

      {/* Travel Section */}
      <div>
        <label className="block font-semibold mb-1">Car travel per week (km):</label>
        <input type="number" className="w-full p-2 border rounded" value={form.carKm} onChange={e => handleChange("carKm", parseInt(e.target.value))} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Motorcycle travel per week (km):</label>
        <input type="number" className="w-full p-2 border rounded" value={form.motorcycleKm} onChange={e => handleChange("motorcycleKm", parseInt(e.target.value))} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Car fuel economy (km/l):</label>
        <input type="number" className="w-full p-2 border rounded" value={form.carFuelEconomy} onChange={e => handleChange("carFuelEconomy", parseFloat(e.target.value))} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Motorcycle fuel economy (km/l):</label>
        <input type="number" className="w-full p-2 border rounded" value={form.motorcycleFuelEconomy} onChange={e => handleChange("motorcycleFuelEconomy", parseFloat(e.target.value))} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Carpool frequency:</label>
        <select className="w-full p-2 border rounded" value={form.carpoolFreq} onChange={e => handleChange("carpoolFreq", e.target.value)}>
          <option>never</option>
          <option>infrequently</option>
          <option>occasionally</option>
          <option>always</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Public transport travel per week (km):</label>
        <input type="number" className="w-full p-2 border rounded" value={form.publicTransportKm} onChange={e => handleChange("publicTransportKm", parseInt(e.target.value))} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Flight hours per year:</label>
        <input type="number" className="w-full p-2 border rounded" value={form.flightHours} onChange={e => handleChange("flightHours", parseInt(e.target.value))} />
      </div>

      {/* Plastic & Water Section */}
      <div>
        <label className="block font-semibold mb-1">Plastic usage per week (kg):</label>
        <input type="number" className="w-full p-2 border rounded" value={form.plasticUsageKg} onChange={e => handleChange("plasticUsageKg", parseFloat(e.target.value))} />
      </div>

      <div>
        <label className="block font-semibold mb-1">Carry habits (bags/bottles):</label>
        <select className="w-full p-2 border rounded" value={form.carryHabits} onChange={e => handleChange("carryHabits", e.target.value)}>
          <option>rarely</option>
          <option>occasionally</option>
          <option>often</option>
          <option>always</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Water usage:</label>
        <select className="w-full p-2 border rounded" value={form.waterUsage} onChange={e => handleChange("waterUsage", e.target.value)}>
          <option>always</option>
          <option>occasionally</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded shadow-md transition duration-300"
        >
          Calculate Footprint
        </button>
      </div>
    </form>
  </div>
  );
}

export default CarbonCal;
