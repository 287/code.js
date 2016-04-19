var ajaxGet = function(url, fn){
	ajax({
		url: url
		, callback: fn
	});
}