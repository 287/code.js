/**
 * @include emptyObject
 */
function clearRequireCache(id, isWin32){
	var cache = require.cache;
	if(id === undefined){
		emptyObject(cache);
	}else{
		if(isWin32 === undefined && id.slice(1, 2) === ':'){
			isWin32 = true;
		}
		if(isWin32){
			id = id.replace(/\//g, '\\');
		}
		delete cache[id];
	}
}