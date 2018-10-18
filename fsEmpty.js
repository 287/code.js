/**
 * empty - will empty dir
 * @include toUnixPath, pipeAsync, fsGetList, eachAsync
 * @require fs
 * @param {string} dir - dir path
 * @param {function} cb({error|null} err, {boolean} rs)
 */
function fsEmpty(dir, cb){
	let prefix = toUnixPath(dir, 1);
	pipeAsync(
		(next)=> fsGetList(prefix, {relative: true}, next),
		(next, paths)=> {// get files and dirs
			let files = [];
			let dirs = paths.filter((file)=> file.slice(-1) === '/' ? true : !files.push(file));
			eachAsync(
				files, 
				(next, file)=>{
					fs.unlink(prefix + file, (err)=>{
						if(err && err.code === 'ENOENT'){//* not exists
							err = null;
						}
						next(err);
					});
				},
				{
					limit: 10,
				},
				(err)=> next(err, dirs)
			);
		},
		(next, dirs)=>{// remove all dirs
			eachAsync(
				dirs.length, 
				(next, i)=>{
					let dir = dirs[dirs.length - 1 - i];
					console.log(dir)
					fs.rmdir(prefix + dir, (err)=>{
						if(err && err.code === 'ENOENT'){//* not exists
							err = null;
						}
						next(err);
					});
				},
				{
					limit: 1
				},
				next
			);
		},
		cb
	);
}