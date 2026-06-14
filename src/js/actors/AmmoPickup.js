import { Actor, CollisionType, SpriteSheet, Animation, range } from "excalibur"
import { Resources } from "../resources.js"
import { Player } from "./Player.js"

export class AmmoPickup extends Actor {

    ammoAmount = 10

    constructor(position) {
        super({
            pos: position,
            width: 24,
            height: 24,
            collisionType: CollisionType.Passive
        })

        this.z = 1
    }

    /**
     * Maakt de pickup animatie aan.
     */
    onInitialize(engine) {
        const pickupSheet = SpriteSheet.fromImageSource({
            image: Resources.AmmoPickup,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 46.75,
                spriteHeight: 40
            }
        })

        const idleAnimation = Animation.fromSpriteSheet(
            pickupSheet,
            range(0, 7),
            100
        )

        this.graphics.use(idleAnimation)

        this.on("collisionstart", (event) => {
            this.pickup(event)
        })
    }

    /**
     * Geeft ammo aan de speler en verwijdert de pickup.
     */
    pickup(event) {
        if (event.other.owner instanceof Player) {
            event.other.owner.addAmmo(this.ammoAmount)
            this.kill()
        }
    }
}