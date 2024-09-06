// import React from "react";

// export default function MedicalHistoryForm({
//   medicalHistory,
//   setMedicalHistory,
// }) {
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMedicalHistory({
//       ...medicalHistory,
//       [name]: value,
//     });
//   };

//   const handleSocialHistoryChange = (index, value) => {
//     const updatedArray = [...medicalHistory.socialHistory];
//     updatedArray[index] = { ...updatedArray[index], status: value };

//     setMedicalHistory({
//       ...medicalHistory,
//       socialHistory: updatedArray,
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, value, checked } = e.target;
//     const updatedList = checked
//       ? [...medicalHistory[name], value]
//       : medicalHistory[name].filter((item) => item !== value);

//     setMedicalHistory({
//       ...medicalHistory,
//       [name]: updatedList,
//     });
//   };

//   return (
//     <div>
//       <div>
//         <label>Blood Group:</label>
//         <select
//           name="bloodGroup"
//           onChange={handleInputChange}
//         >
//           <option value="">Select</option>
//           <option value="A+">A+</option>
//           <option value="A-">A-</option>
//           <option value="B+">B+</option>
//           <option value="B-">B-</option>
//           <option value="AB+">AB+</option>
//           <option value="AB-">AB-</option>
//           <option value="O+">O+</option>
//           <option value="O-">O-</option>
//         </select>
//       </div>

//       <div>
//         <label>Height (cm):</label>
//         <input
//           type="number"
//           name="height"
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label>Weight (kg):</label>
//         <input
//           type="number"
//           name="weight"
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label>Past Conditions:</label>
//         <input
//           type="text"
//           name="pastConditions"
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label>Allergies:</label>
//         <input
//           type="text"
//           name="allergies"
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label>Chronic Conditions:</label>
//         <input
//           type="text"
//           name="chronicConditions"
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label>Social History:</label>
//         {medicalHistory.socialHistory.map((item, index) => (
//           <div key={index}>
//             <label>{item.type}:</label>
//             <select
//               onChange={(e) => handleSocialHistoryChange(index, e.target.value)}
//             >
//               <option value="">Select Status</option>
//               <option value="Never">Never</option>
//               <option value="Occasionally">Occasionally</option>
//               <option value="Daily">Daily</option>
//             </select>
//           </div>
//         ))}
//       </div>

//       <div>
//         <label>Vaccinations:</label>
//         <div>
//           <input
//             type="checkbox"
//             name="vaccinations"
//             value="COVID-19"
//             checked={medicalHistory.vaccinations.includes("COVID-19")}
//             onChange={handleCheckboxChange}
//           />
//           <label>COVID-19</label>
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             name="vaccinations"
//             value="Flu"
//             checked={medicalHistory.vaccinations.includes("Flu")}
//             onChange={handleCheckboxChange}
//           />
//           <label>Flu</label>
//         </div>
//         <div>
//           <input
//             type="checkbox"
//             name="vaccinations"
//             value="Hepatitis B"
//             checked={medicalHistory.vaccinations.includes("Hepatitis B")}
//             onChange={handleCheckboxChange}
//           />
//           <label>Hepatitis B</label>
//         </div>
//         {/* Add more vaccination options as needed */}
//       </div>

//       <div>
//         <label>Current Medications:</label>
//         <input
//           type="text"
//           name="currentMedications"
//           onChange={handleInputChange}
//         />
//       </div>

//       <div>
//         <label>Any Other Information:</label>
//         <textarea
//           name="otherInfo"
//           onChange={handleInputChange}
//           placeholder="Any additional medical history or comments"
//         />
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function MedicalHistoryForm({
  medicalHistory,
  setMedicalHistory,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory({
      ...medicalHistory,
      [name]: value,
    });
  };

  const handleSocialHistoryChange = (type, value) => {
    setMedicalHistory({
      ...medicalHistory,
      socialHistory: {
        ...medicalHistory.socialHistory,
        [type]: value,
      },
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    const updatedList = checked
      ? [...medicalHistory[name], value]
      : medicalHistory[name].filter((item) => item !== value);

    setMedicalHistory({
      ...medicalHistory,
      [name]: updatedList,
    });
  };

  return (
    <div>
      <div>
        <label>Blood Group:</label>
        <select
          name="bloodGroup"
          value={medicalHistory.bloodGroup}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <div>
        <label>Height (cm):</label>
        <input
          type="number"
          name="height"
          value={medicalHistory.height}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          name="weight"
          value={medicalHistory.weight}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Past Conditions:</label>
        <input
          type="text"
          name="pastConditions"
          value={medicalHistory.pastConditions.join(', ')}
          onChange={(e) => handleInputChange({ target: { name: 'pastConditions', value: e.target.value.split(', ') } })}
        />
      </div>

      <div>
        <label>Allergies:</label>
        <input
          type="text"
          name="allergies"
          value={medicalHistory.allergies.join(', ')}
          onChange={(e) => handleInputChange({ target: { name: 'allergies', value: e.target.value.split(', ') } })}
        />
      </div>

      <div>
        <label>Chronic Conditions:</label>
        <input
          type="text"
          name="chronicConditions"
          value={medicalHistory.chronicConditions.join(', ')}
          onChange={(e) => handleInputChange({ target: { name: 'chronicConditions', value: e.target.value.split(', ') } })}
        />
      </div>

      <div>
        <label>Social History:</label>
        <div>
          <label>Smoking:</label>
          <select
            name="smoking"
            value={medicalHistory.socialHistory.smoking}
            onChange={(e) => handleSocialHistoryChange('smoking', e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <div>
          <label>Alcohol:</label>
          <select
            name="alcohol"
            value={medicalHistory.socialHistory.alcohol}
            onChange={(e) => handleSocialHistoryChange('alcohol', e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <div>
          <label>Drugs:</label>
          <select
            name="drugs"
            value={medicalHistory.socialHistory.drugs}
            onChange={(e) => handleSocialHistoryChange('drugs', e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
      </div>

      <div>
        <label>Vaccinations:</label>
        <div>
          <input
            type="checkbox"
            name="vaccinations"
            value="COVID-19"
            checked={medicalHistory.vaccinations.includes("COVID-19")}
            onChange={handleCheckboxChange}
          />
          <label>COVID-19</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="vaccinations"
            value="Flu"
            checked={medicalHistory.vaccinations.includes("Flu")}
            onChange={handleCheckboxChange}
          />
          <label>Flu</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="vaccinations"
            value="Hepatitis B"
            checked={medicalHistory.vaccinations.includes("Hepatitis B")}
            onChange={handleCheckboxChange}
          />
          <label>Hepatitis B</label>
        </div>
        {/* Add more vaccination options as needed */}
      </div>

      <div>
        <label>Current Medications:</label>
        <input
          type="text"
          name="currentMedications"
          value={medicalHistory.currentMedications.join(', ')}
          onChange={(e) => handleInputChange({ target: { name: 'currentMedications', value: e.target.value.split(', ') } })}
        />
      </div>

      <div>
        <label>Any Other Information:</label>
        <textarea
          name="others"
          value={medicalHistory.others.join(', ')}
          onChange={(e) => handleInputChange({ target: { name: 'others', value: e.target.value.split(', ') } })}
          placeholder="Any additional medical history or comments"
        />
      </div>
    </div>
  );
}
