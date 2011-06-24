{
	name    : 'Rain',
	refresh : 50, // ms -- maximum refresh = 58fps or 17ms

	getAnimation : function( cube ){
		var maxFrame = 200,
		  minPercent = .01, // percent of cells generating a new drop
		  maxPercent = .1
		        size = cube.size.x * cube.size.y,
		
		     minSize = minPercent * size,
		     rndMult = (maxPercent - minPercent) * size;

		for(var i=0; i<maxFrame; i++){
			for(var j=0, m=minSize + Math.random() * rndMult; j<m; j++){
				cube.setVoxel(
					0|Math.random() * cube.size.x,
					0|Math.random() * cube.size.y,
					cube.size.z-1
				);
			}

			cube.nextFrame(true);
			cube.shift('z', -1); // move everything in the next frame down 1
		}
	}
}