import { ScreenElement, Label, Vector, Font, FontUnit, Color } from "excalibur"

export class AmmoUI extends ScreenElement {

    ammoLabel
    currentAmmo = 20

    constructor() {
        super({
            x: 20,
            y: 60,
            z: 100
        })
    }

    /**
     * Maakt het ammo tekstveld aan.
     */
    onInitialize(engine) {
        this.ammoLabel = new Label({
            text: `Ammo: ${this.currentAmmo}`,
            pos: new Vector(0, 0),
            font: new Font({
                family: "Arial",
                size: 32,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.addChild(this.ammoLabel)
    }

    /**
     * Past de ammo tekst aan.
     */
    setAmmo(ammo) {
        this.currentAmmo = ammo

        if (this.ammoLabel) {
            this.ammoLabel.text = `Ammo: ${this.currentAmmo}`
        }
    }
}