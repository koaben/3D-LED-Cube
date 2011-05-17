/**
 * Control interaction with the cube itself
 **/
(function(){
	var moveable = document.getElementById('moveable'),
	        cube = document.getElementById('cube'),
	    dragging = false,
	    dragStart;

	moveable.addEventListener('mousedown', mouseDown);
	moveable.addEventListener('mouseup'  , mouseUp  );
	moveable.addEventListener('mousemove', mouseMove);

	function mouseDown(ev){
		dragging = true;
		dragStart = {
			x : ev.pageX,
			y : ev.pageY
		};
	}

	function mouseUp(ev){
		dragging = false;
	}

	function mouseMove(ev){
		if(!dragging){ return; }

		var rotX = ev.pageX - dragStart.x,
		    rotY = ev.pageY - dragStart.y;

		cube.style.WebkitTransform = 'rotateX(' + rotY + 'deg) rotateY(' + rotX + 'deg)';

		var points = animations.points;
		for(var i=0, l=points.length; i<l; i++){
			for(var j=0, m=points[i].length; j<m; j++){
				for(var k=0, n=points[i][j].length; k<n; k++){
					points[i][j][k].children[0].style.WebkitTransform = 'rotateX(' + -rotY + 'deg) rotateY(' + -rotX + 'deg)';
				}
			}
		}
	}
})();