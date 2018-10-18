/**
 * @include isFunction, fsGet
 * @param {string} path
 * @param {object} [op = {}]
 * @param {boolean} [op.ignoreENOENT = false] - if true and file not exists ignore error and return undefined
 * @param {function} cb
 * @return {undefined}
 */
function fsGetJson(path, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	
	fsGet(path, op, (err, rs)=>{
		if(rs !== undefined){
			if(rs.length){
				rs = JSON.parse(rs);
			}else{
				rs = null;
			}
		}
		cb(err, rs);
	});
}