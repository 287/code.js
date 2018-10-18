function dirname(path){
	if(['/', '\\'].indexOf(path.slice(-1)) !== -1){
		path = path.slice(0, -1);
	}
	var name = path.match(/([^\\\/]+)$/);
	name = !name ? '' : path.slice(0, -name[1].length);
	return name;
}