var animations = {
	animations : [],

	load : function(){
		for(var i=0, l=arguments.length; i<l; i++){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', '../animations/' + arguments[i] + '.js', false);
			xhr.send();
			this.animations.push((new Function('return ' + xhr.responseText))());
		}

		return this;
	},

	setDimensions : function(x, y, z){
		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	},

	init : function(){
		var spacing = 50,
		       cube = document.getElementById('cube'),
		        nav = document.getElementById('navigation'),
		    x, y, z, layer, row, point, randLI;

		this.points = [];

		// create all of the LEDs
		for(z=0; z<this.z; z++){
			layer = [];
			for(x=0; x<this.x; x++){
				row = [];
				for(y=0; y<this.y; y++){
					point               = document.createElement('DIV');
					point.className     = 'LED';
					point.style.cssText = '-webkit-transform: translate3d(' + (spacing * y) + 'px, ' + (spacing * (this.z-z-1)) + 'px, ' + (spacing * x) + 'px)';

					point.appendChild(document.createElement('DIV'));

					cube.appendChild(point);

					row.push(point);
				}
				layer.push(row);
			}
			this.points.push(layer);
		}

		// create the navigation
		for(var i=0, l=this.animations.length; i<l; i++){
			nav.appendChild(this.createLI(this.animations[i]));
		}

		nav.appendChild(randLI = this.createLI({ name: 'Random' }, true));

		this.selectAnimation({ name: 'Random' });
	},

	createLI : function(anim, checked){
		var self = this,
		    li, radio;

		li    = document.createElement('li');
		radio = document.createElement('input');
		radio.type = 'radio';
		radio.name = 'animation';
		radio.addEventListener('click', function(){ self.selectAnimation(anim); });
		radio.checked = true;

		li.appendChild(radio);
		li.appendChild(document.createTextNode(anim.name));

		return li;
	},

	selectAnimation : function(anim){
		this.__currentAnimation = anim;

		if(anim.name == 'Random'){ anim = this.animations[0|Math.random() * this.animations.length]; }

		this.currentAnimation = anim;
		this.stopAnimation();
		this.startAnimation();
	},

	startAnimation : function(){
		var self = this;
		this.cube = new Cube(this.x, this.y, this.z);

		this.currentAnimation.getAnimation(this.cube);
		this.cube.getFrame(0);

		this.interval = setInterval(function(){ self.nextFrame(); }, this.currentAnimation.refresh);
	},

	stopAnimation : function(){
		this.interval && clearInterval(this.interval);
	},

	nextFrame : function(){
		if(this.cube.frame == this.cube.frames.length - 1){
			this.selectAnimation(this.__currentAnimation);
			return;
		}

		for(var x=0; x<this.x; x++){
			for(var y=0; y<this.y; y++){
				for(var z=0; z<this.z; z++){
					this.points[z][x][y].className = 'LED' + (this.cube.getVoxel(x, y, z) ? ' on' : '');
				}
			}
		}

		this.cube.nextFrame();
	}
};