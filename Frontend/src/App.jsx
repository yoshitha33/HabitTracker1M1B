// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CarbonCal from "./components/CarbonCal";
import Results from "./components/Results";
import Suggestions from "./components/Suggestions";

function Dashboard() {
  return <div className="p-6 text-xl">Welcome to GreenMantra Dashboard 🌱</div>;
}
function Challenges() {
  return <div className="p-6 text-xl">Your Challenges will appear here 💪</div>;
}
function Quizzes() {
  return <div className="p-6 text-xl">Take a quiz to test your eco-knowledge 🧠</div>;
}

function MainApp() {
  const [resultData, setResultData] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleComplete = (data) => {
    setResultData(data);
    setShowSuggestions(false);
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-green-50 text-green-900 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<CarbonCal onComplete={handleComplete} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route
          path="/results"
          element={
            resultData && !showSuggestions ? (
              <Results
                excess={resultData.excess}
                mostUsed={resultData.mostUsed}
                onViewSuggestions={() => setShowSuggestions(true)}
              />
            ) : (
              <Suggestions
                mostUsed={resultData?.mostUsed}
                onAcceptChallenge={() => alert("Challenge Accepted! 🌍")}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
