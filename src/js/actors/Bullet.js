import { Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "../resources.js"
import { EnemyBase } from "./EnemyBase.js"
import { AmmoPickup } from "./AmmoPickup.js"

export class Bullet extends Actor {

    constructor(position, direction) {
        super({
            pos: position.add(direction.scale(35)),
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive
        })

        this.vel = direction.scale(500)
        this.scale = new Vector(0.5, 0.5)
        this.z = 2
    }

    /**
     * Zet de sprite van de kogel.
     */
    onInitialize(engine) {
        this.graphics.use(Resources.Projectile.toSprite())

        this.on("collisionstart", (event) => {
            this.hitSomething(event)
        })
    }

    /**
     * Controleert of de kogel een enemy raakt.
     */
    hitSomething(event) {
        if (event.other.owner instanceof EnemyBase) {
            const enemyPosition = event.other.owner.pos.clone()

            event.other.owner.kill()
            this.kill()

            if (this.scene && this.scene.addScore) {
                this.scene.addScore(1)
            }

            this.tryDropAmmo(enemyPosition)
        }
    }

    /**
     * Heeft 5% kans om ammo te droppen.
     */
    tryDropAmmo(position) {
        const dropChance = Math.random()

        if (dropChance <= 0.25) {
            const ammoPickup = new AmmoPickup(position)
            this.scene.add(ammoPickup)
        }
    }

    /**
     * Verwijdert de kogel als deze buiten het level komt.
     */
    onPostUpdate(engine) {
        if (
            this.pos.x < -100 ||
            this.pos.x > 2700 ||
            this.pos.y < -100 ||
            this.pos.y > 1600
        ) {
            this.kill()
        }
    }
}