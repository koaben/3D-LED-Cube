(function(){
	window.ledMaterialOn  = new THREE.ParticleBasicMaterial( { map: new THREE.Texture( generateSprite( 1 ) ), blending: THREE.AdditiveBlending } );
	window.ledMaterialOff = new THREE.ParticleBasicMaterial( { map: new THREE.Texture( generateSprite( 2 ) ), blending: THREE.AdditiveBlending } );

	// generate a blue-ish LED
	function generateSprite( which ) {
		var canvas    = document.createElement( 'canvas' );
		canvas.width  = 16;
		canvas.height = 16;

		var context  = canvas.getContext( '2d' );
		var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

		switch(which){
			case 1:
				gradient.addColorStop( 0,   'rgba(255,255,255,1)' );
				gradient.addColorStop( 0.2, 'rgba(0,128,255,1)'   );
				gradient.addColorStop( 0.4, 'rgba(0,0,64,1)'      );
				gradient.addColorStop( 1,   'rgba(0,0,0,1)'       );

				break;

			case 2:
				gradient.addColorStop( 0,   'rgba(50,50,50,1)' );
				gradient.addColorStop( 0.2, 'rgba(0,30,50,1)'  );
				gradient.addColorStop( 0.4, 'rgba(0,0,10,1)'   );
				gradient.addColorStop( 1,   'rgba(0,0,0,1)'    );

				break;
		}

		context.fillStyle = gradient;
		context.fillRect( 0, 0, canvas.width, canvas.height );

		return canvas;
	}
})();