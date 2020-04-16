// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add object to existing scene
        this.points = pointValue;
        this.bonusSpeed = speed;
    }

    update() {
        //move spaceship left
        this.x = this.x - game.settings.spaceshipSpeed - this.bonusSpeed;
        // wraparound screen bounds
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}