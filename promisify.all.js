/**
 * @include promisify
 * @param {object} o
 * @param {boolean} [cover = false]
 * @return {object}
 */
promisify.all = function(o, cover){
	var aliasKey = cover ? '' : 'Async';
	for(var key in o){
		if(o.hasOwnProperty(key) && typeof o[key] === 'function'){
			o[key + aliasKey] = promisify(o[key]);
		}
	}
	return o;
};