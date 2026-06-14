import { ScreenElement, Label, Vector, Font, FontUnit, Color } from "excalibur"

export class HealthUI extends ScreenElement {

    healthLabel
    currentHealth = 100
    maxHealth = 100

    constructor() {
        super({
            x: 20,
            y: 105,
            z: 100
        })
    }

    onInitialize(engine) {
        this.healthLabel = new Label({
            text: `Health: ${this.currentHealth}/${this.maxHealth}`,
            pos: new Vector(0, 0),
            font: new Font({
                family: "Arial",
                size: 32,
                unit: FontUnit.Px,
                color: Color.Green
            })
        })

        this.addChild(this.healthLabel)
    }

    setHealth(health, maxHealth) {
        this.currentHealth = health
        this.maxHealth = maxHealth

        if (!this.healthLabel) {
            return
        }

        this.healthLabel.text = `Health: ${this.currentHealth}/${this.maxHealth}`

        if (this.currentHealth > 50) {
            this.healthLabel.font.color = Color.Green
        } else if (this.currentHealth > 25) {
            this.healthLabel.font.color = Color.Yellow
        } else {
            this.healthLabel.font.color = Color.Red
        }
    }
}