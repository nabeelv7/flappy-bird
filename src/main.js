import kaplay from "kaplay";
import "kaplay/global";
import loadAllSprites from "./sprites";
import { spawnAPipe } from "./platform";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadAllSprites();

scene("game", () => {
    const bird = add([
        sprite("bird", { frame: 0, anim: "flight" }),
        pos(100, 100),
        area(),
        body(),
        scale(5)
    ])

    spawnAPipe()

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
})

scene("over", () => {
    add([
        text("Game Over!"),
        pos(center()),
        anchor("center"),
    ])
})

go("game");