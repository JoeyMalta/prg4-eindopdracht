import { Actor, Vector } from "excalibur"
import { Enemy } from "./Enemy.js"
import { Grub } from "./Grub.js"

export class Spawner extends Actor {

    frameCounter = 0

    onPostUpdate(engine) {
        this.frameCounter++

        if (this.frameCounter > 90) {
            this.spawnEnemy()
            this.frameCounter = 0
        }
    }

    spawnEnemy() {
        let enemy

        const randomEnemy = Math.random()

        if (randomEnemy < 0.8) {
            enemy = new Enemy()
        } else {
            enemy = new Grub()
        }

        const side = Math.floor(Math.random() * 4)

        if (side === 0) {
            enemy.pos = new Vector(1280, 140)
        }

        if (side === 1) {
            enemy.pos = new Vector(1280, 1300)
        }

        if (side === 2) {
            enemy.pos = new Vector(120, 720)
        }

        if (side === 3) {
            enemy.pos = new Vector(2440, 720)
        }

        this.scene.add(enemy)
    }
}