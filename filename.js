/**
 * @include basename, extname
 */
function filename(name){
	var name = name.match(/([^\\\/]+)$/);
	name = !name ? '' : name[1];
	return ext && name ? name.substr(-ext.length) === ext ? name.slice(0, -ext.length) : name : name;
}