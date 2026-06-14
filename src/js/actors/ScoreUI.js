import { ScreenElement, Label, Vector, Font, FontUnit, Color } from "excalibur"

export class ScoreUI extends ScreenElement {

    scoreLabel
    highscoreLabel

    currentScore = 0
    currentHighscore = 0

    constructor() {
        super({
            x: 0,
            y: 0,
            z: 100
        })
    }

    onInitialize(engine) {

        this.scoreLabel = new Label({
            text: `Score: ${this.currentScore}`,
            pos: new Vector(20, 20),
            font: new Font({
                family: "Arial",
                size: 32,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.highscoreLabel = new Label({
            text: `Highscore: ${this.currentHighscore}`,
            pos: new Vector(engine.drawWidth - 260, 20),
            font: new Font({
                family: "Arial",
                size: 32,
                unit: FontUnit.Px,
                color: Color.Yellow
            })
        })

        this.addChild(this.scoreLabel)
        this.addChild(this.highscoreLabel)
    }

    setScore(score) {
        this.currentScore = score

        if (this.scoreLabel) {
            this.scoreLabel.text = `Score: ${this.currentScore}`
        }
    }

    setHighscore(highscore) {
        this.currentHighscore = highscore

        if (this.highscoreLabel) {
            this.highscoreLabel.text = `Highscore: ${this.currentHighscore}`
        }
    }
}