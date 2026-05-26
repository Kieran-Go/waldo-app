import "./Game.css";
import { useParams } from "react-router-dom"
import games from "../../mock_data/game-data";
import characterImages from "../../utils/characterImages";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";

export default function Game() {
    const loading = false;
    // Fetch correct game using ID from params (Uses mock-data for now but must change to API fetch later)
    const { id } = useParams();
    const game = games[id];

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

            {/* Render game content */}
            <section className="game-container">
                {/* PLACEHOLDER: Render the game scene ID and each character's image */}
                <h1>{game.id}</h1>

                {game.characters.map((c) => (
                    <img className="character-img"
                        key={c.id}
                        src={characterImages[c.id]}
                        alt={c.name}
                    />
                ))}
            </section>
        </>
    );
}