import { Actor, SpriteSheet } from "excalibur"
import { Resources } from "../resources.js"

export class HeadActor extends Actor {

    constructor() {
        super({
            width: 40,
            height: 40
        })
    }

    /**
     * Maakt de sprites van het hoofd aan.
     */
    onInitialize(engine) {
        const headSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerHead,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 40,
                spriteHeight: 40
            }
        })

        this.graphics.add("down", headSheet.sprites[0])
        this.graphics.add("up", headSheet.sprites[4])
        this.graphics.add("right", headSheet.sprites[2])
        this.graphics.add("left", headSheet.sprites[6])

        this.graphics.use("down")
    }

    /**
     * Verandert de sprite van het hoofd op basis van de richting.
     */
    setDirection(direction) {
        this.graphics.use(direction)
    }
}