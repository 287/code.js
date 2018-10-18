/**
 * @include childProcessExecSync, splitOnce
 * @param {string} cmd
 * @param {object} [op]
 * @return {number} (byte)
 */
function getProcessMemory(pid){
	let stdout = childProcessExecSync(`tasklist /FO csv /NH /FI "PID eq ${pid}"`);
	stdout = splitOnce(stdout, '","', undefined, 'rl');
	stdout = stdout[1];
	let bytes = stdout ? parseInt(stdout.replace(/,/g, '')) * 1024 : -1;
	return bytes;
}