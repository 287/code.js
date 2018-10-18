/**
 * @include toUnixPath
 * @return {string}
 */
function getCwd(){
	return toUnixPath(process.cwd(), 1);
}