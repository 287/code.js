function animateRun(fn, fps){
	return new AnimateRun(fn, fps);
}

function AnimateRun(fn, fps){
	this.fps(fps);
	this.callback = fn;
	this._timer = null;
	this._lastTime = 0;
	this.time = 0;
	this.start();
}

AnimateRun.prototype.fps = function(fps){
	if(fps == null){
		fps = this._fps;
	}else{
		this._fps = fps;
		this._gap = 1000 / this._fps;
	}
	return fps;
}

AnimateRun.prototype.stop = function(){
	cancelAnimationFrame(this._timer);
	this._timer = null;
}

AnimateRun.prototype.start = function(){
	var self = this;
	
	if(this._timer == null){
		run();
	}
	
	function run(){
		self._loop();
		self._timer = requestAnimationFrame(run);
	}
}

AnimateRun.prototype._loop = function(time){
	var time = new Date().getTime();
	
	if(time - this._lastTime >= this._gap){
		this._lastTime = time - ((time - this._lastTime) % this._gap);
		this.time = time;
		this.callback(this);
	}
}