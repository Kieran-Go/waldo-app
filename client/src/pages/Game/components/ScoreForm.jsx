import secondsToMinutes from "../../../utils/secondsToMinutes";

export default function ScoreForm({ timer, gameId }) {
    // ----- RENDER -----
    return(
        // Placeholder
        <div className="score-form">
            <p>Game {gameId} completed at {secondsToMinutes(timer)}</p>
        </div>
    );
}