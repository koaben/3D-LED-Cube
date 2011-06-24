(function(){
	var camera, scene, renderer, geometry, material, mesh,
	    mouseX=0, mouseY=0,
	          w = window.innerWidth - 220,
	          h = window.innerHeight;

	CUBE.LEDs = [];

	init();
	animate();

	function init() {
		   camera = new THREE.Camera( 75, w / h, 1, 10000 ),
		    scene = new THREE.Scene();

		// set up camera position
		camera = new THREE.Camera( 45, window.innerWidth / window.innerHeight, 1, 3000 );
		camera.position.x = 200;
		camera.position.y = 100;
		camera.position.z = 200;

	    renderer = new THREE.WebGLRenderer( { clearAlpha: 1 } );
	    renderer.setSize( w, h );

		// initialize the LED cube
		for(var x=0; x<CUBE.size[0]; x++){
			CUBE.LEDs[x] = [];
			for(var y=0; y<CUBE.size[1]; y++){
				CUBE.LEDs[x][y] = [];
				for(var z=0; z<CUBE.size[2]; z++){
					CUBE.LEDs[x][y][z] = new LED(x, y, z)
				}
			}
		}
		scene.addObject( CUBE.getLEDParticleSystem() );

		var light = new THREE.DirectionalLight( 0xffffff );
		light.position.x = 0;
		light.position.y = 0;
		light.position.z = 1;
		scene.addLight( light );

	    document.body.appendChild( renderer.domElement );
	}

	function animate() {
	    requestAnimationFrame( animate );
	    render();
	}

	function render() {
		// spin the camera
		var timer = +new Date() * 0.0001;

		camera.position.z = 1000;
		camera.position.y = 1000 + -mouseY + Math.cos( timer ) * 300;
		camera.position.x = 500 + -mouseX + Math.sin( timer ) * 300;

	    renderer.render( scene, camera );

	}


	document.body.addEventListener('mousemove', function( event ) {
		mouseX = event.clientX - w/2;
		mouseY = event.clientY - h/2;
	});
	
	window.addEventListener('resize', function(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});

	// navivation menu
	var nav = document.getElementById('navigation');

	document.body.addEventListener('mousemove', bodyMouseMove);
	function bodyMouseMove(ev){
		nav.style.display = 'block';
	}
})();