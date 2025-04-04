import "kaplay/global";

export function spawnPipes() {
    let rectangleHeight = rand(200, 300);

        add([
            rect(60, rectangleHeight),
            pos(width(), 0),
            area(),
            move(LEFT, 300),
            "pipe"
        ])

        add([
            rect(60, rectangleHeight),
            pos(width(), height() - rectangleHeight),
            area(),
            move(LEFT, 300),
            "pipe"
        ])

        wait(rand(2.5, 3.5), () => spawnPipes())
}