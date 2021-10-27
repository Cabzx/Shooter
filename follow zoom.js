"use strict";

var crosshair = ["crosshair-shotgun", "crosshair-pistol", "crosshair-machinegun"]
var keyA;
var keyS;
var keyD;
var keyW;
var keyQ;

class Example extends Phaser.Scene
{ 
    constructor ()
    {
        super();
    }

    preload () 
    {
        this.load.image('map', 'assets/maps/earthbound-scarab.png');
        this.load.image('crosshair-shotgun', 'assets/sprites/crosshairs/Shotgun.png');
        this.load.image('crosshair-machinegun', 'assets/sprites/crosshairs/MachineGun.png');
        this.load.image('crosshair-pistol', 'assets/sprites/crosshairs/Pistol.png');

    }

    create () 
    {
        // set bounds of the camera to equal the size of the map.
        this.cameras.main.setBounds(0, 0, 1024, 2048);
        
        // adds the map. Use setOrigin(0) to ensure that the map looks well.
        this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);
    
        // add the cursor keys to the document.
        this.cursors = this.input.keyboard.createCursorKeys();

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    
        // add the crosshair.
        this.crosshair = this.physics.add.image(400.5, 301.3, crosshair[1]);
        this.crosshair.scale=0.25;
        // crosshair = this.add.image(400.5, 301.3, 'crosshair');
    
        this.cameras.main.startFollow(this.crosshair, true, 0.09, 0.09);
        this.cameras.main.roundPixels = true;
    
        this.cameras.main.setZoom(4);

        /*Mouse Controls*/
        // Locks pointer on mousedown
        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        // Exit pointer lock when Q or escape (by default) is pressed.
        this.input.keyboard.on("keydown-Q", function (event) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
        }, 0, this);

        // Move crosshair upon locked pointer move
        this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            // Move reticle with mouse
            this.crosshair.x += pointer.movementX;
            this.crosshair.y += pointer.movementY;

            // Constrain muouse inside the window
            if (this.crosshair.x > 1024)
                this.crosshair.x = 1024;
            else if (this.crosshair.x < 0)
                this.crosshair.x = 0;

            if (this.crosshair.y > 2048)
                this.crosshair.y = 2048;
            else if (this.crosshair.y < 0)
                this.crosshair.y = 0;
            }
        }, this);

        
    }

    updateDirect ()
    {
        if (this.cursors.left.isDown || keyA.isDown)
        {
            this.crosshair.setAngle(-90);
            this.crosshair.x -= 2.5;
        }
        else if (this.cursors.right.isDown || keyD.isDown)
        {
            this.crosshair.setAngle(90);
            this.crosshair.x += 2.5;
        }

        if (this.cursors.up.isDown || keyW.isDown)
        {
            this.crosshair.setAngle(0);
            this.crosshair.y -= 2.5;
        }
        else if (this.cursors.down.isDown || keyS.isDown)
        {
            this.crosshair.setAngle(-180);
            this.crosshair.y += 2.5;
        }
    }

    update () 
    {
        this.crosshair.setVelocity(0);

        if (this.cursors.left.isDown || keyA.isDown)
        {
            this.crosshair.setAngle(-90).setVelocityX(-200);
        }
        else if (this.cursors.right.isDown || keyD.isDown)
        {
            this.crosshair.setAngle(90).setVelocityX(200);
        }
    
        if (this.cursors.up.isDown || keyW.isDown)
        {
            this.crosshair.setAngle(0).setVelocityY(-200);
        }
        else if (this.cursors.down.isDown|| keyS.isDown)
        {
            this.crosshair.setAngle(-180).setVelocityY(200);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [ Example ]
};
const game = new Phaser.Game(config);
