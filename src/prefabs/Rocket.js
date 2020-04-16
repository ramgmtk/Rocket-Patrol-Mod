// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, fire, left, right, player) {
        super(scene, x, y, texture, frame);
        this.fireKey = fire;
        this.leftKey = left;
        this.rightKey = right;
        this.p1flag = player;

        scene.add.existing(this); // add object to existing scene
        this.isFiring = false; //track rockets firing status
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    fetchLowerBound() {
        if (this.p1flag) return 431;
        return 110;
    }
    
    update() {
        //left/right movement
        if(!this.isFiring) {
            if(this.leftKey.isDown && this.x >= 47) { //cannot go beyond border
                this.x -= 2; //2 represent rocket speed
            } else if (this.rightKey.isDown && this.x <= 578) { //598 is too big
                this.x += 2;
            }
         }
        //fire button
        if (Phaser.Input.Keyboard.JustDown(this.fireKey)) { //just down waits till player takes finger off button
            this.isFiring = true;
            if (this.y == this.fetchLowerBound()) {
                this.sfxRocket.play();
            }
        }
        //if fire, vmoed up
        if (this.p1flag) {
            if (this.isFiring && this.y >= 108) {
                this.y -= 2;
            }
            //reset on miss
            if (this.y < 108) {
                this.reset();
            }
        }
        else {
            if (this.isFiring && this.y <= 431) {
                this.y += 2;
            }
            //reset on miss
            if (this.y > 431) {
                this.reset();
            }
        }
    }

    //reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = this.fetchLowerBound();
    }
}