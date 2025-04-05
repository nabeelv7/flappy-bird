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

let score = 0;

scene("start", () => {
    const bird = add([
        sprite("bird", { frame: 0, anim: "flight" }),
        pos(center()),
        anchor("center"),
        area(),
        scale(7)
    ])

    if (isTouchscreen()) {
        onClick(() => go("game"));
    } else {
        onKeyPress("space", () => go("game"));
    }
})

scene("game", () => {
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
        pos(width() / 2, height() - 100),
        anchor("botleft"),
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
        score++;
        scoreText.text = score;
    })
})

go("start");