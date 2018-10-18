/**
 * 合并多次回调
 * @param {number} [gap = 16] - 毫秒
 * @return {function}
 */
function concatInterval(interval){
	interval = interval || 16;
	var timer;
	var lastTime = 0;
	var runner = function(cb){
		var time = new Date().getTime();
		runner.clear();
		if(time - lastTime > interval){
			timer = setTimeout(cb, 0);
			lastTime = time;
		}else{
			timer = setTimeout(cb, interval);
		}
	};
	runner.clear = function(){
		clearTimeout(timer);
	};
	return runner;
}