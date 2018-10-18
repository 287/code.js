/**
 * 获取webgl的扩展对象
 * @param {string} name
 * @return {object|null}
 */
function getWebglExtension(name){
	const prefixs = ['WEBKIT_', 'GL_'];
	const gl = document.createElement('canvas').getContext('webgl');
	let rs = gl.getExtension(name);
	if(!rs && name){
		let prefix = name.split('_')[0] + '_';
		if(prefixs.indexOf(prefix) !== -1){
			rs = gl.getExtension(name.slice(prefix.length));
		}
	}
	return rs;
}