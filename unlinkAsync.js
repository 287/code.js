//#!py
/**
 * @require fs
 * @param {string} path
 * @param {function} cb({error|null} err)
 * @return {undefined}
 */
function unlinkAsync(path, cb)
	fs.unlink(path, (err, stats)=>{
		if err && err.code === 'ENOENT'
			err = null
		cb(err)
	})