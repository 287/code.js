/**
 * @include loads, ajaxGet, getDocTagValues, loadScripts
 * @param {array<string>} names
 * @param {object} [op]
 * @param {element} [op.parent]
 * @param {string} [op.prefix]
 * @param {string} [op.suffix]
 * @return {undefined}
 */
function loadJs(names, op, cb){
	loads(
		names,
		{
			loadContent: ajaxGet,
			parseName: (name)=>{
				return name + '.js';
			},
			parseContent: (content, param, op)=>{
				let requires = getDocTagValues(content);
				if(requires.length){
					param.added.push(...requires);
				}
				return content;
			},
			verbose: 1,
		},
		(err, rs)=>{
			if(!err){
				let list = rs.sortedNames;
				console.log(list)
				loadScripts(list.map(name => name + '.js'));
			}
			cb(err, rs);
		}
	);
}