import "kaplay/global";

export default function loadAllSprites() {
    loadSprite("bird", "sprites/bird.png", {
        sliceX: 4,
        sliceY: 0,
        anims: {
            flight: { from: 0, to: 3, loop: true }
        }
    });

    loadSprite("pipe", "sprites/pipe.png")
    loadSprite("pipeI", "sprites/pipe-inverted.png")
    loadSprite("bg", "sprites/bg.png")
}