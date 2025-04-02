import kaplay from "kaplay";
import "kaplay/global";
import loadAllSprites from "./sprites";

kaplay();

loadRoot("./"); // A good idea for Itch.io publishing later
loadAllSprites();

add([pos(120, 80), sprite("bean")]);

onClick(() => addKaboom(mousePos()));