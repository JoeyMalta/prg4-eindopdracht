import { Actor, Keys, Vector, CollisionType } from "excalibur"
import { BodyActor } from "./BodyActor.js"
import { HeadActor } from "./HeadActor.js"
import { Bullet } from "./Bullet.js"

export class Player extends Actor {

    #speed = 250
    #lastDirection = "down"
    #shootDirection = new Vector(0, 1)

    #ammo = 20
    #maxHealth = 100
    #health = 100
    #canTakeDamage = true

    constructor() {
        super({
            width: 40,
            height: 50,
            collisionType: CollisionType.Active
        })

        this.z = 2
    }

    onInitialize(engine) {
        // De player bestaat uit twee losse child actors.
        // Hierdoor kan ik het hoofd en lichaam apart animeren/positioneren.
        this.body = new BodyActor()
        this.head = new HeadActor()

        this.body.pos = new Vector(-5.5, 6)

        this.addChild(this.body)
        this.addChild(this.head)

        this.updateHeadPosition()
        this.updateAmmoUI()
        this.updateHealthUI()
    }

    onPreUpdate(engine) {
        let x = 0
        let y = 0

        // WASD input. Ik sla ook meteen de laatste richting op,
        // zodat de speler blijft kijken naar de kant waar hij laatst heen liep.
        if (engine.input.keyboard.isHeld(Keys.W)) {
            y = -1
            this.#lastDirection = "up"
        }

        if (engine.input.keyboard.isHeld(Keys.S)) {
            y = 1
            this.#lastDirection = "down"
        }

        if (engine.input.keyboard.isHeld(Keys.A)) {
            x = -1
            this.#lastDirection = "left"
        }

        if (engine.input.keyboard.isHeld(Keys.D)) {
            x = 1
            this.#lastDirection = "right"
        }

        const isMoving = x !== 0 || y !== 0

        // De schietrichting wordt alleen aangepast als je echt beweegt.
        // Daardoor kun je ook stilstaan en nog steeds dezelfde kant op schieten.
        if (isMoving) {
            this.#shootDirection = new Vector(x, y).normalize()
        }

        this.head.setDirection(this.#lastDirection)
        this.body.setDirection(this.#lastDirection, isMoving)
        this.updateHeadPosition()

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot()
        }

        this.vel = new Vector(
            x * this.#speed,
            y * this.#speed
        )
    }

    shoot() {
        // Als de ammo op is, dan kan je niet meer schietwn.
        if (this.#ammo <= 0) {
            return
        }

        this.#ammo--
        this.updateAmmoUI()

        const bullet = new Bullet(
            this.pos.clone(),
            this.#shootDirection
        )

        this.scene.add(bullet)
    }

    takeDamage(amount) {
        // Kleine invulnerability timer zodat de speler niet meteen 100 keer geraakt wordt
        // wanneer een enemy tegen hem aan blijft lopen.
        if (!this.#canTakeDamage) {
            return
        }

        this.#health -= amount

        if (this.#health < 0) {
            this.#health = 0
        }

        this.updateHealthUI()

        if (this.#health <= 0) {
            this.scene.engine.goToScene("gameover")
            return
        }

        this.#canTakeDamage = false

        setTimeout(() => {
            this.#canTakeDamage = true
        }, 750)
    }

    getAmmo() {
        return this.#ammo
    }

    addAmmo(amount) {
        this.#ammo += amount
        this.updateAmmoUI()
    }

    getHealth() {
        return this.#health
    }

    getMaxHealth() {
        return this.#maxHealth
    }

    updateAmmoUI() {
        if (this.scene && this.scene.ammoUI) {
            this.scene.ammoUI.setAmmo(this.#ammo)
        }
    }

    updateHealthUI() {
        if (this.scene && this.scene.healthUI) {
            this.scene.healthUI.setHealth(this.#health, this.#maxHealth)
        }
    }

    updateHeadPosition() {
        // Dit zijn handmatig getweakte offsets zodat het hoofd goed op het lichaam zit.
        if (this.#lastDirection === "up") {
            this.head.pos = new Vector(0, -8)
        }

        if (this.#lastDirection === "down") {
            this.head.pos = new Vector(-4.5, -8)
        }

        if (this.#lastDirection === "left") {
            this.head.pos = new Vector(-5.6, -10)
        }

        if (this.#lastDirection === "right") {
            this.head.pos = new Vector(0, -10)
        }
    }
}