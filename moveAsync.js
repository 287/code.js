//#!py
/**
 * @include renameAsync copyAsync
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb
 */
function moveAsync(path, newPath, cb)
	renameAsync(path, newPath, (err)=> {
		if err && err.code === 'EXDEV'
			copyAsync(path, newPath, cb)
		else
			cb(err)
	})