(function(){
	/**
	 * Creates an instance of a Cube animation
	 * @class
	 * @name Cube
	 * @param x {Number} width of cube
	 * @param y {Number} depth of cube
	 * @param z {Number} height of cube
	 */
	function Cube(x, y, z){
		if(Math.max(x, y, z) > 32){
			throw new Error('Maximum cube dimension is 32');
		}

		this.size   = {x:x, y:y, z:z};
		this.frames = [ new cubeFrame(this) ];
		this.frame  = 0;
	}

	/** @private */
	function getFrame(ix, cloneFrom){
		ix = 0|(ix < 0 ? 0 : ix);

		this.frame = ix;
		return (cloneFrom
			? this.frames[ix] = new cubeFrame(cloneFrom)
			: this.frames[ix] || (this.frames[ix] = new cubeFrame(this))
		);
	}

	Cube.prototype = {
		/**
		 * Sets the cube to a specific frame number
		 * @param {Number} frameNumber
		 */
		getFrame : function(ix){
			return getFrame.call(this, ix);
		},

		/**
		 * Sets the cube to the next frame of animation.
		 * Will automatically create new frames as necessary.
		 * @param {Boolean} [duplicateCurrent=false] Duplicate the current frame when creating the next one.  If false, creates empty frames when necessary.
		 */
		nextFrame : function(duplicateCurrent){ return getFrame.call(this, this.frame + 1, duplicateCurrent && this.frames[this.frame]); },

		/**
		 * Sets the cube to the previous frame of animation.
		 * Will automatically create new frames as necessary.
		 * @param {Boolean} [duplicateCurrent=false] Duplicate the current frame when creating a previous one.  If false, creates empty frames when necessary.
		 */
		prevFrame : function(duplicateCurrent){ return getFrame.call(this, this.frame - 1, duplicateCurrent && this.frames[this.frame]); }
	}


	/** @private */
	function cubeFrame(cloneFrom /* or cubeObject */){
		this.cube = [];

		if(cloneFrom instanceof cubeFrame){
			this.cubeObject = cloneFrom.cubeObject;
			this.size       = this.cubeObject.size;

			for(var z=0; z<this.size.z; z++){
				this.cube[z] = [];
				for(var y=0; y<this.size.y; y++){
					this.cube[z][y] = cloneFrom.cube[z][y];
				}
			}
		}else{
			this.cubeObject = cloneFrom;
			this.size       = this.cubeObject.size;
			this.fill(0);
		}
	}

	/** @private */
	function writePlaneZ(z, val){
		if(z<0 || z>=this.size.z){ return; }

		for(var y=0; y<this.size.y; y++){
			this.cube[z][y] = val ? 0xFFFFFFFF : 0;
		}
	}

	/** @private */
	function writePlaneY(y, val){
		if(y<0 || y>=this.size.y){ return; }

		for(var z=0; z<this.size.z; z++){
			this.cube[z][y] = val ? 0xFFFFFFFF : 0;
		}
	}

	/** @private */
	function writePlaneX(x, val){
		if(x<0 || x>=this.size.x){ return; }

		for (var z=0; z<this.size.z; z++){
			for (var y=0; y<this.size.y; y++){
				val
					? this.cube[z][y] |= (1 << x)
					: this.cube[z][y] &= ~(1 << x);
			}
		}
	}

	cubeFrame.prototype =

	/** @lends Cube.prototype */
	{
		/** @private */
		inRange : function(x, y, z){
			return !(x<0 || x>=this.size.x || y<0 || y>=this.size.y || z<0 || z>=this.size.z);
		},

		/**
		 * Sets a specific LED to ON state
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} z
		 */
		setVoxel : function(x, y, z){
			if(this.inRange(x, y, z)){
				this.cube[z][y] |= 1 << x;
			}

			return this;
		},

		/**
		 * Sets a specific LED to OFF state
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} z
		 */
		clearVoxel : function(x, y, z){
			if(this.inRange(x, y, z)){
				this.cube[z][y] &= ~(1 << x);
			}

			return this;
		},

		/**
		 * Toggles a specific LED (on-->off, off-->on)
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} z
		 */
		flipVoxel : function(x, y, z){
			if(this.inRange(x, y, z)){
				this.cube[z][y] ^= (1 << x);
			}
		},

		/**
		 * Gets the state of a specific LED
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} z
		 * @returns {Bool} on/off
		 */
		getVoxel : function(x, y, z){
			if(!this.inRange(x, y, z)){ return 0; }

			return (this.cube[z][y] & (1 << x) ? 1 : 0);
		},

		/**
		 * Combines the functionality of setVoxel and clearVoxel for when an alternate syntax is needed
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} z
		 * @param {Boolean} state
		 */
		alterVoxel : function(x, y, z, val){
			return this[val ? 'setVoxel' : 'clearVoxel'](x, y, z);
		},

		/**
		 * Turns an entire Z-Plane on
		 * @param {Number} Z-plane
		 */
		setPlaneZ : function(z){
			writePlaneZ.call(this, z, 1);

			return this;
		},

		/**
		 * Turns an entire Z-Plane off
		 * @param {Number} Z-plane
		 */
		clearPlaneZ : function(z){
			writePlaneZ.call(this, z, 0);

			return this;
		},

		/**
		 * Turns an entire X-Plane on
		 * @param {Number} X-plane
		 */
		setPlaneX : function(x){
			writePlaneX.call(this, x, 1);

			return this;
		},

		/**
		 * Turns an entire X-Plane off
		 * @param {Number} X-plane
		 */
		clearPlaneX : function(x){
			writePlaneX.call(this, x, 0);

			return this;
		},

		/**
		 * Turns an entire Y-Plane on
		 * @param {Number} Y-plane
		 */
		setPlaneY : function(y){
			writePlaneY.call(this, y, 1);

			return this;
		},

		/**
		 * Turns an entire Y-Plane off
		 * @param {Number} Y-plane
		 */
		clearPlaneY : function(y){
			writePlaneY.call(this, y, 0);

			return this;
		},

		/**
		 * Turns a plane on in any dimension
		 * @param {String} (x|y|z) axis
		 * @param {Number} plane
		 */
		setPlane : function(axis, plane){
			switch(axis){
				case 'x' : writePlaneX.call(this, num, 1); break;
				case 'y' : writePlaneY.call(this, num, 1); break;
				case 'z' : writePlaneZ.call(this, num, 1); break;
			}

			return this;
		},

		/**
		 * Turns a plane off in any dimension
		 * @param {String} (x|y|z) axis
		 * @param {Number} plane
		 */
		clearPlane : function(axis, plane){
			switch(axis){
				case 'x' : clearPlaneX.call(this, num, 0); break;
				case 'y' : clearPlaneY.call(this, num, 0); break;
				case 'z' : clearPlaneZ.call(this, num, 0); break;
			}

			return this;
		},

		/**
		 * Fills each [z][y] line of a cube with a given pattern.
		 * @param {Bytes} [pattern=0x00]
		 */
		fill : function(pattern){
			pattern || (pattern = 0);

			for(var z=0; z<this.size.z; z++){
				this.cube[z] || (this.cube[z] = []);
				for(var y=0; y<this.size.y; y++){
					this.cube[z][y] = pattern;
				}
			}

			return this;
		},

		/**
		 * Draws a line through the cube between any two points in 3D space
		 * @param {Number} x1
		 * @param {Number} y1
		 * @param {Number} z1
		 * @param {Number} x2
		 * @param {Number} y2
		 * @param {Number} z2
		 */
		drawLine : function(x1, y1, z1, x2, y2, z2){
			var xy, xz, x, y, z, tmp;

			// We always want to draw the line from x=0 to x=..31.
			// If x1 is bigget than x2, we need to flip all the values.
			if(x1 > x2){
				tmp = x1; x1 = x2; x2 = tmp;
				tmp = y1; y1 = y2; y2 = tmp;
				tmp = z1; z1 = z2; z2 = tmp;
			}

			xy = (y1 > y2) ? (y1-y2)/(x2-x1) : (y2-y1)/(x2-x1);
			xz = (z1 > z2) ? (z1-z2)/(x2-x1) : (z2-z1)/(x2-x1);

			// For each step of x, y increments by:
			for (x = x1; x<=x2; x++){
				y = (xy*(x-x1))+y1;
				z = (xz*(x-x1))+z1;

				this.setVoxel(0|x, 0|y, 0|z);
			}

			return this;
		},

		/**
		 * Shifts the contents of a cube along an axis.  Useful for effects like rain or bringing text/etc from one side of the cube to another
		 * @param {String} (x|y|z)
		 * @param {Number} amount positive or negative.  Usually 1 or -1.
		 */
		shift : function(axis, amt){
			var order = {
				'x' : ['y', 'z', 'x'],
				'y' : ['x', 'z', 'y'],
				'z' : ['x', 'y', 'z']
			}[axis],
			    l1 = this.size[order[0]],
			    l2 = this.size[order[1]],
			    l3 = this.size[order[2]],

			   dir = amt < 0 ? -1 : 1,

			    a, b, c, i, ii, iii, state;

			for(a=0; a<l3; a++){
				ii  = dir == -1 ? a : l3 - a + amt;
				iii = ii - amt;

				for(b=0; b<l1; b++){
					for(c=0; c<l2; c++){
						switch(axis){
							case 'x': state = this.getVoxel(iii, c, b); this.alterVoxel(ii, c, b, state); break;
							case 'y': state = this.getVoxel(b, iii, c); this.alterVoxel(b, ii, c, state); break;
							case 'z': state = this.getVoxel(b, c, iii); this.alterVoxel(b, c, ii, state); break;
						}
					}
				}
			}

			i = dir == -1 ? l3 : 0;

			for(var a=0, ii=Math.abs(dir); a<ii; a++){
				iii = i+a*dir;
				for(b=0; b<l1; b++){
					for(c=0; c<l2; c++){
						switch(axis){
							case 'x': this.clearVoxel(b, c, iii); break;
							case 'y': this.clearVoxel(b, iii, c); break;
							case 'z': this.clearVoxel(iii, c, b); break;
						}
					}
				}
			}

			return this;
		}
	};

	var proto = cubeFrame.prototype;
	for(var func in proto){
		Cube.prototype[func] = (function(func){
			return function(){
				var frame = this.frames[this.frame],
				      ret = this.frames[this.frame][func].apply(frame, arguments);

				return ret===frame ? this : ret;
			};
		})(func);
	}


	window.Cube = Cube;
})()