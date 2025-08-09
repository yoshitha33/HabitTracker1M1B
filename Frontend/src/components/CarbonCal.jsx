// src/components/CarbonCal.jsx
import { useState } from "react";

function CarbonCal({ onComplete }) {
  const [form, setForm] = useState({
    // Food
    meatDairyFreq: "occasionally",
    packagedFoodFreq: "often",
    localFoodPercent: 40,

    // Housing
    housingType: "apartment",
    energyEfficiency: "average",
    renewablePercent: 20,

    // Transportation
    carKm: 50,
    publicTransportFreq: "occasionally",
    flightHours: 10,

    // Waste
    trashComparison: "same",
    recycleFreq: "occasionally",
    singleUsePlasticFreq: "often",

    // Water & Habits
    dailyWaterLiters: 150,
    waterSavingAppliances: "some",
    carryHabits: "occasionally"
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const scores = {
      food:
        (form.meatDairyFreq === "very often" ? 25 :
         form.meatDairyFreq === "often" ? 20 :
         form.meatDairyFreq === "occasionally" ? 15 :
         form.meatDairyFreq === "rarely" ? 10 : 5)
        + (form.packagedFoodFreq === "very often" ? 20 :
           form.packagedFoodFreq === "often" ? 15 :
           form.packagedFoodFreq === "occasionally" ? 10 :
           form.packagedFoodFreq === "rarely" ? 5 : 2)
        + (100 - form.localFoodPercent) * 0.1,

      housing:
        (form.housingType === "luxury home" ? 25 :
         form.housingType === "detached house" ? 20 :
         form.housingType === "apartment" ? 15 :
         form.housingType === "shared housing" ? 10 : 5)
        + (form.energyEfficiency === "poor" ? 20 :
           form.energyEfficiency === "average" ? 15 :
           form.energyEfficiency === "good" ? 10 :
           form.energyEfficiency === "excellent" ? 5 : 0)
        + (100 - form.renewablePercent) * 0.2,

      transportation:
        form.carKm * 0.2 +
        (form.publicTransportFreq === "never" ? 10 :
         form.publicTransportFreq === "rarely" ? 7 :
         form.publicTransportFreq === "occasionally" ? 4 :
         form.publicTransportFreq === "frequently" ? 2 : 0)
        + form.flightHours * 8,

      waste:
        (form.trashComparison === "much more" ? 20 :
         form.trashComparison === "more" ? 15 :
         form.trashComparison === "same" ? 10 :
         form.trashComparison === "less" ? 5 : 2)
        + (form.recycleFreq === "never" ? 15 :
           form.recycleFreq === "rarely" ? 10 :
           form.recycleFreq === "occasionally" ? 5 :
           form.recycleFreq === "frequently" ? 2 : 0)
        + (form.singleUsePlasticFreq === "very often" ? 15 :
           form.singleUsePlasticFreq === "often" ? 10 :
           form.singleUsePlasticFreq === "occasionally" ? 5 :
           form.singleUsePlasticFreq === "rarely" ? 2 : 0),

      water:
        form.dailyWaterLiters * 0.05 +
        (form.waterSavingAppliances === "none" ? 10 :
         form.waterSavingAppliances === "some" ? 5 :
         form.waterSavingAppliances === "all" ? 2 : 0)
        + (form.carryHabits === "never" ? 10 :
           form.carryHabits === "rarely" ? 7 :
           form.carryHabits === "occasionally" ? 4 :
           form.carryHabits === "often" ? 2 :
           form.carryHabits === "always" ? 1 : 0)
    };

    const totalFootprint = Object.values(scores).reduce((a, b) => a + b, 0);

    onComplete({ scores, totalFootprint });
  };

  return (
     <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/resources-bg.jpg')" }}
    >
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">EcoTrack</h1>
      </nav>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Carbon Footprint Survey</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FOOD */}
          <div>
            <label className="block font-semibold mb-1">Meat/Dairy consumption:</label>
            <select className="w-full p-2 border rounded" value={form.meatDairyFreq} onChange={e => handleChange("meatDairyFreq", e.target.value)}>
              <option>never</option>
              <option>rarely</option>
              <option>occasionally</option>
              <option>often</option>
              <option>very often</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Packaged food frequency:</label>
            <select className="w-full p-2 border rounded" value={form.packagedFoodFreq} onChange={e => handleChange("packagedFoodFreq", e.target.value)}>
              <option>never</option>
              <option>rarely</option>
              <option>occasionally</option>
              <option>often</option>
              <option>very often</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Local/organic food (%):</label>
            <input type="range" min="0" max="100" value={form.localFoodPercent} onChange={e => handleChange("localFoodPercent", parseInt(e.target.value))} />
            <span className="ml-2">{form.localFoodPercent}%</span>
          </div>

          {/* HOUSING */}
          <div>
            <label className="block font-semibold mb-1">Housing type:</label>
            <select className="w-full p-2 border rounded" value={form.housingType} onChange={e => handleChange("housingType", e.target.value)}>
              <option>luxury home</option>
              <option>detached house</option>
              <option>apartment</option>
              <option>shared housing</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Energy efficiency:</label>
            <select className="w-full p-2 border rounded" value={form.energyEfficiency} onChange={e => handleChange("energyEfficiency", e.target.value)}>
              <option>poor</option>
              <option>average</option>
              <option>good</option>
              <option>excellent</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Renewable electricity (%):</label>
            <input type="range" min="0" max="100" value={form.renewablePercent} onChange={e => handleChange("renewablePercent", parseInt(e.target.value))} />
            <span className="ml-2">{form.renewablePercent}%</span>
          </div>

          {/* TRANSPORTATION */}
          <div>
            <label className="block font-semibold mb-1">Car travel per week (km):</label>
            <input type="number" className="w-full p-2 border rounded" value={form.carKm} onChange={e => handleChange("carKm", parseInt(e.target.value))} />
          </div>

          <div>
            <label className="block font-semibold mb-1">Public transport usage:</label>
            <select className="w-full p-2 border rounded" value={form.publicTransportFreq} onChange={e => handleChange("publicTransportFreq", e.target.value)}>
              <option>never</option>
              <option>rarely</option>
              <option>occasionally</option>
              <option>frequently</option>
              <option>always</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Flight hours per year:</label>
            <input type="number" className="w-full p-2 border rounded" value={form.flightHours} onChange={e =>              handleChange("flightHours", parseInt(e.target.value))}
            />
          </div>

          {/* WASTE */}
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

          <div>
            <label className="block font-semibold mb-1">Recycling/composting frequency:</label>
            <select className="w-full p-2 border rounded" value={form.recycleFreq} onChange={e => handleChange("recycleFreq", e.target.value)}>
              <option>never</option>
              <option>rarely</option>
              <option>occasionally</option>
              <option>frequently</option>
              <option>always</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Single-use plastic usage:</label>
            <select className="w-full p-2 border rounded" value={form.singleUsePlasticFreq} onChange={e => handleChange("singleUsePlasticFreq", e.target.value)}>
              <option>never</option>
              <option>rarely</option>
              <option>occasionally</option>
              <option>often</option>
              <option>very often</option>
            </select>
          </div>

          {/* WATER & HABITS */}
          <div>
            <label className="block font-semibold mb-1">Daily water consumption (liters):</label>
            <input type="number" className="w-full p-2 border rounded" value={form.dailyWaterLiters} onChange={e => handleChange("dailyWaterLiters", parseInt(e.target.value))} />
          </div>

          <div>
            <label className="block font-semibold mb-1">Water-saving appliances:</label>
            <select className="w-full p-2 border rounded" value={form.waterSavingAppliances} onChange={e => handleChange("waterSavingAppliances", e.target.value)}>
              <option>none</option>
              <option>some</option>
              <option>all</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Reusable bags/bottles habits:</label>
            <select className="w-full p-2 border rounded" value={form.carryHabits} onChange={e => handleChange("carryHabits", e.target.value)}>
              <option>never</option>
              <option>rarely</option>
              <option>occasionally</option>
              <option>often</option>
              <option>always</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded shadow-md transition duration-300"
            >
              Calculate Footprint
            </button>
          </div>
        </form>
      </div>
    </div>
     </div>
  );
}

export default CarbonCal;
