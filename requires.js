/**
 * @include ajaxGet, doneAsync, loadImage, loadScript
 * @param {array<string>} names
 * @param {object} [op]
 * @param {element} [op.parent]
 * @param {string} [op.prefix]
 * @param {string} [op.suffix]
 * @return {undefined}
 */
function requires(names, op, cb){
	if(typeof op === 'function'){
		cb = op;
		op = null;
	}
	op = Object.assign({
		parent: document.head || document.body,
		type: 'text',
		prefix: '',
		suffix: '',
		loaddings: {},
		caches: {},
		methods: {
			text: ajaxGet,
			image: loadImage,
			script: loadScript,
		},
	}, op);
	
	var tasks = [];
	
	loads(names);
	
	doneAsync(tasks, function(err, rss){
		if(err){
			cb(err);
		}else{
			rss
		}
	});
	
	function loads(names){
		names.forEach((name)=>{
			// debugger
			if(op.caches[name] !== undefined){
				//nothing
			}else if(op.loaddings[name]){
				//nothing
			}else{
				var input = name;
				var type = name.match(/^(text|image|script):/);
				if(type){
					type = type[1];
					name = name.slice(type.length + 1);
				}else{
					type = null;
				}
				// debugger

				var param = {
					input: input,
					name: name,
					type: type,
					load: loads,
				};
				
				op.loaddings[name] = true;
				
				if(op.parseName){
					name = op.parseName(name, param, op);
				}
				
				param.url = op.prefix + name + op.suffix;
				
				tasks.push((next)=> load(param.url, param, next));
			}
		});
	}
	
	function load(url, param, cb){
		op.methods[param.type || op.type](url, (err, rs)=>{
			delete op.loaddings[name];
			
			if(err){
				cb(err);
			}else{
				if(op.parseContent){
					rs = op.parseContent(rs, param, op);
				}
				op.caches[name] = rs;
				cb(err, rs);
			}
		});
	}
}