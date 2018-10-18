/**
 * @require fs
 * @param {string} path
 * @return {buffer}
 */
function fsGetSync(path){
	var rs = null;
	try{
		rs = fs.readFileSync(path).toString();
	}catch(err){}
	return rs;
}