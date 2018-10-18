/**
 * @include loadsAsync, ajaxGet, promisify, getDocTagValues, loadScripts
 * @param {array<string>} names
 * @param {object} [op]
 * @param {element} [op.parent]
 * @param {string} [op.prefix]
 * @param {string} [op.suffix]
 * @return {undefined}
 */
function loadJs(names, op){
	let ajaxGetAsync = promisify(ajaxGet);
	
	return new Promise((resolve, reject)=>{
		loadsAsync(names, {
			parseName: (name)=>{
				return name + '.js';
			},
			parseResult: (content, param, op)=>{
				let requires = getDocTagValues(content);
				if(requires.length){
					param.added = requires;
				}
				return content;
			},
			load: ajaxGetAsync,
			verbose: 1,
		})
		.then((rs)=>{
			let list = rs.nameSorted;
			console.log(list)
			loadScripts(list.map(name => name + '.js'));
			resolve(rs);
		}, reject);
		;
	});
}
	
loadJs(['isPureNumber', 'isNumber', 'isNumber', 'isNumber', 'isNumber', 'isNumber', 'isNumber'], {
	
})
.then((rs)=>{
	console.log('rs:', rs)
})
.catch(console.log)
;

// define('asdas', ['a', 'b', 'b'], {
	// asdasdsadasdsadsadsadsadsadasdasd;
// });


// modules[name] = {
	
// }