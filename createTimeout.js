function createTimeout(gap){
	var timer;
	var runner = function(cb){
		runner.clear();
		timer = setTimeout(cb, gap);
	};
	runner.clear = function(){
		clearTimeout(timer);
	};
	return runner;
}