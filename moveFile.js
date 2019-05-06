//#!py
/**
 * @include rename copyFile
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb
 */
function moveFile(path, newPath)
	try
		rename(path, newPath)
	catch err
		if err && err.code === 'EXDEV'
			copyFile(path, newPath)
		else
			throw err