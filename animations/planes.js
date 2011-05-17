{
	name    : 'Vertical Planes',
	refresh : 250, // ms -- maximum refresh = 58fps or 17ms

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
		    frame, aLevel, bit, level, row, i, X, Y, Z;

		/**
		 * The final array will contain 12,288 bytes given an 8x8x8 cube:
		 * 3 loops * 8 frames * 8 levels * 8 rows * columns
		 */

		// loop the entire animation 3 times
		for(i=0; i<3; i++){
			// Create frames where one level is selected in each frame
			for(aLevel=0; aLevel<z; aLevel++){
				frame = [];

				// Create one-frame of the cube by looping each level
				for(Z=0; Z<z; Z++){
					bit = (aLevel == Z) ? 1 : 0;

					level = [];
					for(X=0; X<x; X++){
						row = [];
						for(Y=0; Y<y; Y++){
							row.push(bit);
						}
						level.push(row);
					}
					frame.push(level);
				}
				frames.push(frame);
			}
		}

		return frames;
	}
}