import kaplay from "kaplay";
import "kaplay/global";
import loadAllSprites from "./sprites";
import { moveBG, spawnPipes } from "./platform";


kaplay({
    height: 1800,
    width: 900,
    letterbox: true,
    background: [0, 0, 0],
    font: "Bungee"
});

loadFont("Bungee", "fonts/Bungee.ttf")
loadMusic("bg-music", "sounds/game-music.mp3")
loadSound("beep", "sounds/beep.mp3")

loadRoot("./"); // A good idea for Itch.io publishing later
loadAllSprites();

play("bg-music", {
    loop: true
})

let score = 0;
let highscore = localStorage.getItem("highscore") || 0; 

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


    if (isTouchscreen()) {
        onClick(() => go("game"));
    } else {
        onKeyPress("space", () => go("game"));
    }
})

scene("game", () => {
    score = 0;
    moveBG();

    const bird = add([
        sprite("bird", { frame: 0, anim: "flight" }),
        pos(center()),
        anchor("center"),
        area(),
        body(),
        scale(7),
        rotate(-20)
    ])

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
    setGravity(1200)

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

    bird.onCollide("pipe", () => go("start"))
    bird.onCollide("score-box", () => {
        play("beep");
        score++;
        if (score > highscore) {
            localStorage.setItem("highscore", score);
            highscore = score;
        }
        scoreText.text = score;
    })
})

go("start");