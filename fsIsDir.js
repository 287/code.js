/**
 * @require fs
 * @param {string} path
 * @return {undefined}
 */
function fsIsDir(path, cb){
	fs.stat(path, (err, rs)=>{
		if(!err){
			rs = rs.isDirectory();
		}
		cb(err, rs);
	});
}