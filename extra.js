/*Mouse Controls*/
        // Locks pointer on mousedown
        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        // Exit pointer lock when Q or escape (by default) is pressed.
        this.input.keyboard.on('keydown_Q', function (event) {
            if (game.input.mouse.locked)
                game.input.mouse.releasePointerLock();
        }, 0, this);

        // Move crosshair upon locked pointer move
        this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            // Move reticle with mouse
            crosshair.x += pointer.movementX;
            crosshair.y += pointer.movementY;
        }
        }, this);


                    // Constrain muouse inside the window
                    if (reticle.x > 800)
                    reticle.x = 800;
                  else if (reticle.x < -800)
                      reticle.x = -800;
      
                  if (reticle.y > 600)
                      reticle.y = 600;
                  else if (reticle.y < -600)
                      reticle.y = -600;
        