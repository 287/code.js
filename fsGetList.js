/**
 * getList
 * @include isFunction, getType, toUnixPath, eachAsync, fsReaddir
 * @param {string} dir
 * @param {object} [op = {}]
 * @param {boolean} [op.relative = true]
 * @param {string} [op.filter = 'all'] - [all|file|dir]
 * @param {boolean|function} [op.recursive = true] - if recursive is give with function, return true to scan recursive
 * @param {function} cb({error|null} err, {null|array<string>} files)
 */
function fsGetList(dir, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	op = Object.assign({
		relative: true,
		filter: 'all',
		recursive: true,
		withStat: false,
		output: true,
		onreaddir: null,
	}, op);
	
	let filterType = getType(op.filter);
	if(['string', 'function'].indexOf(filterType) === -1){
		filterType = null;
	}else if(filterType === 'string'){
		filterType = ['dir', 'file'].indexOf(op.filter) > -1 ? op.filter : op.filter.charAt(0) === '.' ? 'extname' : null;
	}
	
	function filter(file, filePath, isDir){
		switch(filterType){
		case 'dir':
			return isDir;
		break; case 'file':
			return !isDir;
		break; case 'extname':
			return file.slice(-op.filter.length) === op.filter;
		break; case 'function':
			return op.filter(file, filePath);
		}
		return true;
	}
	
	let prefix = toUnixPath(dir, 1);
	
	eachAsync(
		[''],
		(next, dir, i, dirs)=> {
			fsReaddir(prefix + dir, true, (err, files)=> {
				if(err){
					return next(err);
				}
				if(isFunction(op.onreaddir)){
					op.onreaddir(dir, files);
				}
				let list = [];
				files.forEach(([file, stat])=>{
					let isDir = file.slice(-1) === '/';
					let filePath = dir + file;
					let fileFullPath = prefix + filePath;
					let item = file = op.relative ? filePath : fileFullPath;
					if(op.withStat){
						item = [item, stat];
					}
					if(op.output && filter(file, filePath, isDir)){
						list.push(item);
					}
					
					if(isDir && op.recursive){
						if(!isFunction(op.recursive) || op.recursive(file, filePath)){
							dirs.push(filePath);
						}
					}
				});
				next(null, list);
			});
		},
		(err, rs)=>{
			if(!err){
				rs = op.output ? [].concat(...rs) : [];
			}
			cb(err, rs);
		}
	);
}