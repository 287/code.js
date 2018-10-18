/**
 * copyFile
 * @include pipeAsync, fsMkdirname
 * @require fs
 * @param {string} path - file path
 * @param {string} newPath - file path to set
 * @param {function} cb({error} err=null, {boolean} rs)
 */
function fsCopyFile(path, newPath, cb){
	let readStream, writeStream;
	pipeAsync(
		(next)=> fsMkdirname(newPath, next),
		(next)=> {
			readStream = fs.createReadStream(path);
			readStream.on('error', next);
			readStream.on('readable', next);
		},
		(next)=> {
			writeStream = fs.createWriteStream(newPath);
			writeStream.on('error', next);
			writeStream.on('close', next);
			writeStream.on('open', ()=> readStream.pipe(writeStream));
		},
		cb
	);
}