import "./Game.css";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import games from "../../mock_data/game-data";
import characterImages from "../../utils/characterImages";
import secondsToMinutes from "../../utils/secondsToMinutes";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";

export default function Game() {
    const loading = false;
    // Fetch correct game using ID from params (Uses mock-data for now but must change to API fetch later)
    const { id } = useParams();
    const game = games[id];

    // ----- STATES -----
    const [gameEnd, setGameEnd] = useState(false); // Game End state
    const [timer, setTimer] = useState(0); // Game timer state

    // ----- EFFECTS -----
    // Increment game timer each second using interval
    useEffect(() => {
        // Don't run timer while loading or game has ended
        if(loading || gameEnd) return;
        
        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    },[loading, gameEnd]);

    // ----- RENDER -----
    // If still loading, render loading component
    if(loading) return(
        <>
            <Header />
            <Loading message={"Loading..."} verticalOffset='10rem' />
        </>
    );
    return(
        <>
            {/* Render Header */}
            <Header />

            <section className="game">
                {/* Render game info */}
                <div className="game-info">
                    {/* Container for character images */}
                    <div className="character-container">
                        {game.characters.map((c) => (
                            <img className="character-img"
                                key={c.id}
                                src={characterImages[c.id]}
                                alt={c.name}
                            />
                        ))}
                    </div>
                    
                    {/* Timer */}
                    <p className="timer">{secondsToMinutes(timer)}</p>
                </div>

                {/* Render game scene image */}
                <img className="game-img" src={game.image} alt={`Image for ${game.name}`}/>
                
            </section>
        </>
    );
}