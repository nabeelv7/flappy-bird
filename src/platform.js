import "kaplay/global";

export function spawnPipes() {
    let random = rand(230, 270)

    let pipe = add([
        sprite("pipe"),
        pos(width(), height() + random),
        anchor("botleft"),
        move(LEFT, 300),
        area(),
        scale(5),
        "pipe",
    ])

    add([
        sprite("pipeI"),
        pos(width(), 0 - random),
        move(LEFT, 300),
        area(),
        scale(5),
        "pipe",
    ])

    wait(rand(0.9, 1.4), () => spawnPipes())
}