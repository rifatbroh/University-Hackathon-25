import React from 'react';
import GymList from './GymCard';
import GymBroList from './GymBroList';

const GymMain = () => {
    return (
        <div>
            <GymList/>
            <GymBroList/>
        </div>
    );
};

export default GymMain;