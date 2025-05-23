import React, { useState } from 'react';
import { supabase } from '../client/supabaseClient';
import { useNavigate } from 'react-router-dom';

const SetupComponent = ({ userData, setUserData }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const finishSetup = async () => {
    const { data, error } = await supabase
      .from('profiles') // Replace with your actual table name
      .update({ answered_questions: true })
      .eq('user_id', userData.id); // or use userData.email if that's your key

    if (error) {
      console.error('Error updating hasAnswered:', error);
      return;
    }
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Setup</h2>

      {step === 1 && (
        <div>
          <p>🎯 What is your primary goal?</p>
          <ul className="list-disc pl-6">
            <li>Lose weight</li>
            <li>Gain muscle</li>
            <li>Maintain weight</li>
            <li>Improve general health</li>
            <li>Follow a medical diet</li>
          </ul>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>🥦 Do you follow a specific diet?</p>
          <ul className="list-disc pl-6">
            <li>Vegetarian</li>
            <li>Vegan</li>
            <li>Keto</li>
            <li>Low-carb</li>
            <li>None</li>
          </ul>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>⚖️ Height and weight (optional)</p>
          <input className="border p-2 w-full mb-4" placeholder="e.g. 5'9, 160 lbs" />
          <p>👣 Activity level</p>
          <ul className="list-disc pl-6">
            <li>Sedentary</li>
            <li>Lightly active</li>
            <li>Moderately active</li>
            <li>Very active</li>
          </ul>
        </div>
      )}

      {step === 4 && (
        <div>
          <p>📊 Do you want to track macros?</p>
          <p>Yes / No</p>
        </div>
      )}

      {step === 5 && (
        <div>
          <p>🍽️ How many meals per day?</p>
          <input className="border p-2 w-full mb-4" placeholder="e.g. 3" />
          <p>👨‍🍳 Cooking skill level?</p>
          <p>Beginner / Intermediate / Advanced</p>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        {step < 5 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        ) : (
          <button onClick={finishSetup} className="px-4 py-2 bg-green-600 text-white rounded">
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default SetupComponent;
