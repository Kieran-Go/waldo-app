import "./Game.css";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import games from "../../mock_data/game-data";
import characterImages from "../../utils/characterImages";
import secondsToMinutes from "../../utils/secondsToMinutes";
import Header from "../../components/Header/Header";
import CharacterMenu from "./components/CharacterMenu";
import ScoreForm from "./components/ScoreForm";
import Loading from "../../components/Loading/Loading";

export default function Game() {
    const loading = false;
    // Fetch correct game using ID from params (Uses mock-data for now but must change to API fetch later)
    const { id } = useParams();
    const game = games[id];

    // ----- STATES -----
    const [gameEnd, setGameEnd] = useState(false); // Game End state
    const [timer, setTimer] = useState(0); // Game timer state
    const [lastClick, setLastClick] = useState(null); // Coordinates of last click
    const [showCharacterMenu, setShowCharacterMenu] = useState(false); // Whether to render character menu
    const [characters, setCharacters] = useState(null); // Game character data

    // ----- EFFECTS -----
    useEffect(() => {
        // Return if game data not yet fetched
        if(!game) return;

        // Change document title
        document.title = `${game.name} - Where's Waldo?`;

        // Init characters array for this game
        function initCharacters() {
            setCharacters(game.characters.map(c => ({
                id: c.id,
                name: c.name,
                img: characterImages[c.id],
                xMin: c.xMin,
                xMax: c.xMax,
                yMin: c.yMin,
                yMax: c.yMax,
                found: false,
            })));
        }
        initCharacters();
    },[game]);

    // Check if all characters found when characters array changes
    useEffect(() => {
        if (!characters) return;
        const allFound = characters.every(c => c.found);

        // If all characters are found, end the game
        const endGame = () => { setGameEnd(true); }
        if (allFound) endGame();
    }, [characters]);

    // Increment game timer each second using interval
    useEffect(() => {
        // Don't run timer while loading or game has ended
        if(loading || gameEnd) return;
        
        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    },[loading, gameEnd]);

    // ----- FUNCTIONS -----
    const gameClick = (event) => {
        // If character menu is already open, close it then return early
        if(showCharacterMenu) {
            setShowCharacterMenu(false);
            return;
        }

        // Convert click position to natural image coordinates
        const rect = event.target.getBoundingClientRect();
        const clickX = (event.clientX - rect.left) * (event.target.naturalWidth / rect.width);
        const clickY = (event.clientY - rect.top) * (event.target.naturalHeight / rect.height);

        // Save click location and open character menu
        setLastClick({ x: clickX, y: clickY });
        setShowCharacterMenu(true);
    }

    // ----- RENDER -----
    // If still loading, render loading component
    if(loading || !game) return(
        <>
            <Header />
            <Loading message={"Loading..."} verticalOffset='10rem' />
        </>
    );
    return(
        <>
            {/* Render Header */}
            <Header />

            {/* Render game section content */}
            <section className="game">
                {/* Game info */}
                <div className="game-info">
                    {/* Container for character images */}
                    <div className="character-container">
                        {characters && characters.map((c) => (
                            <img className={`character-img ${c.found ? "found" : ""}`}
                                key={c.id}
                                src={c.img}
                                alt={c.name}
                            />
                        ))}
                    </div>
                    
                    {/* Timer */}
                    <p className="timer">{secondsToMinutes(timer)}</p>
                </div>

                {/* Game scene image */}
                <img className="game-img" src={game.image} onClick={gameClick} alt={`Image for ${game.name}`}/>

                {/* Conditionally render character-select menu */}
                {showCharacterMenu && lastClick && !gameEnd && (
                    <CharacterMenu
                        lastClick={lastClick}
                        characters={characters}
                        setCharacters={setCharacters}
                        setShowCharacterMenu={setShowCharacterMenu}
                    />
                )}

                {/* Conditionally render game-score form */}
                {gameEnd && <ScoreForm timer={timer} gameId={id} />} 
            </section>
        </>
    );
}