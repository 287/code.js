/**
 * @include splitNameByAlias
 * @param {array<string>} namesWithAlias
 * @param {string} [sep = ':']
 * @return {array<array<string>>}
 */
function splitNamesByAlias(namesWithAlias, sep){
	const names = [];
	const aliass = [];
	namesWithAlias.forEach((nameWithAlias)=>{
		const [name, alias] = splitNameByAlias(nameWithAlias, sep);
		names.push(name);
		aliass.push(alias);
	});
	return [names, aliass];
}