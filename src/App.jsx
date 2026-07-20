import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import CreateCrewmate from './createCrewmate.jsx';
import Gallery from './gallery.jsx';
import CrewmateInfo from './crewmateInfo.jsx';
import EditCrewmate from './editCrewmate.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Persistent Navigation Sidebar */}
        <nav className="navbar">
          <h1>🚀 Crewmate Commander</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/gallery" className="nav-link">View Fleet</Link>
            <Link to="/create" className="nav-link">Create Crewmate</Link>
          </div>
        </nav>

        {/* Dynamic Page Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/info/:id" element={<CrewmateInfo />} />
            <Route path="/edit/:id" element={<EditCrewmate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;