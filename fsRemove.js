/**
 * remove file or dir
 * @include fsRmdir
 * @require fs
 * @param {string} path
 * @param {function} cb
 */
function fsRemove(path, cb){
	fs.unlink(path, (err)=>{
		if(err){
			if(err.code === 'ENOENT'){
				err = null;
			}else if(err.code === 'EPERM' ){
				return fsRmdir(path, cb);
			}
		}
		cb(err);
	});
}