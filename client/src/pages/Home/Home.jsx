import Header from '../../components/Header/Header';
import scenes from '../../mock_data/scene-data';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';

export default function Home(){
  const loading = false;

  // Set document title on page load
  useEffect(() => {
    document.title = "Where's Waldo?";
  }, []);

  // ----- RENDER -----
  // If still loading, render loading component
  if(loading) return(
    <>
      <Header />
      <Loading message={"Loading..."} verticalOffset='10rem' />
    </>
  )
  return(
    <>
      {/* Render Header component */}
      <Header />

      <div className='home'>
        
        {/* Render scenes */}
        <section className="scenes-container">
            {/* Map through each scene */}
            {scenes.map((s) => (
                // Render scene-card
                <Link className="scene-card" key={s.id} to={`/game/${s.id}`}>
                    <img src={s.image} alt={`Thumbnail image for ${s.name}`}/>
                    <h3>{s.name}</h3>
                </Link>
            ))}
        </section>

        {/* Render Homepage footer */}
        <footer className='home-footer'>
            {/* Container for footer text */}
            <div className="footer-text">
                <h2>Are you a Waldo expert?</h2>
                <Link to={'/leaderboard'}>View the leaderboard</Link>
            </div>

            {/* Link-button to leaderboard */}
            <Link to={'/leaderboard'} className="link-button">
                View Leaderboard
            </Link>
        </footer>
      </div>
    </>
  );
}