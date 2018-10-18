/**
 * @include md5
 */
function hashPassword(pass){
	pass = md5(pass);
	let list = [pass];
	for(let i = 1, l = pass.length; i < l; i++){
		list.push(pass.slice(i) + pass.slice(0, i));
	}
	pass = list.join('');
	return md5(pass);
}