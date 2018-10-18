//#!py
/**
 * @desc github:username/project or git+https://github.com/username/project.git or git://github.com/username/project.git
 * @include isObject isString toUnixPath childProcessExecSync
 * @param {string} url
 * @param {string} [dir]
 * @return {boolean} stdout
 */
function cloneGitProject(url, op)
	op = op || {}
	
	if /^github[\W]/.test(url)
		let protocol
		[protocol, url] = url.split(':')
		protocol = protocol.split('+')[1]
		let [user, project, branch = ''] = url.split(/#|\//)
		url = {
			user,
			project,
			branch,
			protocol,
		}
	else if isString(url)
		if /^git\+/.test(url)
			url = url.slice(4)
		let [user, project] = url.split('.git')[0].split('/').slice(-2)
		op.user = user
		op.project = project
	
	if isObject(url)
		op = Object.assign({
			host: 'github.com',
			protocol: 'https',
			user: '',
			project: '',
			branch: '',
			dir: '',
			useProjectDir: false,
		}, url, op)
		
		if op.protocol === 'ssh'
			url = `git@${op.host}:${op.user}/${op.project}.git`
		else
			url = `${op.protocol || 'https'}://${op.host}/${op.user}/${op.project}.git`
	
	let dir = toUnixPath(op.dir || '', 1) + (op.useProjectDir ? op.user + '/' + op.project : '')
	op.path = dir
	
	const cmd = `git clone ${url} ${dir}`
	// return console.log(cmd, op)
	let rs = childProcessExecSync(cmd, {catch: true})
	
	if isError(rs)
		let msg = rs + ''
		if msg.includes('already exists and is not an empty directory.')
			rs = op
	else
		rs = op
		
	return rs