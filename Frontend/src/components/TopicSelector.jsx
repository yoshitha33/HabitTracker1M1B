import React from 'react';

const topics = ['Electricity', 'Waste', 'Water', 'Plastic', 'CarbonEmission'];

const TopicSelector = ({ onSelect }) => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-bold mb-4">Choose a Topic</h2>
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {topics.map(topic => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow"
        >
          {topic}
        </button>
      ))}
    </div>
  </div>
);

export default TopicSelector;
