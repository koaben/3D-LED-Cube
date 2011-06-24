{
	name    : 'Vertical Planes',
	refresh : 150, // ms -- maximum refresh = 58fps or 17ms

	getAnimation : function( cube ){
		for(var i=0; i<cube.size.z; i++   ){ cube.setPlaneZ(i); cube.nextFrame(); }
		for(var i=cube.size.z-2; i>=0; i--){ cube.setPlaneZ(i); cube.nextFrame(); }

		for(var i=0; i<cube.size.x; i++   ){ cube.setPlaneX(i); cube.nextFrame(); }
		for(var i=cube.size.x-2; i>=0; i--){ cube.setPlaneX(i); cube.nextFrame(); }

		for(var i=0; i<cube.size.y; i++   ){ cube.setPlaneY(i); cube.nextFrame(); }
		for(var i=cube.size.y-2; i>=0; i--){ cube.setPlaneY(i); cube.nextFrame(); }

		return frames;
	}
}