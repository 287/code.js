/**
 * @return {string}
 */
function randomKey(){
	return new Date().getTime().toString(35) + 'z' + Math.round(Math.random() * 10000).toString(35);
}