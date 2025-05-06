import React, { useEffect, useState } from "react";

// Single GymBro Card
const GymBroCard = ({ bro }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{bro.name || "Unnamed Bro"}</h2>
                <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {bro.email || "N/A"}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Gym:</strong> {bro.gymName || "N/A"}</p>
                <p className="text-sm text-gray-600"><strong>Joined:</strong> {new Date(bro.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-4">
                <button
                    onClick={() => window.location.href = `mailto:${bro.email}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md w-full transition duration-200"
                >
                    Contact
                </button>
            </div>
        </div>
    );
};

// GymBro List
const GymBroList = () => {
    const [gymBros, setGymBros] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/gym-bro/")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setGymBros(data);
                } else {
                    throw new Error("Unexpected response format");
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Gym Bros</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gymBros.map((bro) => (
                    <GymBroCard key={bro._id} bro={bro} />
                ))}
            </div>
        </div>
    );
};

export default GymBroList;