{
	name    : 'Rain',
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
	getAnimation : function(x, y, z){
		var frames = [],
		  maxFrame = 200,
		    frame, level, row, i, j, Z, X, Y, nDrops, sFrame;

		// create 10 seconds of rain & 20fps, 200 frames, initialize the entire thing to zero
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

		// create between 50 and 200 random rain-drops
		nDrops = 0|Math.random() * 150 + 50;
		for(i=0; i<nDrops; i++){
			// start the drop in a random frame, X & Y location
			sFrame = 0|Math.random() * maxFrame;
			     X = 0|Math.random() * x;
			     Y = 0|Math.random() * y;

			// now make the drop "fall" by starting it at Z(max) and ending at Z(0)
			for(j=0; (j<z) && ((sFrame+j)<maxFrame); j++){
				frames[sFrame+j][z-1-j][X][Y] = 1;
			}
		}

		return frames;
	}
}