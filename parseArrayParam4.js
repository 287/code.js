function parseArrayParam4(value){
	var rs = [0, 0, 0, 0];
	if(typeof value === 'number'){
		rs = [value, value, value, value];
	}else if(value && value.constructor === Array){
		switch(value.length){
			case 1:
				rs = [value[0], value[0], value[0], value[0]];
			break; case 2:
				rs = [value[0], value[1], value[0], value[1]];
			break; case 3:
				rs = [value[0], value[1], value[2], value[1]];
			break; case 4:
				rs = value;
		}
	}
	return rs;
}