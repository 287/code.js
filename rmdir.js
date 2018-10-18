//#!py
/**
 * rmdir
 * @require fs
 * @include emptyDir
 * @param {string} dir
 * @return {undefined}
 */
function rmdir(dir)
	emptyDir(dir)
	return fs.rmdirSync(dir)