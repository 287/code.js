/**
 * gets
 * @include isFunction, eachAsync, fsGet
 * @require fs
 * @param {array<string>} files
 * @param {object} [op = {}]
 * @param {string} [op.dir = ''] 
 * @param {string} [op.output = 'array'] - [array|object]
 * @param {string|null} [op.encoding = ''] - [utf8|gbk|''|null]
 * @param {function} cb({error|null} err, {false|array<string|buffer>} rs)
 */
function fsGets(files, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	op = Object.assign({
		encoding: '',
		dir: '',
		output: 'array',
	}, op);
	
	let readFile = fs.readFile;
	eachAsync(
		files,
		(next, file)=>{
			let path = op.dir + file;
			let readFileMethod = op.encoding == null ? readFile : fsGet;
			readFileMethod(path, next);
		},
		{
			limit: 10
		},
		(err, rs)=>{
			if(!err){
				if(op.output === 'object'){
					let data = {};
					rs.forEach((content, i)=>{
						data[files[i]] = content;
					});
					rs = data;
				}
			}
			cb(err, rs);
		}
	);
}