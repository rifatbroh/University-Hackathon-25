import React, { useEffect, useState } from "react";

// GymCard Component
const GymCard = ({ gym }) => {
    const handleAppointment = () => {
        alert(`Appointment requested for: ${gym.name}`);
        // You can navigate or open a modal here instead
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{gym.name}</h2>
                <p className="text-gray-600 mb-1">
                    <strong>Location:</strong> {gym.location}
                </p>
                <p className="text-gray-600 mb-3">
                    <strong>Address:</strong> {gym.address || "N/A"}
                </p>
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Facilities:</h3>
                    <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                        {gym.facilities.map((facility, index) => (
                            <li key={index}>{facility}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                onClick={handleAppointment}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm transition duration-200"
            >
                Take Appointment
            </button>
        </div>
    );
};

// GymList Component
const GymList = () => {
    const [gyms, setGyms] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/gym/get-gyms")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.gyms) {
                    setGyms(data.gyms);
                } else {
                    throw new Error("No gym data available");
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Gyms</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gyms.map((gym) => (
                    <GymCard key={gym._id} gym={gym} />
                ))}
            </div>
        </div>
    );
};

export default GymList;