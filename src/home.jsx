import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Crewmate Customizer!</h1>
      <p>
        Here is where you can create, organize, and manage your custom crew 
        before sending them out on their next deployment.
      </p>
      
      <div className="home-actions">
        <Link to="/create" className="btn-action btn-primary-link">
          ➕ Create a New Crewmate
        </Link>
        <Link to="/gallery" className="btn-action btn-secondary-link">
          🚀 Crewmate Gallery
        </Link>
      </div>
    </div>
  );
};

export default Home;