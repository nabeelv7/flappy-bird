import kaplay from "kaplay";
import "kaplay/global";
import loadAllSprites from "./sprites";
import { spawnPipes } from "./platform";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadAllSprites();

scene("game", () => {
    let score = 0;

    const bird = add([
        sprite("bird", { frame: 0, anim: "flight" }),
        pos(100, 100),
        area(),
        body(),
        scale(5)
    ])

    let scoreText = add([
        text(score, { size: 50 }),
        pos(width() / 2, height() - 100),
        anchor("botleft"),
        z(10)
    ]);

    spawnPipes();

    // set Gravity
    setGravity(1200)

    onKeyPress("space", () => {
        bird.jump();
    })

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
        text("Game Over!"),
        pos(center()),
        anchor("center"),
    ])
})

go("game");