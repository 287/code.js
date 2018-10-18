/**
 * @require fs
 * @include isFunction
 * @param {string} path
 * @param {object} [op = {}]
 * @param {null|any} [op.encoding = 'utf8'] - null or non null - null: buffer, non null: uft8
 * @param {boolean} [op.ignoreENOENT = false] - if true and file not exists ignore error and return undefined
 * @param {function} cb
 * @return {undefined}
 */
function fsGet(path, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	op = op || {};
	fs.readFile(path, (err, content)=>{
		if(err){
			if(err.code === 'ENOENT' && op.ignoreENOENT){
				err = null;
			}
		}else if(op.encoding !== null){
			content = content.toString();
		}
		cb(err, content);
	});
}