function dateFormat(format, date){
	var regx = format.indexOf('%') > -1 ? /%([ymdhisw])/gi : /([ymdhisw])/gi
	, op = {}
	;
	
	//* parse date object
	date = date == null ? new Date() : Object.prototype.toString.call(date) === '[object Date]' ? date : new Date(date);
	
	//* format
	return format.replace(regx, function(t, k){
		op[k] = op[k] !== undefined ? op[k] : getDateValue(k, date);
		return op[k];
	});
	
	
	//* get date value method
	function getDateValue(key, date){
		var kMap = {
			y: 'FullYear'
			, m: 'Month'
			, d: 'Date'
			, h: 'Hours'
			, i: 'Minutes'
			, s: 'Seconds'
			, w: 'Day'
		}
		, k = key.toLowerCase()
		, name = 'get' + kMap[k]
		, v = date[name]()
		;
		
		//* parse true value
		switch(k){
			case 'm':
				v++;
			break; case 'w':
				v = v === 0 ? 7 : v;
		}
		
		if(key !== k || key === 'y'){
			switch(key){
				case 'y':
					v = v.toString().substr(2);
				break; case 'W':
					v = ' 一二三四五六日'.charAt(v);
				break; default:
					v = v > 9 ? v : '0' + v;
			}
		}
		
		return v;
	}
}