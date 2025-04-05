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

export function moveBG() {
    const speed = 300;

    const bg = add([
        sprite("bg"),
        pos(0, 0),
        scale(28.125),
        z(-10),
        "BG",
    ]);

    const bg2 = add([
        sprite("bg"),
        pos(width(), 0), // Position bg2 right next to bg
        scale(28.125),
        z(-10),
        "BG2",
    ]);

    loop(0.01, () => {
        bg.pos.x -= speed * 0.01;
        bg2.pos.x -= speed * 0.01;
        
        // If bg moves off-screen, reset it to the right
        if (bg2.pos.x == 0) {
            bg.pos.x = width() // Move bg after bg2
        }

        // If bg2 moves off-screen, reset it to the right
        if (bg.pos.x == 0) {
            bg2.pos.x = width(); // Move bg2 after bg
        }
    });
}
