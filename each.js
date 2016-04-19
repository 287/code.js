var each = function(o, fn, type){
	if(typeof o!='object' || typeof fn!='function') return false;
	type = type ? (type=='array' ? type : 'object') : (typeof o.length=='number' && o.length>-1 ? 'array' : 'object');
	if(type=='array'){
		for(var i=0, l=o.length; i<l; i++){
			if(fn.call(o, o[i], i)===false) break;
		}
	}else{
		for(var i in o){
			if(!o.hasOwnProperty(i)) continue;
			if(fn.call(o, o[i], i)===false) break;
		}
	}
};