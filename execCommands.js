/**
 * @param {string} cmd
 * @param {object} [op]
 * @param {boolean} [op.catch = false]
 * @return {string} stdout
 */
function execCommands(cmds)


function childProcessExecSync(cmd, op){
	const exec = require('child_process').execSync;
	op = op || {};
	let stdout;
	if(op.catch){
		try{
			stdout = exec(cmd, op).toString();
		}catch(err){
			stdout = err;
		}
	}else{
		stdout = exec(cmd, op).toString();
	}
	return stdout;
}