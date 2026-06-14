import { SpriteSheet, Animation, range } from "excalibur"
import { Resources } from "../resources.js"
import { EnemyBase } from "./EnemyBase.js"

export class Grub extends EnemyBase {

    #lastDirection = "down"

    constructor() {
        // Grub is sneller maar doet minder damage dan de normale enemy.
        super(150, 15, 24, 24)
    }

    onInitialize(engine) {
        const leftSheet = SpriteSheet.fromImageSource({
            image: Resources.GrubLeft,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 64,
                spriteHeight: 64
            }
        })

        const rightSheet = SpriteSheet.fromImageSource({
            image: Resources.GrubRight,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 64,
                spriteHeight: 64
            }
        })

        const upSheet = SpriteSheet.fromImageSource({
            image: Resources.GrubUp,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 64,
                spriteHeight: 64
            }
        })

        const downSheet = SpriteSheet.fromImageSource({
            image: Resources.GrubDown,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 64,
                spriteHeight: 64
            }
        })

        this.graphics.add("left", Animation.fromSpriteSheet(leftSheet, range(0, 3), 100))
        this.graphics.add("right", Animation.fromSpriteSheet(rightSheet, range(0, 3), 100))
        this.graphics.add("up", Animation.fromSpriteSheet(upSheet, range(0, 3), 100))
        this.graphics.add("down", Animation.fromSpriteSheet(downSheet, range(0, 3), 100))

        this.graphics.use("down")

        this.on("collisionstart", (event) => {
            this.hitSomething(event)
        })
    }

    updateAnimation(direction) {
        if (Math.abs(direction.x) > Math.abs(direction.y)) {
            if (direction.x > 0) {
                this.#lastDirection = "right"
            } else {
                this.#lastDirection = "left"
            }
        } else {
            if (direction.y > 0) {
                this.#lastDirection = "down"
            } else {
                this.#lastDirection = "up"
            }
        }

        this.graphics.use(this.#lastDirection)
    }
}