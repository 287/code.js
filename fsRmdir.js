/**
 * rmdir
 * @include pipeAsync, fsEmpty
 * @require fs
 * @param {string} dir
 * @param {function} cb({error|null} err, {boolean} rs)
 */
function fsRmdir(dir, cb){
	pipeAsync(
		(next)=> fsEmpty(dir, next),
		(next)=> fs.rmdir(dir, (err)=>{
			if(err && err.code === 'ENOENT'){//* not exists
				err = null;
			}
			next(err);
		}),
		cb
	);
}