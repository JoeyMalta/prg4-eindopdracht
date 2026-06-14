import { Actor, SpriteSheet, Animation, range } from "excalibur"
import { Resources } from "../resources.js"

export class BodyActor extends Actor {

    constructor() {
        super({
            width: 32,
            height: 30
        })
    }

    /**
     * Maakt de loopanimaties en idle sprites van het lichaam aan.
     */
    onInitialize(engine) {

        const verticalSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerBodyUpDown,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 32,
                spriteHeight: 30
            }
        })

        const horizontalSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerBodyLeftRight,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 32,
                spriteHeight: 30
            }
        })

        this.graphics.add(
            "up",
            Animation.fromSpriteSheet(verticalSheet, range(0, 4), 100)
        )

        this.graphics.add(
            "down",
            Animation.fromSpriteSheet(verticalSheet, range(5, 9), 100)
        )

        this.graphics.add(
            "right",
            Animation.fromSpriteSheet(horizontalSheet, range(0, 4), 100)
        )

        this.graphics.add(
            "idleUp",
            verticalSheet.sprites[0]
        )

        this.graphics.add(
            "idleDown",
            verticalSheet.sprites[5]
        )

        this.graphics.add(
            "idleRight",
            horizontalSheet.sprites[0]
        )

        this.graphics.add(
            "idleLeft",
            horizontalSheet.sprites[0]
        )

        this.graphics.use("idleDown")
    }

    /**
     * Verandert de animatie van het lichaam.
     */
    setDirection(direction, isMoving) {

        if (direction === "left") {
            this.scale.x = -1
        }

        if (direction === "right") {
            this.scale.x = 1
        }

        if (direction === "up" || direction === "down") {
            this.scale.x = 1
        }

        if (isMoving) {

            if (direction === "left") {
                this.graphics.use("right")
            }

            else {
                this.graphics.use(direction)
            }
        }

        else {

            if (direction === "left") {
                this.graphics.use("idleLeft")
            }

            else {
                this.graphics.use(`idle${direction.charAt(0).toUpperCase() + direction.slice(1)}`)
            }
        }
    }
}