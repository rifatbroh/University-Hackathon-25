import { useState } from 'react';
import SemesterPlanner from './SemesterPlanner';
import MarathonCard from './MarathonCard'
import CgpaCard from './Cgpa/CgpaCard';

const Dash = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 fixed top-0 left-0 h-full z-40 pt-16">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            hublu.
          </h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('cgpa')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'cgpa'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              CGPA Tracker
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'planner'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Semester Planner
            </button>
            <button
              onClick={() => setActiveTab('marathon')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'marathon'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Marathon
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Navbar */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex items-center px-6 z-30">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </header>

        {/* Page Content */}
        <div className="mt-20 px-6 py-4">
          {activeTab === 'dashboard' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to hublu Progress Tracker 🎯
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Navigate through the sidebar to start tracking your CGPA and plan your semesters.
              </p>
            </div>
          )}

          {activeTab === 'cgpa' && <CgpaCard />}

          {activeTab === 'planner' && <SemesterPlanner />}
          {activeTab === 'marathon' && <MarathonCard />}
        </div>
      </main>
    </div>
  );
};

export default Dash;
