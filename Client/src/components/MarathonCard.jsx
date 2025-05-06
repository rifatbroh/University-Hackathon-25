import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // for custom marker icons
import 'leaflet/dist/leaflet.css';

// MarathonCard Component
const MarathonCard = ({ marathon }) => {
  const [showParticipants, setShowParticipants] = useState(false);

  const toggleParticipants = () => {
    setShowParticipants(!showParticipants);
  };

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out w-full max-w-xs mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">{marathon.name}</h2>
      <p className="text-gray-600 mb-2"><strong>Date:</strong> {marathon.date}</p>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {marathon.location}</p>
      <p className="text-gray-600 mb-2"><strong>Distance:</strong> {marathon.distance}</p>
      <p className="text-gray-600 mb-2"><strong>Registration Fee:</strong> {marathon.registrationFee} BDT</p>
      <p className="text-gray-600 mb-4"><strong>Prize Money:</strong> {marathon.prizeMoney} BDT</p>

      <div className="flex justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-700">Categories:</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {marathon.categories.map((category, index) => (
              <li key={index} className="text-sm">{category}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-700">Facilities:</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {marathon.facilities.map((facility, index) => (
              <li key={index} className="text-sm">{facility}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-700">Route Details:</h3>
        <p className="text-gray-600"><strong>Start Point:</strong> {marathon.route.startPoint}</p>
        <p className="text-gray-600"><strong>End Point:</strong> {marathon.route.endPoint}</p>
        <h4 className="mt-2 font-semibold text-gray-700">Checkpoints:</h4>
        <ul className="list-disc pl-6 text-gray-600">
          {marathon.route.checkpoints.map((checkpoint, index) => (
            <li key={index}>{checkpoint}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-200"
          onClick={toggleParticipants}
        >
          View Participants
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition duration-200">
          Participate Now
        </button>
      </div>

      {showParticipants && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg text-gray-700">Participants List:</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {marathon.participants.map((participant, index) => (
              <li key={index} className="text-sm">
                {participant.rank}. {participant.name} - {participant.time} - {participant.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Map Component to Show Marathon Locations
const MarathonMap = ({ marathons }) => {
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const defaultPosition = [23.8103, 90.4125]; // Default map center (Bangladesh)

  // Custom SVG Icon for the Marker (Red and Transparent)
  const locationIconSvg = "<img src='/icon/icon_svg.gif' alt='' />";

  // Custom SVG Icon Function
  const svgIcon = (svg) => {
    return new L.divIcon({
      html: svg,
      iconSize: [0, 0],
      iconAnchor: [10, 20], // To make sure the icon is anchored correctly
    });
  };

  // If marathons data is empty or invalid, display a message.
  if (!marathons || marathons.length === 0) {
    return <div className="text-center mt-4">No Marathon Data Available</div>;
  }

  return (
    <MapContainer center={defaultPosition} zoom={12} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {marathons.map((marathon) => {
        const { lat, lon } = marathon.coordinates;
        return lat && lon ? (
          <Marker
            key={marathon.id}
            position={[lat, lon]} // Marathon latitude and longitude
            icon={svgIcon(locationIconSvg)} // Set custom SVG icon
            eventHandlers={{
              click: () => setSelectedMarathon(marathon),
            }}
          >
            <Popup>
              <h3>{marathon.name}</h3>
              <p>{marathon.location}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Participants List</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">Participate Now</button>
            </Popup>
          </Marker>
        ) : null;
      })}

      {selectedMarathon && (
        <div className="absolute top-0 left-0 w-full p-6 bg-white z-50 shadow-lg mt-16">
          <MarathonCard marathon={selectedMarathon} />
        </div>
      )}
    </MapContainer>
  );
};

// App Component
const App = () => {
  const [marathons, setMarathons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://csefest.srejon.com/api/v1/marathon?lat=23.8103&lon=90.4125')
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setMarathons(data.data);
        } else {
          throw new Error('No marathon data available');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message); // Set the error message to display
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Marathon Events</h1>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Render the Map */}
      <MarathonMap marathons={marathons} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {marathons.map((marathon) => (
          <MarathonCard key={marathon.id} marathon={marathon} />
        ))}
      </div>
    </div>
  );
};

export default App;
