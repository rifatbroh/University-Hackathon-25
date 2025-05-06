import React, { useEffect, useState } from "react";

const MoodHistory = () => {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/mood/history")
            .then((res) => res.json())
            .then((data) => setHistory(data))
            .catch((err) => setError("Failed to fetch mood history"));
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white border border-gray-200 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mood History</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {history.length === 0 ? (
                <p className="text-gray-600 text-center">No mood entries found.</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((entry) => (
                        <li
                            key={entry._id}
                            className="bg-gray-50 border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-lg font-semibold capitalize text-blue-600">{entry.mood}</span>
                                <span className="text-sm text-gray-500">
                                    {new Date(entry.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-gray-700 text-sm italic">"{entry.notes}"</p>
                            <p className="text-xs text-gray-500 mt-1">— {entry.user}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MoodHistory;
