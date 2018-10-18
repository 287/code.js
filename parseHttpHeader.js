/**
 * @include 
 * @param {string} string - http header row string
 * @return {object}
 */
function parseHttpHeader(string){
	let lf = '\r\n';
	let index = string.indexOf(lf);
	let head = string.slice(0, index).split(' ');
	string = string.slice(index + lf.length);
	
	let httpheader = {};
	httpheader.method = head[0];
	httpheader.url = head[1];
	httpheader.protocol = head[2];
	
	Object.assign(httpheader, string2object(string, [': ', lf]));
	return httpheader;
}