/**
 * @include isNonemptyString
 * @param {string} nameWithAlias
 * @param {string} [sep = ':']
 * @return {array<string>}
 */
function splitNameByAlias(nameWithAlias, sep = ':'){
	let [name, alias] = nameWithAlias.split(sep);
	if(!isNonemptyString(alias)){
		alias = name;
	}
	return [name, alias];
}