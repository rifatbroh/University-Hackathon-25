import { useState } from 'react';
import SemesterPlanner from './SemesterPlanner';
import SemisterUpdater from './SemisterUpdeter';
import MarathonCard from './MarathonCard'
import FocusMain from './Focus/FocusMain';
import CgpaMain from './Cgpa/CgpaMain';
import JobMain from './JobPart/JobMain';
import Scheculing from './Sheduling/Scheculing';
import SkillsMain from './skills/SkillsMain';
import HeroDashboard from './HeroDashboard/HeroDashboard';
import MovieSuggestion from './MovieSuggestion';
import MainGoal from './Goal/MainGoal';
import MoodMain from './chatbot/MoodMain';
import GymMain from './Healthy/GymMain';

const Dash = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
              onClick={() => setActiveTab('focus')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'focus'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Focus
            </button>
            <button
              onClick={() => setActiveTab('job')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'job'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Job
            </button>

            <button
              onClick={() => setActiveTab('shedule')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'shedule'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Shedule
            </button>

            <button
              onClick={() => setActiveTab('skill')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'skill'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('goal')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'goal'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Goals
            </button>
            <button
              onClick={() => setActiveTab('movie')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'movie'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Movies
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'ai'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Refresh Your MODE
            </button>

            

            <button
              onClick={() => setActiveTab('health')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                activeTab === 'health'
                  ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Healthy
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
              <h2 className="text-3xl font-bold text-green-400 mb-4">
                Welcome to hublu Progress Tracker 🎯
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Navigate through the sidebar to start tracking your CGPA and plan your semesters.
              </p>
            </div>
          )}

          {activeTab === 'dashboard' && <HeroDashboard />}
          {activeTab === 'cgpa' && <CgpaMain />}
          <div className="space-y-5">
          {activeTab === 'planner' && <SemesterPlanner />}
          {activeTab === 'planner' && <SemisterUpdater />}
          </div>
          {activeTab === 'marathon' && <MarathonCard />}
          {activeTab === 'focus' && <FocusMain />}
          {activeTab === 'job' && <JobMain />}
          {activeTab === 'shedule' && <Scheculing />}
          {activeTab === 'skill' && <SkillsMain />}
          {activeTab === 'movie' && <MovieSuggestion />}
          {activeTab === 'goal' && <MainGoal />}
          {activeTab === 'health' && <GymMain />}
          

        
          {activeTab === 'ai' && <MoodMain />}


        </div>
      </main>
    </div>
  );
};

export default Dash;
