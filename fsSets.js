/**
 * sets
 * @include isArray, isFunction, getObjectKeys, getObjectValues, eachAsync, fsAppend, fsSet
 * @param {array<string>|object<file:content>} files
 * @param {array<string|buffer>} [contents]
 * @param {object} [op = {}]
 * @param {string} [op.dir = ''] 
 * @param {boolean} [op.append = false]
 * @param {function} cb
 * @return {undefined}
 */
function fsSets(files, contents, op, cb){
	if(!isArray(files)){
		op = contents;
		cb = op;
		contents = getObjectValues(files);
		files = getObjectKeys(files);
	}
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	op = Object.assign({
		append: false,
		dir: '',
	}, op);
	
	eachAsync(
		files,
		(next, file, i)=> {
			let path = op.dir + file;
			let content = contents[i];
			let writeMethod = op.append ? fsAppend : fsSet;
			writeMethod(path, content, next);
		},
		{
			limit: 10
		},
		cb
	);
}