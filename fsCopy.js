/**
 * copyDir
 * @include fsCopyFile, fsCopyDir
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb({error|null} err, {boolean} rs)
 */
function fsCopy(path, newPath, cb){
	fsCopyFile(path, newPath, (err)=>{
		if(err && err.code === 'EISDIR' && err.syscall === 'read'){
			fsCopyDir(path, newPath, cb);
		}else{
			cb(err);
		}
	});
}