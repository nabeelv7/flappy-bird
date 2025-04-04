import kaplay from "kaplay";
import "kaplay/global";
import loadAllSprites from "./sprites";
import { spawnPipes } from "./platform";

kaplay({
    height: 1800,
    width: 900,
    letterbox: true,
    background: [0, 0, 0],
    font: "sans-serif"
});

loadRoot("./"); // A good idea for Itch.io publishing later
loadAllSprites();

scene("game", () => {
    let score = 0;

    const bird = add([
        sprite("bird", { frame: 0, anim: "flight" }),
        pos(100, 100),
        area(),
        body(),
        scale(7)
    ])

    let scoreText = add([
        text(score, { size: 100 }),
        pos(width() / 2, height() - 100),
        anchor("botleft"),
        z(10)
    ]);

    spawnPipes();

    // set Gravity
    setGravity(1200)

    if (isTouchscreen()) {
        onClick(() => bird.jump());
    } else {
        onKeyPress("space", () => bird.jump())
    }

    loop(1, () => {
        if (bird.pos.y > height()) {
            go("over");
        }
    })

    bird.onCollide("pipe", () => go("over"))
    bird.onCollide("score-box", () => {
        score++;
        scoreText.text = score;
    })
})

scene("over", () => {
    add([
        text("Game Over!", { size: 70 }),
        pos(width() / 2, height() / 2 - 50),
        anchor("center"),
    ])

    if (isTouchscreen()) {
        onClick(() => go("game"));
        add([
            text("click to restart"),
            pos(width() / 2, height() / 2 + 50),
            anchor("center"),
        ])
    } else {
        onKeyPress("space", () => go("game"));
        add([
            text("press space to restart"),
            pos(width() / 2, height() / 2 + 50),
            anchor("center"),
        ])
    }
})

go("game");