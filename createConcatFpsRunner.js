/**
 * 按fps合并多次回调
 * @param {number} [fps = 24]
 * @return {ConcatFpsRunner}
 */
function createConcatFpsRunner(fps){
	return new ConcatFpsRunner(fps);
}

class ConcatFpsRunner {
	constructor(fps){
		Object.assign(this, {
			fps: 24,
			context: null,
			
			runner: null,
			
			_interval: 0,
			_timer: 0,
		});
		
		this.setFps(fps);
	}
	
	/**
	 * @include isFunction
	 */
	run(cb){
		if(cb){
			this.runner = cb;
		}
		if(!this._timer){
			this._timer = setTimeout(()=>{
				if(isFunction(this.runner)){
					this.runner.call(this.context);
				}
				this.clear();
			}, this._interval);
		}
	}
	
	clear(){
		clearTimeout(this._timer);
		this._timer = null;
		this.runner = null;
	}
	
	setFps(fps){
		fps = fps || 24;
		this.fps = fps;
		this._interval = 1000 / fps;
		return this;
	}
}