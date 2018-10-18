/**
 * @include toUnixPath
 * @require path:fsPath
 * @param {object} conf
 * @param {string} [conf.root = './']
 * @param {number} [conf.port = 80]
 * @param {array<string>} [conf.index = ['index.html', 'index']]
 */
function parseWebServerConfig(conf){
	conf = Object.assign({
		domain: 'localhost',
		root: 'pack',
		port: 80,
		index: ['index.html', 'index'],
	}, conf);
	
	conf.root = toUnixPath(fsPath.resolve(conf.root), 1);
	
	return conf;
}

console.log(parseWebServerConfig())