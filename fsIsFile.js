/**
 * @require fs
 * @param {string} path
 * @return {undefined}
 */
function fsIsFile(path, cb){
	fs.stat(path, (err, rs)=>{
		if(err){
			cb(err, false);
		}else{
			cb(null, rs.isFile());
		}
	});
}