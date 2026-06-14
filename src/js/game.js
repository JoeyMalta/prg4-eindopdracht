import '../css/style.css'

import { Engine, DisplayMode } from "excalibur"
import { ResourceLoader } from './resources.js'
import { Level1Scene } from './scenes/Level1Scene.js'
import { GameOverScene } from './scenes/GameOverScene.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })

        // Eerst alle afbeeldingen laden, daarna pas de game starten.
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        // Hier maak ik de scenes aan die mijn game gebruikt.
        // Level1 is de gameplay scene en gameover is het scherm na verliezen.
        this.add("level1", new Level1Scene())
        this.add("gameover", new GameOverScene())

        this.goToScene("level1")
    }
}

new Game()