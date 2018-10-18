/**
 * @include isArray, loadScript, promisify
 * @param {array<string>|string} srcs
 * @return {promise}
 */
function loadScripts(srcs, op){
	srcs = isArray(srcs) ? srcs : [srcs];
	let loadScriptAsync = promisify(loadScript);
	return Promise.all(srcs.map(src => loadScriptAsync(src)));
}