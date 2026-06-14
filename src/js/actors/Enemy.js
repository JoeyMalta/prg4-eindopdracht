import { SpriteSheet, Animation, range } from "excalibur"
import { Resources } from "../resources.js"
import { EnemyBase } from "./EnemyBase.js"

export class Enemy extends EnemyBase {

    #lastDirection = "down"

    constructor() {
        super(80, 25, 24, 24)
    }

    onInitialize(engine) {
        const leftSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyLeft,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 32,
                spriteHeight: 32
            }
        })

        const rightSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyRight,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 32,
                spriteHeight: 32
            }
        })

        const upSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyUp,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 32,
                spriteHeight: 32
            }
        })

        const downSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyDown,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 32,
                spriteHeight: 32
            }
        })

        this.graphics.add("left", Animation.fromSpriteSheet(leftSheet, [7, 6, 5, 4, 3, 2, 1, 0], 100))
        this.graphics.add("right", Animation.fromSpriteSheet(rightSheet, range(0, 7), 100))
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