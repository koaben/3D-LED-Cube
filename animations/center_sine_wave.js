{
	name    : 'Center Sine Wave',
	refresh : 50, // ms -- maximum refresh = 58fps or 17ms

	/**
	 * Animation should return an array of dimensions [N][z][x][y] where:
	 * - Note: z comes first
	 * - N is the number of frames in the animation
	 * - x, y, z are the width, depth and height of the cube respectively
	 * - 0, 0, 0 is the bottom-front-left of the cube
	 * - 7, 7, 7 is the back-top-right of the cube in an 8x8x8 cube
	 *
	 * All values in the array should be 0 or 1 (off/on)
	 **/
	animation : [],

	getAnimation : function(x, y, z){
		if(this.animation.length){ return this.animation; }

		var  frames = [],
		   maxFrame = 10 * (1000 / this.refresh),
		  rippleInt = 1.3,

		    frame, level, row, i, j, Z, X, Y, distance, xD, yD;

		// create 10 seconds of frames, initialize the entire thing to zero
		for(i=0; i<maxFrame; i++){
			frame = [];
			for(Z=0; Z<z; Z++){
				level = [];
				for(X=0; X<x; X++){
					row = [];
					for(Y=0; Y<y; Y++){
						row.push(0);
					}
					level.push(row);
				}
				frame.push(level);
			}
			frames.push(frame);
		}

		for(i=0; i<maxFrame; i++){
			for(X=0; X<x; X++){
				for(Y=0; Y<y; Y++){
					distance = Math.sqrt((X-3.5) * (X-3.5) + (Y-3.5) * (Y-3.5));
					height   = 0|4 + Math.sin(distance/rippleInt + i/4) * 4;

					frames[i][height][X][Y] = 1;
				}
			}
		}

		return this.animation = frames;
	}
}