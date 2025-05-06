import React from 'react';
import DailySkillTip from './DailySkillTip';
import SaveInterests from './SaveInterests';
import SkillSuggestions from './SkillSuggestions';

const SkillsMain = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Skill Suggestions
            <section className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-xl font-semibold mb-4">Skill Suggestions</h2>
                <SkillSuggestions />
            </section> */}

            {/* Save Interests */}
            <section className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-xl font-semibold mb-4">Your Interests</h2>
                <SaveInterests />
            </section>

            {/* Daily Tip */}
            <section className="bg-white rounded-2xl shadow p-5">
                <h2 className="text-xl font-semibold mb-4">Daily Skill Tip</h2>
                <DailySkillTip />
            </section>
        </div>
    );
};

export default SkillsMain;
