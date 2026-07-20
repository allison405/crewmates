import { Link } from 'react-router-dom';

const Card = ({ crew, onDelete }) => {
  return (
    <div className="crewmate-card">
      <h3>{crew.name}</h3>
      <p>Role: <strong>{crew.role}</strong></p>
      <p>Power Level: <strong>{crew.power}</strong></p>

      <div className="card-actions">
        <Link to={`/info/${crew.id}`} className="btn-view">Inspect Profile</Link>
        <Link to={`/edit/${crew.id}`} className="btn-edit-link">✏️ Edit</Link>
        
        <button 
          onClick={() => onDelete(crew.id, crew.name)} 
          className="btn-delete"
          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default Card;