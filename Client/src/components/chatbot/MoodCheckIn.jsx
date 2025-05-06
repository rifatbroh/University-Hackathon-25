import React, { useState } from "react";

const MoodCheckIn = () => {
    const [mood, setMood] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/mood/check-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mood, notes }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Mood check-in failed");
            }

            setMessage("Mood checked in successfully!");
            setMood("");
            setNotes("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mood Check-In</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Mood
                    <input
                        type="text"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        placeholder="e.g. Happy, Anxious"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </label>

                <label className="block mb-4 text-sm font-medium text-gray-700">
                    Notes (optional)
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any thoughts or reasons..."
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={4}
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>

                {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
                {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
};

export default MoodCheckIn;
