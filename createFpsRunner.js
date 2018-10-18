/**
 * @include isFunction
 * @param {function}cb
 * @param {number} [fps = 24]
 * @return {fpsRunner}
 */
function createFpsRunner(cb, fps){
	return new FpsRunner(cb, fps).start();
}

class FpsRunner{
	constructor(runner, fps){
		this.duration = 0;
		this.time = 0;
		this.times = {
			pending: 0,
			start: 0,
			pause: 0,
			stop: 0,
			timer: null,
			firstTimer: null,
		};
		this.runner = runner;
		this.status = 'pending';
		this._interval = 0;
		this.setFps(fps || 24);
	}
	
	setFps(fps){
		this.fps = Math.min(fps, 60) || 60;
		this._interval = 1000 / fps;
		return this;
	}
	
	_clearTimer(){
		cancelAnimationFrame(this.times.timer);
		clearTimeout(this.times.firstTimer);
	}
	
	pause(){
		if(this.status === 'running'){
			this.status = 'paused';
			this._clearTimer();
			this.times.pause = Date.now();
			isFunction(this.onpause) && this.onpause(this);
		}
		return this;
	}
	
	stop(){
		if(['running', 'paused'].includes(this.status)){
			this.status = 'pending';
			this._clearTimer();
			this.times.stop = Date.now();
			this.times.pending = this.duration = 0;
			isFunction(this.onstop) && this.onstop(this);
		}
		return this;
	}
	
	start(cb){
		if(['pending', 'paused'].includes(this.status) && isFunction(cb = cb || this.runner)){
			const time = Date.now();
			this.time = time;
			if(this.status === 'pending'){
				this.times.start = time;
				this.times.lastRun = time;
			}else{
				let pending = time - this.times.pause;
				this.times.pending += pending;
				this.times.lastRun += pending;
			}
			
			if(this.status === 'pending'){
				this.times.firstTimer = setTimeout(()=> cb(this));
			}
			this.status = 'running';
			
			this._loopRunner(cb);
			isFunction(this.onstart) && this.onstart(this);
		}
		return this;
	}
		
	_loopRunner(cb){
		this.times.timer = requestAnimationFrame(()=> {
			const time = Date.now();
			const timeInterval = time - this.times.lastRun;
			if(timeInterval >= this._interval){
				this.time = time;
				this.times.lastRun = time - (timeInterval % this._interval);
				this.duration = time - this.times.start - this.times.pending;
				cb(this);
			}
			
			this._loopRunner(cb);
		});
	}
}