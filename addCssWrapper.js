function addCssWrapper(css, wrapper){
	var map = {}
	, list = []
	, key
	;
	
	list = css.split(/\{|\}/g);
	
	list.forEach(function(str, i){
		if(i % 2 === 0){
			key = wrapper + ' ' + str.replace(/,/g, ', ' + wrapper + ' ');
		}else{
			map[key] = str;
		}
	});
	
	list = [];
	
	for(key in map){
		list.push(key + '{' + map[key] + '}');
	}
	
	return list.join('');
}