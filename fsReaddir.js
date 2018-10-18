/**
 * @include pipeAsync, toUnixPath, eachAsync, isFunction
 * @require fs
 * @param {string} dir
 * @param {boolean} [withStat = false]
 * @param {function} cb({error|null} err, {false|array<string>} rs)
 */
function fsReaddir(dir, withStat, cb){
	if(isFunction(withStat)){
		cb = withStat;
		withStat = false;
	}
	pipeAsync(
		next => fs.readdir(dir, next),
		(next, filenames)=>{
			dir = toUnixPath(dir, 1);
			let files = []
			eachAsync(
				filenames,
				(next, file, i)=> {
					let path = dir + file;
					fs.stat(path, (err, stat)=> {
						if(err){
							if(err.code === 'ENOENT'){//* not exists
								file = '';
								err = null;
							}
						}else{
							file += stat.isDirectory() ? '/' : '';
							if(withStat){
								file = [file, stat];
							}
						}
						files[i] = file;
						next(err);
					});
				},
				10,
				(err)=> next(err, files)
			);
		},
		cb
	);
}