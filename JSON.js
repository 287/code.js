window.JSON = window.JSON || {
	stringify: function(s){
		return console.error('JSON.stringify error: no this function') || '';
	}
	, parse: function(s){
		return eval('(' + s + ')');
	}
};