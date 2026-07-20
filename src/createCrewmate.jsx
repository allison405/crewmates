import { useState } from 'react';
import { supabase } from './client';
import { useNavigate } from 'react-router-dom';

const CreateCrewmate = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [power, setPower] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role || !power || !color) {
      alert('Please fill out all fields!');
      return;
    }

    const { error } = await supabase
      .from('crewmates')
      .insert([{ name, role, power, color }]);

    if (error) {
      console.error('Error creating crewmate:', error.message);
    } else {
      navigate('/gallery');
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter crewmate name"
          />
        </div>

        <div className="input-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">-- Select Role --</option>
            <option value="Pilot">Pilot</option>
            <option value="Engineer">Engineer</option>
            <option value="Scientist">Scientist</option>
            <option value="Medic">Medic</option>
          </select>
        </div>

        <div className="input-group">
          <label>Power Level (1-10):</label>
          <div className="radio-group">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <label key={num}>
                <input 
                  type="radio" 
                  name="power" 
                  value={num} 
                  checked={power === String(num)}
                  onChange={(e) => setPower(e.target.value)}
                />
                {num}
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Color:</label>
          <div className="radio-group">
            {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Black", "White"].map((num) => (
              <label key={num}>
                <input 
                  type="radio" 
                  name="color" 
                  value={num} 
                  checked={color === String(num)}
                  onChange={(e) => setColor(e.target.value)}
                />
                {num}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-submit">Submit Crewmate</button>
      </form>
    </div>
  );
};

export default CreateCrewmate;