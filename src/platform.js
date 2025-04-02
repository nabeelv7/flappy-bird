import "kaplay/global";

export function spawnAPipe() {
    let rectangleHeight = rand(200, 300);
    
    add([
        rect(60, rectangleHeight),
        pos(width(), height() - rectangleHeight),
        area(),
        move(LEFT, 300),
        "pipe"
    ])
}