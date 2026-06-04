import "./ScoreForm.css";
import secondsToMinutes from "../../../utils/secondsToMinutes";
import BlackOverlay from "../../../components/BlackOverlay/BlackOverlay";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ScoreForm({ timer, gameId }) {
    // ----- HOOKS ------
    const displayTimer = secondsToMinutes(timer);
    const nav = useNavigate();
    const [name, setName] = useState('');

    // ----- FUNCTIONS -----
    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: POST score data to backend DB
        try{
            // Navigate to leaderboard page after POST
            nav("/leaderboard");
        }
        catch{
            alert("An error occurred while submitting your score.");
        }
    }

    // ----- RENDER -----
    return(
        <>
            <BlackOverlay zIndex={1001} fadeIn={true} fadeDuration={300} />
            <div className="form-container">
                <h2>You found all characters!</h2>
                <p>Your time: <span>{displayTimer}</span></p>
                <p>Enter a name to submit to the leaderboard:</p>

                <form onSubmit={handleSubmit} role="form">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value.slice(0, 30))}
                        required
                        maxLength={30}
                    />
                    <button type="submit">Submit Score</button>
                </form>

                <Link to="/" className="home-button">Back to Home</Link>
            </div>
        </>
    );
}