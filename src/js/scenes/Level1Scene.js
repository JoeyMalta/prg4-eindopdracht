import { Scene, Vector, Actor, BoundingBox } from "excalibur"
import { Player } from "../actors/Player.js"
import { Spawner } from "../actors/Spawner.js"
import { ScoreUI } from "../actors/ScoreUI.js"
import { AmmoUI } from "../actors/AmmoUI.js"
import { HealthUI } from "../actors/HealthUI.js"
import { Resources } from "../resources.js"

export class Level1Scene extends Scene {

    player

    scoreUI
    ammoUI
    healthUI

    score = 0
    highscore = 0

    worldWidth = 2560
    worldHeight = 1440

    onActivate(ctx) {
        this.clear()

        // Elke keer dat de game restart begint het weer met 0 punten.
        this.score = 0

        // De highscore bewaar ik in localStorage, zodat hij blijft staan na refreshen.
        const savedHighscore = localStorage.getItem("highscore")

        if (savedHighscore) {
            this.highscore = parseInt(savedHighscore)
        }

        this.createLevel()
    }

    createLevel() {
        // De wereld is groter dan het scherm.
        // Daarom plaats ik de achtergrond in het midden van de volledige wereld.
        const voidBackground = new Actor({
            pos: new Vector(this.worldWidth / 2, this.worldHeight / 2),
            z: 0
        })

        voidBackground.graphics.use(Resources.Void.toSprite())
        this.add(voidBackground)

        const background = new Actor({
            pos: new Vector(this.worldWidth / 2, this.worldHeight / 2),
            z: 0
        })

        background.graphics.use(Resources.Background.toSprite())
        this.add(background)

        // De speler start in het midden van de wereld.
        this.player = new Player()
        this.player.pos = new Vector(this.worldWidth / 2, this.worldHeight / 2)
        this.add(this.player)

        // De spawner maakt tijdens het spelen steeds nieuwe enemies aan. om de zoveel tijd...
        const spawner = new Spawner()
        this.add(spawner)

        // UI elementen maak ik hier aan.
        this.scoreUI = new ScoreUI()
        this.add(this.scoreUI)

        this.scoreUI.setScore(this.score)
        this.scoreUI.setHighscore(this.highscore)

        this.ammoUI = new AmmoUI()
        this.add(this.ammoUI)

        this.ammoUI.setAmmo(
            this.player.getAmmo()
        )

        this.healthUI = new HealthUI()
        this.add(this.healthUI)

        this.healthUI.setHealth(
            this.player.getHealth(),
            this.player.getMaxHealth()
        )

        this.setupCamera()
    }

    setupCamera() {
        // De camera volgt de speler, maar blijft binnen de grenzen van het level.
        // Door de zoom staat de speler iets dichterbij in beeld.
        this.camera.zoom = 1.5

        this.camera.strategy.lockToActor(
            this.player
        )

        this.camera.strategy.limitCameraBounds(
            new BoundingBox(
                0,
                0,
                this.worldWidth,
                this.worldHeight
            )
        )
    }

    addScore(amount) {
        this.score += amount
        this.scoreUI.setScore(this.score)

        // Als de huidige score hoger is dan de oude highscore,
        // sla ik hem meteen opnieuw op.
        if (this.score > this.highscore) {
            this.highscore = this.score

            localStorage.setItem(
                "highscore",
                this.highscore
            )

            this.scoreUI.setHighscore(
                this.highscore
            )
        }
    }
}