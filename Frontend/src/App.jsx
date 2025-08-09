// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CarbonCal from "./components/CarbonCal";
import Results from "./components/Results";
import Suggestions from "./components/Suggestions";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CarbonCal />} />
            <Route path="/results" element={<Results />} />
            <Route path="/suggestions" element={<Suggestions />} />
          </Routes>
        </main>
        <footer className="bg-green-100 text-center p-4 text-sm text-green-700">
          Made with 💚 for a sustainable future
        </footer>
      </div>
    </Router>
  );
}

export default App;
