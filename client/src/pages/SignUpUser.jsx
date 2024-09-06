import React, { useState } from 'react';
import MedicalHistoryForm from '../components/MedicalHistoryForm';
import { useNavigate } from 'react-router-dom';

export default function SignUpUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    medicalHistory: {
      bloodGroup: '',
      height: '',
      weight: '',
      pastConditions: [],
      allergies: [],
      chronicConditions: [],
      socialHistory: {
        smoking: '',
        alcohol: '',
        drugs: '',
      },
      vaccinations: [],
      currentMedications: [],
      others: [],
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicalHistoryChange = (newMedicalHistory) => {
    setFormData({
      ...formData,
      medicalHistory: newMedicalHistory,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/sign-up/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(res.ok){
      navigate('/sign-in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Patient Sign Up</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <h3>Medical History</h3>
        <MedicalHistoryForm
          medicalHistory={formData.medicalHistory}
          setMedicalHistory={handleMedicalHistoryChange}
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};
