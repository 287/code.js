function basename(path, ext){
	if(['/', '\\'].indexOf(path.slice(-1)) !== -1){
		path = path.slice(0, -1);
	}
	var name = path.match(/([^\\\/]+)$/);
	name = !name ? '' : name[1];
	return ext && name ? name.substr(-ext.length) === ext ? name.slice(0, -ext.length) : name : name;
}