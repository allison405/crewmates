import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from './client';

const EditCrewmate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [power, setPower] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentAttributes = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching crewmate details:', error.message);
        alert('Could not retrieve crewmate details.');
      } else if (data) {
        setName(data.name || '');
        setRole(data.role || '');
        setPower(String(data.power || ''));
        setColor(data.color || '');
      }
      setLoading(false);
    };

    fetchCurrentAttributes();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !role || !power || !color) {
      alert('Please fill out all fields!');
      return;
    }

    const powerValue = isNaN(power) ? power : parseInt(power, 10);

    const { error } = await supabase
      .from('crewmates')
      .update({ name, role, power: powerValue, color })
      .eq('id', id);

    if (error) {
      console.error('Error updating crewmate:', error.message);
      alert(`Update failed: ${error.message}`);
    } else {
      navigate('/gallery');
    }
  };

  if (loading) return <p className="loading-text">Loading crewmate details...</p>;

  return (
    <div className="form-container">
      <h2>Update Crewmate</h2>
      <form onSubmit={handleUpdate}>
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
              <label key={num} className="radio-label">
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
            {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Black", "White"].map((c) => (
              <label key={c} className="radio-label">
                <input 
                  type="radio" 
                  name="color" 
                  value={c} 
                  checked={color === c}
                  onChange={(e) => setColor(e.target.value)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn-submit">
            Save Changes
          </button>
          <Link to="/gallery" className="btn-cancel">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditCrewmate;