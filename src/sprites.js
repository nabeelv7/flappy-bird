import "kaplay/global";

export default function loadAllSprites() {
    loadSprite("bird", "sprites/bird.png", {
        sliceX: 4,
        sliceY: 0,
        anims: {
            flight: { from: 0, to: 3, loop: true }
        }
    });
}