import { useState, useEffect } from 'react';
import { supabase } from './client';
import { Link } from 'react-router-dom';
import Card from './card';

const Gallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async fetcher inside the effect
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery:', error.message);
      } else {
        setCrewmates(data || []);
      }
      setLoading(false);
    };

    fetchCrewmates();
  }, []); // Empty dependency array runs once on mount

  // Delete crewmate directly from the summary list
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);

    if (error) {
      alert(`Failed to delete: ${error.message}`);
      console.error('Error deleting crewmate:', error.message);
    } else {
      // Immediately remove from state so UI updates
      setCrewmates((prev) => prev.filter((crew) => crew.id !== id));
    }
  };

  if (loading) return <p>Loading your crew...</p>;

  return (
    <div className="gallery-container">
      <h2>Your Crewmate Fleet</h2>
      {crewmates.length === 0 ? (
        <div className="empty-state">
          <p>You haven't assembled any crewmates yet!</p>
          <Link to="/create" className="btn-action">Create One Now</Link>
        </div>
      ) : (
        <div className="card-grid">
          {crewmates.map((crew) => (
            <Card 
              key={crew.id} 
              crew={crew} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;