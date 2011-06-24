{
	name    : 'Spinning Line',
	refresh : 50, // ms -- maximum refresh = 58fps or 17ms

	getAnimation : function( cube ){
		var values = [0, 0, 0, 8, 8, 8];

		for(var i=0; i<100; i++){
			values[0|Math.random() * 6] += 0|Math.random()*4-2;
			cube.drawLine.apply(cube, values);

			cube.nextFrame();
		}
	}
}