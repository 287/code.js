/**
 * copyDir
 * @include pipeAsync, fsMkdir, fsGetList, toUnixPath, fsCopyFile, eachAsync
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb({error|null} err, {boolean} rs)
 */
function fsCopyDir(path, newPath, cb){
	pipeAsync(
		(next)=> fsMkdir(newPath, next),
		(next)=> fsGetList(path, {relative: true}, next),
		(next, files)=> {
			if(files.length === 0){
				return next();
			}
			path = toUnixPath(path, 1);
			newPath = toUnixPath(newPath, 1);
			eachAsync(
				files,
				(next, file)=> {
					let filePath = path + file;
					let newFilePath = newPath + file;
					
					if(file.slice(-1) === '/'){
						fsMkdir(newFilePath, next);
					}else{
						fsCopyFile(filePath, newFilePath, next);
					}
				},
				{
					limit: 10
				},
				next
			);
		},
		cb
	);
}