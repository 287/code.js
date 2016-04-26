var dateFormat = function(format, date){
	date = date==null ? new Date() : Object.prototype.toString.call(date)=='[object Date]' ? date : new Date(date);
	var regx = format.indexOf('%')>-1 ? /%([ymdhisw])/gi : /([ymdhisw])/gi;
	var op = {
		y: 'getFullYear'
		, m: 'getMonth'
		, d: 'getDate'
		, h: 'getHours'
		, i: 'getMinutes'
		, s: 'getSeconds'
		, w: 'getDay'
	};
	for(var k in op) op[k] = date[op[k]]();
	op.m++;
	op.w = !op.w ? 7 : op.w;
	for(var k in op){
		var v = op[k];
		op[k.toUpperCase()] = v > 9 ? v.toString() : '0'+ v;
	}
	op.y = op.y.toString().substr(2);
	op.W = ' 一二三四五六日'.charAt(op.w);
	return format.replace(regx, function(t, k){
		return op[k]==null ? k : op[k];
	});
};