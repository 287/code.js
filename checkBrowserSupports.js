/**
 * @include toCapitalize, isSupportCanvas, isSupportEs6, isSupportSvg, isSupportWebgl
 * @return {array}
 */
function checkBrowserSupports(list){
	var rs = {};
	var methods = {};
	[isSupportCanvas, isSupportEs6, isSupportSvg, isSupportWebgl].forEach(function(method){
		methods[method.name.slice(9).toLocaleLowerCase()] = method;
	});
	list.forEach(function(name){
		var method = methods[name.toLocaleLowerCase()];
		rs[name] = typeof method === 'function' ? method() : null;
	});
	return rs;
}