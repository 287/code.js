function clone(o){
	return clone(o);
	
	function clone(o){
		var type = Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
		, rs, l, i
		;
		if(['number', 'string', 'boolean', 'null', 'undefined', 'regexp', 'function'].indexOf(type) > -1){
			rs = o;
		}else if(type === 'array'){
			rs = [];
			for(i = 0, l = o.length; i < l; i++){
				rs.push(clone(o[i]));
			}
		}else{
			rs = {};
			for(i in o){
				if(o.hasOwnProperty(i)){
					rs[i] = clone(o[i]);
				}
			}
		}

		return rs;
	}
}