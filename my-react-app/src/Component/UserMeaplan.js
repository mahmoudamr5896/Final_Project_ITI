import React, { useState, useEffect } from 'react';

function UserMealplan({ userId }) {
  const [patientData, setPatientData] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [weightStatus, setWeightStatus] = useState(null);
  const [mealPlan, setMealPlan] = useState({});
  const [nutritionInstructions, setNutritionInstructions] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/patients/${userId}/`)
      .then(response => response.json())
      .then(data => {
        setPatientData(data);
        calculateBMI(data.weight, data.height);
        fetchNutritionInstructions(data);
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
    setWeightStatus(id);

    fetch(`http://127.0.0.1:8000/meal-plan/${id}/`)
      .then(response => response.json())
      .then(data => setMealPlan(data))
      .catch(error => console.error('Error fetching meal plan:', error));
  };

  const fetchNutritionInstructions = (patientData) => {
    const diseaseStatusIds = [
      patientData.Diabetes_Mellitus && 1,
      patientData.Hypertension && 2,
      patientData.Chronic_Kidney_Disease && 3,
      patientData.Heart_Disease && 4
    ].filter(Boolean);

    Promise.all(
      diseaseStatusIds.map(id =>
        fetch(`http://127.0.0.1:8000/nutrition_instructions/${id}/`)
          .then(response => response.json())
      )
    )
    .then(data => {
      setNutritionInstructions(data);
    })
    .catch(error => console.error('Error fetching nutrition instructions:', error));
  };

  if (!patientData) {
    return <div>no patient</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{patientData.name}'s Meal Plan</h1>
      <div className="row">
        <div className="col-md-12">
          <h3>Patient Information</h3>
          <p><strong>Weight:</strong> {patientData.weight} kg</p>
          <p><strong>Height:</strong> {patientData.height} cm</p>
          <p><strong>BMI:</strong> {bmi}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {mealPlan && Object.keys(mealPlan).length > 0 && (
            <div>
              <h3>7 Days Meal Plan</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Snack 1</th>
                    <th>Lunch</th>
                    <th>Snack 2</th>
                    <th>Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(mealPlan).map(day => (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>{mealPlan[day].breakfast}</td>
                      <td>{mealPlan[day].snack1}</td>
                      <td>{mealPlan[day].lunch}</td>
                      <td>{mealPlan[day].snack2}</td>
                      <td>{mealPlan[day].dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {nutritionInstructions.map((instruction, index) => (
        <div key={index} className="mt-4">
          <h3>{instruction.name} Nutrition Instructions</h3>
          <table className="table">
            <tbody>
              {instruction.instructions.map((item, i) => (
                <tr key={i}>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default UserMealplan;
