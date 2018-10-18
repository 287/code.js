/**
 * @require fs
 * @param {string} path
 * @return {object}
 */
function fsGetJsonSync(path){
	var rs = null;
	try{
		rs = fs.readFileSync(path).toString();
		rs = rs === '' ? null : JSON.parse(rs);
	}catch(err){}
	return rs;
}