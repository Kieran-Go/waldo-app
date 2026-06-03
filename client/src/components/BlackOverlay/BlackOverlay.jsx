import './BlackOverlay.css';

// Renders a black overlay across the entire screen with config props
export default function BlackOverlay({
    zIndex = 9999,
    darknessLevel = 0.5,
    fadeIn = false,
    fadeDuration = 500,
    onClick
}) {
    // ----- RENDER -----
    return (
        <div
            className={`black-overlay ${fadeIn ? "fade-in" : ""}`}
            onClick={onClick}
            style={{
                zIndex,
                background: `rgba(0, 0, 0, ${darknessLevel})`,
                animationDuration: `${fadeDuration}ms`
            }}
        />
    );
}