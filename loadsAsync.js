/**
 * @include allAsync, sortByDeps
 * @param {array<string>} names
 * @param {object} op
 * @param {function} op.load
 * @param {function} [op.parseName]
 * @param {function} [op.parseName]
 * @param {object} [op.pendings]
 * @param {boolean} [op.verbose = false]
 * @return {promise}
 */
function loadsAsync(names, op){
	op = Object.assign({
		pendings: {},
		results: {},
		add: add,
		verbose: false,
	}, op);
	
	var results = op.results;
	var pendings = op.pendings;
	var promises = [];
	var deps = {};
	var allNames = names.slice(0);
	
	add(names);
	
	return new Promise((resolve, reject)=>{
		allAsync(promises)
		.then((rs)=>{
			if(!op.verbose){
				rs = names.map((name)=> results[name]);
			}else{
				let nameSorted = sortByDeps(names, deps);
				rs = {
					names,
					allNames,
					deps,
					nameSorted,
					results,
				};
			}
			resolve(rs);
		}, reject);
	});
	
	function add(names){
		names.forEach((name)=>{
			let promise;
			allNames.push(name);
			
			if(results[name]){
				promise = Promise.resolve(results[name]);
			}else if(pendings[name]){
				promise = Promise.resolve();
			}else{
				pendings[name] = true;
				promise = new Promise((resolve, reject)=>{
					let nameParsed = name;
					if(op.parseName){
						nameParsed = op.parseName(nameParsed);
					}
					var promise = op.load(nameParsed);
					
					promise.then((rs)=>{
						delete pendings[name];
						
						if(op.parseResult){
							let param = {
								nameParsed,
								name,
								names,
								allNames,
								added: [],
							};
							rs = op.parseResult(rs, param, op);
							if(param.added && param.added.length){
								deps[name] = param.added;
								add(param.added);
							}
						}
						results[name] = rs;
						resolve();
					}, reject);
				});
			}
			
			promises.push(promise);
		});
	}
}