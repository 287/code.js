/**
 * @include childProcessExecSync
 * @param {string} cmd
 * @param {object} [op]
 * @return {number} (byte)
 */
function killProcessSync(pid){
	var rs = true;
	try{
		childProcessExecSync(`taskkill /F /PID ${pid}`);
	}catch(e){
		rs = false;
	}
	return rs;
}