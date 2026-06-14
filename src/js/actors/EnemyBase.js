import { Actor, CollisionType } from "excalibur"
import { Player } from "./Player.js"

export class EnemyBase extends Actor {

    speed
    damage

    constructor(speed, damage, width = 24, height = 24) {
        super({
            width: width,
            height: height,
            collisionType: CollisionType.Passive
        })

        this.speed = speed
        this.damage = damage
        this.z = 1
    }

    onPreUpdate(engine) {
        const player = this.scene.player

        if (!player) {
            return
        }

        // Enemy volgt altijd de speler.
        const direction = player.pos.sub(this.pos).normalize()

        this.vel = direction.scale(this.speed)

        this.updateAnimation(direction)
    }

    updateAnimation(direction) {
        // Iedere enemy heeft zijn eigen animaties.
    }

    hitSomething(event) {
        if (event.other.owner instanceof Player) {
            event.other.owner.takeDamage(this.damage)
        }
    }
}