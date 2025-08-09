import React, { useState } from 'react';

const IdeaForm = ({ topic, onBack }) => {
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (idea.trim()) {
      alert("Thanks for sharing your idea!");
      setSubmitted(true);
      setIdea('');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Share Your Idea for {topic}</h2>

      {!submitted ? (
        <>
          <textarea
            value={idea}
            onChange={e => setIdea(e.target.value)}
            placeholder="Suggest a new technology, habit, or solution..."
            className="w-full h-32 p-3 border rounded mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Submit Idea
          </button>
        </>
      ) : (
        <p className="text-green-700 font-medium mb-4">
          ✅ Your idea has been submitted!
        </p>
      )}

      <button
        onClick={onBack}
        className="mt-6 bg-gray-500 text-white py-2 px-4 rounded"
      >
        ⬅️ Back to Topic Selection
      </button>
    </div>
  );
};

export default IdeaForm;
