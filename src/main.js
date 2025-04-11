import kaplay from "kaplay";
import "kaplay/global";
import loadAllSprites from "./sprites";
import { moveBG, spawnPipes, spawnBarriers } from "./platform";


kaplay({
    height: 1800,
    width: 900,
    letterbox: true,
    background: [0, 0, 0],
    font: "Bungee"
});

loadFont("Bungee", "fonts/Bungee.ttf")
loadMusic("bg-music", "sounds/game-music.mp3")

loadRoot("./"); // A good idea for Itch.io publishing later
loadAllSprites();

let score = 0;
let highscore = localStorage.getItem("highscore") || 0;

let musicPlaying = false;
scene("start", () => {
    moveBG();

    const bird = add([
        sprite("bird", { frame: 0, anim: "flight" }),
        pos(center()),
        anchor("center"),
        area(),
        scale(7)
    ])

    let scoreText = add([
        text(`score: ${score}`, { size: 80 }),
        pos(width() / 2, height() - 200),
        anchor("center"),
        z(10)
    ]);

    let highScoreText = add([
        text(`highscore: ${highscore}`, { size: 80 }),
        pos(width() / 2, height() - 300),
        anchor("center"),
        z(10)
    ]);


    add([
        text("Made by Nabeel", { size: 40 }),
        pos(width() / 2, height() - 110),
        anchor("center"),
        z(10),
    ])

    // Unlock audio playback on first user interaction
    if (isTouchscreen()) {
        onClick(() => {
            // Start audio context after user click/tap, but only if music is not playing
            if (!musicPlaying) {
                musicPlaying = true; // Set flag to true to prevent starting the music again
                go("game");
                play("bg-music", { loop: true }); // Start music
            } else {
                go("game");
            }
        });
    } else {
        onKeyPress("space", () => {
            // Start audio context after key press, but only if music is not playing
            if (!musicPlaying) {
                musicPlaying = true; // Set flag to true to prevent starting the music again
                go("game");
                play("bg-music", { loop: true }); // Start music
            } else {
                go("game");
            }
        });
    }
});

scene("game", () => {
    score = 0;
    moveBG();
    spawnBarriers();

    const bird = add([
        sprite("bird", { frame: 0, anim: "flight" }),
        pos(center()),
        anchor("center"),
        area(),
        body(),
        scale(7),
        rotate(-20)
    ])

    bird.onCollide("barrier", () => go("start"));

    let scoreText = add([
        text(score, { size: 100 }),
        pos(width() / 2, height() - 200),
        anchor("center"),
        z(10)
    ]);

    setTimeout(() => {
        spawnPipes();
    }, 2000);

    // set Gravity
    setGravity(1700)

    if (isTouchscreen()) {
        onClick(() => bird.jump());
    } else {
        onKeyPress("space", () => bird.jump())
    }

    loop(1, () => {
        if (bird.pos.y > height()) {
            go("start");
        }
    })

    bird.onCollide("pipe", go("start"))
    bird.onCollide("score-box", () => {
        score++;
        if (score > highscore) {
            localStorage.setItem("highscore", score);
            highscore = score;
        }
        scoreText.text = score;
    })
})

go("start");
