import React, { useEffect, useState } from "react";

const SkillSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/skills/suggestions")
      .then((res) => res.json())
      .then((data) => setSuggestions(data.suggestions || []))
      .catch((err) => console.error("Error fetching suggestions:", err));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Skill Suggestions</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {suggestions.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillSuggestions;
