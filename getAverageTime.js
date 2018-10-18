function getAverageTime(fn, count){
	var startTime = Date.now();
	for(var i = 0; i < count; i++) fn();
	return (Date.now() - startTime) / count;
}