function ajaxGet(url, fn){
	ajax({
		url: url
		, callback: fn
	});
}