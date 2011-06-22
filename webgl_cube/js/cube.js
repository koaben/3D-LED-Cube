var camera, scene, renderer, geometry, material, mesh;
(function(){
	init();
	animate();

	document.body.addEventListener('mousemove', bodyMouseMove);
	function bodyMouseMove(ev){
		nav.style.display = 'block';

		txtConsole.value += ev.pageX + ', ' + ev.pageY + '\n';
	}

	function init() {
		var     w = window.innerWidth - 200,
		        h = window.innerHeight;

		   camera = new THREE.Camera( 75, w / h, 1, 10000 ),
		    scene = new THREE.Scene();
		 geometry = new THREE.CubeGeometry( 200, 200, 200 );
		 material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

	    camera.position.z = 1000;

	    mesh = new THREE.Mesh( geometry, material );
	    scene.addObject( mesh );

	    renderer = new THREE.CanvasRenderer();
	    renderer.setSize( w, h );

	    document.body.appendChild( renderer.domElement );
	}

	function animate() {

	    // Include examples/js/RequestAnimationFrame.js for cross-browser compatibility.
	    requestAnimationFrame( animate );
	    render();

	}

	function render() {

	    mesh.rotation.x += 0.01;
	    mesh.rotation.y += 0.02;

	    renderer.render( scene, camera );

	}
})();