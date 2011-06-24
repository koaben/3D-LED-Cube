{
	name    : 'Center Sine Wave',
	refresh : 50, // ms -- maximum refresh = 58fps or 17ms

	getAnimation : function( cube ){
		var maxFrame = 10 * (1000 / this.refresh),
		   rippleInt = 1.3;

		for(var i=0; i<maxFrame; i++){
			for(var x=0; x<cube.size.x; x++){
				for(var y=0; y<cube.size.y; y++){
					var distance = Math.sqrt((x-cube.size.x/2+.5) * (x-cube.size.x/2+.5) + (y-cube.size.y/2+.5) * (y-cube.size.y/2+.5)),
					      height = 0|(cube.size.z/2) + Math.sin(distance / rippleInt + i/(cube.size.z/2)) * (cube.size.z/2);

					cube.setVoxel(x, y, height);
				}
			}
			cube.nextFrame();
		}
	}
}