/**
 * Control interaction with the cube itself
 **/
(function(){
	var moveable = document.getElementById('moveable'),
	        cube = document.getElementById('cube'),
	         nav = document.getElementById('navigation'),
	  txtConsole = document.getElementById('console'),
	    dragging = false,
	        rotX = 0,
	        rotY = 0,
	     targetY = 330,
	      rotFPS = 30,
	    dragStart, lastDrag = 0;

	document.body.addEventListener('mousemove', bodyMouseMove);

	moveable.addEventListener('mousedown', mouseDown);
	moveable.addEventListener('mouseup'  , mouseUp  );
	moveable.addEventListener('mousemove', mouseMove);

	function bodyMouseMove(ev){
		nav.style.display = 'block';

		txtConsole.value += ev.pageX + ', ' + ev.pageY + '\n';
	}

	function mouseDown(ev){
		dragging = true;
		dragStart = {
			x : ev.pageX,
			y : ev.pageY
		};
	}

	function mouseUp(ev){
		dragging = false;

		setRotation(
			rotX + ev.pageX - dragStart.x,
			rotY + ev.pageY - dragStart.y,
			true
		);
	}

	function mouseMove(ev){
		if(!dragging){ return; }

		lastDrag = +new Date();

		setRotation(
			rotX + ev.pageX - dragStart.x,
			rotY + ev.pageY - dragStart.y
		);
	}

	function setRotation(rotx, roty, store){
		cube.style.WebkitTransform = 'rotateX(' + roty + 'deg) rotateY(' + rotx + 'deg)';

		var points = animations.points;
		for(var i=0, l=points.length; i<l; i++){
			for(var j=0, m=points[i].length; j<m; j++){
				for(var k=0, n=points[i][j].length; k<n; k++){
					points[i][j][k].children[0].style.WebkitTransform = 'rotateX(' + -roty + 'deg) rotateY(' + -rotx + 'deg)';
				}
			}
		}

		if(store){
			rotX = rotx;
			rotY = roty;
		}
	}

	setInterval(function(){
		if(+new Date() - lastDrag < 5000){ return; }

		var Y = rotY % 365;
		if(Y != targetY){
			(Y < 0) && (Y += 365);
		
			if(targetY > Y){ // rotate up
				Y += (targetY - Y) / 20;
			} else { // rotate down
				Y -= (Y - targetY + 365) / 20;
			}
		
			(Math.abs(targetY - Y) < .2) && (Y = targetY);
		}

		setRotation(rotX + .5, Y, true);
	}, 1000/rotFPS);
})();