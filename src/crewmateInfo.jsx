import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './client';

const CrewmateInfo = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrewmateDetails = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error retrieving crewmate info:', error.message);
      } else {
        setCrewmate(data);
      }
      setLoading(false);
    };

    fetchCrewmateDetails();
  }, [id]);

  if (loading) return <p>Loading files...</p>;
  if (!crewmate) return <p>Crewmate not found.</p>;

  return (
    <div className="details-container">
      <h2>Crewmate Profile: {crewmate.name}</h2>
      <div className="profile-card">
        <p><strong>Assigned Specialty:</strong> {crewmate.role}</p>
        <p><strong>Power Magnitude:</strong> {crewmate.power} / 10</p>
        <p><strong>Color:</strong> {crewmate.color}</p>
        <p><strong>Enlisted On:</strong> {new Date(crewmate.created_at).toLocaleString()}</p>
        
        <div className="action-links">
          <Link to={`/edit/${crewmate.id}`} className="btn-edit">Modify Attributes</Link>
          <Link to="/gallery" className="btn-back">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default CrewmateInfo;