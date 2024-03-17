import React, { useState } from 'react';
// import './BMICalculator.css'; // Importing CSS file for styling

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [calories, setCalories] = useState(null);
  const [mealPlan, setMealPlan] = useState([]);
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [hasHighBloodPressure, setHasHighBloodPressure] = useState(false);
  const [hasHeartDisease, setHasHeartDisease] = useState(false);
  const [hasKidneyDisease, setHasKidneyDisease] = useState(false);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(2));

      const baseCalories = 10 * weight + 6.25 * height - 5 * 30 + 5;
      setCalories(baseCalories);

      generateMealPlan(baseCalories);
    } else {
      setBMI(null);
      setCalories(null);
      setMealPlan([]);
    }
  };

  const generateMealPlan = (calories) => {
    const days = ['Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const meals = {
      breakfast: ['Oatmeal', 'Eggs', 'Smoothie', 'Yogurt', 'Cereal', 'Toast'],
      lunch: ['Salad', 'Grilled Chicken', 'Sandwich', 'Soup', 'Pasta Salad', 'Quinoa Bowl'],
      dinner: ['Fish', 'Pasta', 'Steak', 'Veggie Stir-Fry', 'Chicken Curry', 'Burrito Bowl']
    };

    const fullMealPlan = days.map((day, index) => ({
      day,
      breakfast: getRandomMeals(meals.breakfast, 2), 
      lunch: getRandomMeals(meals.lunch, 2), 
      dinner: getRandomMeals(meals.dinner, 2) 
    }));

    setMealPlan(fullMealPlan);
  };

  const getRandomMeals = (mealOptions, count) => {
    const shuffledOptions = mealOptions.sort(() => 0.5 - Math.random());
    return shuffledOptions.slice(0, count);
  };

  const handleCheckboxChange = (condition, value) => {
    switch (condition) {
      case 'diabetes':
        setHasDiabetes(value);
        break;
      case 'highBloodPressure':
        setHasHighBloodPressure(value);
        break;
      case 'heartDisease':
        setHasHeartDisease(value);
        break;
      case 'kidneyDisease':
        setHasKidneyDisease(value);
        break;
      default:
        break;
    }
  };

  let instructions = '';

  if (hasDiabetes || hasHighBloodPressure || hasHeartDisease || hasKidneyDisease) {
    instructions = 'Instructions for users with medical conditions...';
  } else {
    instructions = 'General instructions for users without medical conditions...';
  }


  return (
    <div className="container border p-4">
    <h2>BMI Calculator</h2>
    <div className="row mb-3">
      <div className="col">
        <label htmlFor="weight" className="form-label">
          Weight (kg):
        </label>
        <input
          type="number"
          className="form-control"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="col">
        <label htmlFor="height" className="form-label">
          Height (cm):
        </label>
        <input
          type="number"
          className="form-control"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
    </div>
    <button className="btn btn-success" onClick={calculateBMI}>
      Calculate BMI
    </button>
    {bmi !== null && (
      <div>
        <h3>Your BMI is: {bmi}</h3>
        {calories !== null && (
          <div>
            <p>Estimated daily calorie needs: {calories.toFixed(0)} calories</p>
            <h3>Meal Plan for the Week</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                </tr>
              </thead>
              <tbody>
                {mealPlan.map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.breakfast.join(", ")}</td>
                    <td>{item.lunch.join(", ")}</td>
                    <td>{item.dinner.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )}
  </div>
  );
};

export default BMICalculator;
