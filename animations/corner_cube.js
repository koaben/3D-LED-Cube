{
	name    : 'Corner Cube',
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
		  maxFrame = 16 * Math.max(x, y, z),
		    frame, level, row, i, j, Z, X, Y, nDrops, sFrame;

		// create enough frames for one animation from each corner
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

		for(i=0; i<8; i++){
		}

		return frames;
	}
}