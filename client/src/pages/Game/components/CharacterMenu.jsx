import "./CharacterMenu.css";
import withinRange from "../../../utils/withinRange";
import BlackOverlay from "../../../components/BlackOverlay/BlackOverlay";

export default function CharacterMenu({ lastClick, characters, setCharacters, setShowCharacterMenu }) {
    // ----- FUNCTIONS -----
    const clickCharacter = (c) => {
        // IF click is within range of character coordinates
        if(withinRange(lastClick.x, c.xMin, c.xMax) && withinRange(lastClick.y, c.yMin, c.yMax)) {
            // Mark character as found
            setCharacters(prevCharacters => 
                prevCharacters.map(pc => 
                    pc.id === c.id ? { ...pc, found: true } : pc
                )
            );
        }

        // Hide character menu after
        setShowCharacterMenu(false);
    }

    // ----- RENDER -----
    return (
        <>
            <BlackOverlay zIndex={999} onClick={() => setShowCharacterMenu(false)}/>
            <div className="character-menu">
                {characters
                    .filter(c => !c.found)
                    .map(c => (
                        <button key={c.id} onClick={() => clickCharacter(c)}>
                            <img src={c.img} alt={c.name} />
                            {c.name}
                        </button>
                    ))
                }
            </div>
        </>
    );
}