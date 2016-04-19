var clone = function(o){
	var clone = function(o){
		var type = Object.prototype.toString.call(o).match(/ ([^\]]+)/)[1].toLowerCase();
		if(['number', 'string', 'boolean', 'null', 'undefined', 'regexp'].indexOf(type)>-1){
			return o;
		}else if(type=='array'){
			var t = []
			for(var i=0, l=o.length; i<l; i++){
				t.push(clone(o[i]))
			}
			return t
		}else{
			var t = {}
			for(var k in o){
				t[k] = clone(o[k]);
			}
			return t
		}
	}
	return clone(o);
};