/**
 * @param {string} cmd
 * @param {object} [op]
 * @return {string} stdout
 */
splitOnce
function getProcessInfo(pid){
	let stdout = childProcessExecSync(`tasklist /FO csv /NH /FI "PID eq ${pid}"`);
	stdout = stdout
	return stdout;
}