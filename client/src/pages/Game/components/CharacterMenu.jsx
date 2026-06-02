import withinRange from "../../../utils/withinRange";

export default function CharacterMenu({ lastClick, characters, setCharacters, setShowCharacterMenu }) {
    // ----- FUNCTIONS -----
    const clickCharacter = (c) => {
        // Check that click is within range of character coordinates
        let found = (
            withinRange(lastClick.x, c.xMin, c.xMax) &&
            withinRange(lastClick.y, c.yMin, c.yMax)
        );

        if(found) {
            // Mark character as found
            setCharacters(prevCharacters => 
                prevCharacters.map(pc => 
                    pc.id === c.id ? { ...c, found: true } : pc
                )
            );
        }

        // Hide character menu after
        setShowCharacterMenu(false);
    }

    // ----- RENDER -----
    return (
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
    );
}