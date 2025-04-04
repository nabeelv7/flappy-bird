import "kaplay/global";

export function spawnPipes() {
    let random = rand(100, 170)

    add([
        rect(28, height()),
        pos(width() + 170, height()),
        anchor("botleft"),
        move(LEFT, 300),
        area(),
        opacity(0),
        "score-box"
    ])
    
    add([
        sprite("pipe"),
        pos(width(), height() + random),
        anchor("botleft"),
        move(LEFT, 300),
        area(),
        scale(7),
        "pipe",
    ])

    add([
        sprite("pipeI"),
        pos(width(), 0 - random),
        move(LEFT, 300),
        area(),
        scale(7),
        "pipe",
    ])

    wait(rand(1, 1.6), () => spawnPipes())
}