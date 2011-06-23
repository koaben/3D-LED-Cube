var serialport = require("serialport"),
    SerialPort = serialport.SerialPort,

            sp = new SerialPort("/dev/tty.usbmodemfa141", { baudrate : 115200 });


var arduino = require('arduino'),
      board = arduino.connect('/dev/tty.usbmodemfa141', {
		baudrate : 115200
	});
	board.sp.on('data', function(buffer){ console.log(buffer.toString()); });


var red = 11, green = 9, blue=10;

board.analogWrite(red  , 255);
board.analogWrite(green, 255);
board.analogWrite(blue , 0  );

(function loop(){
	var r=255, g=255, b=0, step=0, it=0

	switch(step){
		case 0: board.analogWrite(red,   255-it); break;
		case 1: board.analogWrite(blue,  it    ); break;
		case 2: board.analogWrite(green, 255-it); break;
		case 3: board.analogWrite(red,   it    ); break;
		case 4: board.analogWrite(blue,  255-it); break;
		case 5: board.analogWrite(green, it    ); break;
	}

	if(++it == 255){
		step = (++step)%6;
		it   = 0;
	}
})();



function writeColor(r, g, b){
	r > 0 ? board.analogWrite(red  , 255-r) : board.digitalWrite(red  , 1);
	g > 0 ? board.analogWrite(green, 255-g) : board.digitalWrite(green, 1);
	b > 0 ? board.analogWrite(blue , 255-b) : board.digitalWrite(blue , 1);
}

function writeHexColor(color){
	writeColor(parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16));
	setTimeout(function(){ writeColor(parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)) }, 10);
	setTimeout(function(){ writeColor(parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)) }, 20);
	setTimeout(function(){ writeColor(parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)) }, 200);
}


setTimeout(function(){
	board.pinMode(red, arduino.OUTPUT);
	board.analogWrite(red, 128);
}, 100);

// setTimeout is because board.pinMode does not seem to immediately work, so we just delay it a little bit
setTimeout(function(){
	board.pinMode(13, 1);
	board.digitalWrite(13, 1);
}, 100);

var step = -1, interval = setInterval(function(){ board.digitalWrite(13, (step = -step) == 1 ? 1 : 0); }, 250);