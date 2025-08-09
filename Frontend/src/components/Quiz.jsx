import React, { useState } from "react";
import { quizData } from "../data/quizData";

const Quiz = ({ topic, onFinish, onRetake, onBack }) => {
  const questions = quizData[topic] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === currentQuestion.answer;

    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.answer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      onFinish?.(score);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full">
        {!showResult ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <p className="mb-4">{currentQuestion.question}</p>
            <ul className="space-y-2 mb-4">
              {currentQuestion.options.map((option, idx) => (
                <li
                  key={idx}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedOption === option
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>

            {!showAnswer ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={handleSubmit}
                disabled={selectedOption === null}
              >
                Submit
              </button>
            ) : (
              <div>
                <p className="mb-4">
                  {selectedOption === currentQuestion.answer ? (
                    <span className="text-green-600">✔️ Correct!</span>
                  ) : (
                    <span className="text-red-600">
                      ❌ Incorrect. Correct Answer:{" "}
                      <strong>{currentQuestion.answer}</strong>
                    </span>
                  )}
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleNext}
                >
                  {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Quiz Completed ✅</h2>
            <p className="mb-4">
              Your Score: <strong>{score}</strong> / {questions.length}
            </p>
            <ul className="space-y-4 mb-6">
              {answers.map((ans, idx) => (
                <li key={idx} className="border p-3 rounded">
                  <strong>Q{idx + 1}:</strong> {ans.question}
                  <br />
                  <span
                    className={
                      ans.isCorrect ? "text-green-600" : "text-red-600"
                    }
                  >
                    Your Answer: {ans.selected} {ans.isCorrect ? "✔️" : "❌"}
                  </span>
                  {!ans.isCorrect && (
                    <div>
                      Correct Answer: <strong>{ans.correct}</strong>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={onRetake}
              >
                Retake Quiz
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={onBack}
              >
                Back to Topics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
