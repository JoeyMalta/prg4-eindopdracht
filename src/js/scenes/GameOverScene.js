import {
    Scene,
    Actor,
    Vector
} from "excalibur"

import { Resources } from "../resources.js"

export class GameOverScene extends Scene {

    /**
     * Maakt het game over scherm aan.
     */
    onInitialize(engine) {

        const background = new Actor({
            pos: new Vector(640, 360)
        })

        background.graphics.use(
            Resources.GameOver.toSprite()
        )

        this.add(background)

        const playAgainButton = new Actor({
            x: 640,
            y: 530,
            width: 420,
            height: 100
        })

        playAgainButton.enableCapturePointer = true
        playAgainButton.pointer.useGraphicsBounds = true

        playAgainButton.on("pointerup", () => {
            this.engine.goToScene("level1")
        })

        this.add(playAgainButton)
    }
}