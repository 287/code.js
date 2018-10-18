//#!py
/**
 * @require fs
 * @param {string} path
 * @param {function} cb({error|null} err)
 * @return {undefined}
 */
function isFileAsync(path, cb)
	fs.stat(path, (err, stats)=>{
		if err
			cb(err)
		else
			cb(null, stats.isFile())
	})