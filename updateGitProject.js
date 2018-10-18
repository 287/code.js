//#!py
/**
 * @desc github:username/project or git+https://github.com/username/project.git or git://github.com/username/project.git
 * @include isObject isString toUnixPath childProcessExecSync
 * @param {string} url
 * @param {string} [dir]
 * @return {boolean} stdout
 */
function updateGitProject(dir, branch)
	let `git pull`
		git reset --hard
		git clean -fd
		git checkout master
		git reset --hard
		git clean -fd
		git fetch
	let rs = childProcessExecSync(cmd, {
		cwd: dir,
		catch: true,
	})
	
	
	
	if isError(rs)
		let msg = rs + ''
		if msg.includes('already exists and is not an empty directory.')
			rs = op
	else
		rs = op
		
	return rs