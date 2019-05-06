//#!py
function generateSocketFilePath(name)
	const isWin = process.platform.includes('win')
	return !isWin ? `/var/run/${name}.sock` : `\\\\?\\pipe\\${name}.sock`