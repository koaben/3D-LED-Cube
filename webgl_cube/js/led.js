/*
(function(){
	window.LED = function( x, y, z ){
		THREE.Particle.call( this, ledMaterialOn );

		this.position.x = 100 * (x - 3.5);
		this.position.y = 100 * (y - 3.5);
		this.position.z = 100 * (z - 3.5);

		this.scale.x = this.scale.y = this.scale.z = 4;
	};

	LED.prototype = new THREE.Particle();
	LED.prototype.constructor = LED;

	LED.prototype.turnOn = function(){
		this.materials = [ ledMaterialOn ];
	};

	LED.prototype.turnOff = function(){
		this.materials = [ ledMaterialOff ];
	};
});
//*/


//*
(function(){
	var   cube = new THREE.Geometry(),
	    sprite = THREE.ImageUtils.loadTexture( "externals/three/examples/textures/sprites/ball.png" ),
	        ix = 0,
	   colorOn = new THREE.Color( 0x0000FF ),
	  colorOff = new THREE.Color( 0x111133 ),
	  material = new THREE.ParticleBasicMaterial( { size: 45, map: sprite, vertexColors: true } );

	material.color.setHSV( 0, 0, 1 );

	cube.colors = [];

	window.LED = function( x, y, z ){
		this.ix = ix++;
		cube.vertices.push(
			new THREE.Vertex(
				new THREE.Vector3(
					100 * (x - 3.5),
					100 * (y - 3.5),
					100 * (z - 3.5)
				)
			)
		)

		this.turnOff();
	};

	CUBE.getLEDParticleSystem = function(){
		var ps = new THREE.ParticleSystem( cube, material );

		ps.sortParticles = true;
		ps.updateMatrix();

		return ps;
	};

	window.LED.prototype = {
		turnOn : function(){
			cube.colors[ this.ix ] = colorOn;
			cube.colors[ this.ix ].setHSV( 0.7, 1.0, 1.0 );
		},

		turnOff : function(){
			cube.colors[ this.ix ] = colorOff;
			cube.colors[ this.ix ].setHSV( 0.2, 0.2, 0.2 );
		}
	};
})();
//*/