import React from 'react';
import Login from './Login';

const Hero = () => {
  return (
    <div className="hero-section w-full h-[725px] bg-[#111827] flex">
      <div className="hero-left w-[70%] flex flex-col justify-center px-30">
        <p className="text-7xl font-bold text-white mb-6">
          Discover new products and best possibilities
        </p>
        <p className="text-2xl text-white mb-8">
          Here at Flowbite we focus on markets where technology, innovation, and capital
          can unlock long-term value and drive economic growth.
        </p>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="hero-right w-1/2 flex justify-center items-center ">
        <Login />
      </div>
    </div>
  );
};

export default Hero;
