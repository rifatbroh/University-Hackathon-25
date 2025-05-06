import React, { useEffect, useState } from "react";

const DailySkillTip = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/skills/daily-tip")
      .then((res) => res.json())
      .then((data) => setTip(data.tip || ""))
      .catch((err) => console.error("Error fetching daily tip:", err));
  }, []);

  return (
    <div className="bg-yellow-50 border border-yellow-300 text-yellow-900 p-5 rounded-2xl max-w-xl mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-2">💡 Daily Skill Tip</h2>
      <p className="text-sm">{tip}</p>
    </div>
  );
};

export default DailySkillTip;
