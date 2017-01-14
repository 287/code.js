function array2csv(list){
	return array2str(str, ['\r\n', ',']);
}

function csv2array(str){
	return str2array(str, ['\r\n', ',']);
}


function str2array(str, sep){
	var list = []
	;
	str.split(sep[0]).forEach(function(item){
		item = item.split(sep[1]);
		list.push(item);
	});
	
	return list;
}


function array2str(list, sep){
	var rs = []
	;
	list.forEach(function(item, i){
		rs.push(item.join(sep[1]));
	});
	
	return rs.join(sep[0]);
}


function str2map(str, sep){
	var map = {}
	;
	str.split(sep[0]).forEach(function(item){
		var index = item.indexOf(sep[1])
		, list = [item]
		;
		if(index > -1){
			list[0] = item.slice(0, index);
			list[1] = item.slice(index + 1);
		}
		
		list.forEach(function(value, i){
			list[i] = value.replace(/^\s+|\s+$/g, '');
		});
		
		if(list[0] !== ''){
			map[list[0]] = list[1];
		}
	});
	
	return map;
}


function map2str(map, sep){
	var rs = []
	, key
	;
	for(key in map){
		rs.push(key + sep[1] + map[key]);
	}
	
	return rs.join(sep[0]);
}

