import React, { useState, useEffect } from 'react';

function UserExerciseplan({ userId }) {
  const [patientData, setPatientData] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [exercisePlan, setExercisePlan] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/patients/${userId}/`)
      .then(response => response.json())
      .then(data => {
        setPatientData(data);
        calculateBMI(data.weight, data.height);
      })
      .catch(error => console.error('Error fetching patient data:', error));
  }, [userId]);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    setBMI(bmi);

    let id = '';
    if (bmi < 18.5) {
      id = '1';
    } else if (bmi >= 18.5 && bmi < 25) {
      id = '2';
    } else if (bmi >= 25 && bmi < 30) {
      id = '3';
    } else {
      id = '4';
    }
    fetchExercisePlan(id);
  };

  const fetchExercisePlan = (id) => {
    fetch(`http://127.0.0.1:8000/exercise_plan/${id}/`)
      .then(response => response.json())
      .then(data => setExercisePlan(data))
      .catch(error => console.error('Error fetching exercise plan:', error));
  };

  if (!patientData) {
    return <div>no patient</div>;
  }

  return (
    <div className="exercise-plan">
      <h2>Exercise Plan</h2>
      {exercisePlan && (
        <div>
          <h3>Focus: {exercisePlan.exercise_plan.focus}</h3>
          <h4>Exercises:</h4>
          <ul className="list-group">
            {exercisePlan.exercise_plan.exercises.map((exercise, index) => (
              <li key={index} className="list-group-item">
                <strong>Type:</strong> {exercise.type}<br />
                <strong>Description:</strong> {exercise.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      {patientData.Diabetes_Mellitus || patientData.Hypertension || patientData.Chronic_Kidney_Disease || patientData.Heart_Diseased ? (
        <h3 className="text-danger">Warning: You should consult a doctor before exercising</h3>
      ) : null}
    </div>
  );
}

export default UserExerciseplan;
