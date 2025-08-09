// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CarbonCal from "./components/CarbonCal";
import Results from "./components/Results";
import Suggestions from "./components/Suggestions";

// ✅ Quiz-related components
import TopicSelector from "./components/TopicSelector";
import Quiz from "./components/Quiz";
import IdeaForm from "./components/IdeaForm";

function App() {
  // ✅ Quiz state
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* ✅ Existing routes */}
            <Route path="/" element={<CarbonCal />} />
            <Route path="/results" element={<Results />} />
            <Route path="/suggestions" element={<Suggestions />} />

            {/* ✅ Quiz route */}
            <Route
              path="/quizzes"
              element={
                !selectedTopic ? (
                  <TopicSelector onSelect={setSelectedTopic} />
                ) : !quizFinished ? (
                  <Quiz
                    topic={selectedTopic}
                    onFinish={(finalScore) => {
                      setScore(finalScore);
                      setQuizFinished(true);
                    }}
                    onRetake={() => {
                      setQuizFinished(false);
                      setScore(null);
                    }}
                    onBack={() => {
                      setSelectedTopic(null);
                      setQuizFinished(false);
                      setScore(null);
                    }}
                  />
                ) : (
                  <IdeaForm
                    topic={selectedTopic}
                    onBack={() => {
                      setSelectedTopic(null);
                      setQuizFinished(false);
                      setScore(null);
                    }}
                  />
                )
              }
            />

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
