import React from 'react';
import MoodChatBot from './MoodChatBot';
import MoodCheckIn from './MoodCheckIn';
import MoodHistory from './MoodHistory';

const MoodMain = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Mood Tracker</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Check In + History */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <MoodCheckIn />
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <MoodHistory />
          </div>
        </div>

        {/* Right Column: ChatBot */}
        <div className="bg-white p-4 rounded-2xl shadow-md h-full">
          <MoodChatBot />
        </div>
      </div>
    </div>
  );
};

export default MoodMain;
