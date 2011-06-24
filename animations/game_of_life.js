{
	name    : 'Game of Life',
	refresh : 200, // ms -- maximum refresh = 58fps or 17ms

/* A dead cell becomes alive if it has exactly 4 neighbors
 * A live cell with 4 neighbors live
 * A live cell with 3 or fewer neighbors die
 * A live cell with 5 or more neighbors die
 */

	getAnimation : function( cube ){
		var maxFrames = 200,
		       toLive = Math.max(Math.min(0|(cube.size.x * cube.size.y * cube.size.z) / 10, 20), (cube.size.x * cube.size.y * cube.size.z) * .75),
		            R = [4, 4,   3, 4];
		/*               ^  ^    ^  ^
		 *               |  |    |  |
		 *               |  |    +--+-- Killed
		 *               |  |
		 *               +--+-- Born
		 */

		// seed cube with "live" cells
		while(toLive){
			var x = 0|Math.random() * cube.size.x,
			    y = 0|Math.random() * cube.size.y,
			    z = 0|Math.random() * cube.size.z;

			if(!cube.getVoxel(x, y, z)){
				cube.setVoxel(x, y, z);
				toLive--;
			}
		}

		for(var i=0; i<maxFrames; i++){
		    var toggled = 0;

			for(var x=0; x<cube.size.x; x++){
				for(var y=0; y<cube.size.y; y++){
					outer:for(var z=0; z<cube.size.z; z++){

						// count neighboring cells
						var isAlive = cube.getVoxel(x, y, z),
						  neighbors = 0;

						for(var xo=-1; xo<=1; xo++){
							for(var yo=-1; yo<=1; yo++){
								for(var zo=-1; zo<=1; zo++){
									if((xo==0) && (yo==0) && (zo==0)){ continue; }
									neighbors += cube.getVoxel(x+xo, y+yo, z+zo);
									
									if(isAlive && (neighbors > R[3])){
										toggled++;
										cube.clearVoxel(x, y, z);
										continue outer;
									}
								}
							}
						}
						if(!isAlive && (neighbors >= R[0]) && (neighbors <= R[1])){
							toggled++;
							cube.setVoxel(x, y, z);
						}
						if(isAlive && (neighbors < R[3])){
							toggled++;
							cube.clearVoxel(x, y, z);
						}
					}
				}
			}

			if(!toggled){ break; }
			cube.nextFrame(true);
		}
	}
}