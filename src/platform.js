import "kaplay/global";

export function spawnPipes() {
    let random = rand(0, 100);

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
        pos(width(), height() + 100 + random),
        anchor("botleft"),
        move(LEFT, 300),
        area(),
        scale(7),
        "pipe",
    ])

    add([
        sprite("pipeI"),
        pos(width(), -100 + random),
        move(LEFT, 300),
        area(),
        scale(7),
        "pipe",
    ])

    wait(rand(1.3, 2), () => spawnPipes())
}