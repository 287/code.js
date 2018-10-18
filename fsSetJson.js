/**
 * @include fsSet
 * @param {string} path
 * @param {object} data
 * @param {function} cb
 * @return {undefined}
 */
function fsSetJson(path, data, cb){
	fsSet(path, JSON.stringify(data), cb);
}