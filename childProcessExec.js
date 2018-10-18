/**
 * @param {string} cmd
 * @param {object} [op]
 * @param {function} cb
 * @return {childprocess} cb
 */
function childProcessExec(cmd, op, cb){
	const exec = require('child_process').exec;
	return exec(cmd, op, cb);
}