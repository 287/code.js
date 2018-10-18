/**
 * @include isArray, parseGlob
 * @param {array<string>|string} rules
 * @return {function}
 */
function createGlobTester(rules){
	rules = isArray(rules) ? rules : [rules];
	rules = rules.map((rule, i, arr)=>{
		if(!isArray(rule)){
			let match = rule.charAt(0) !== '!';
			if(!match){
				rule = rule.slice(1);
			}
			rule = parseGlob(rule);
			rule = [match, rule];
		}
		return rule;
	});
	
	return makecb(rules, test);
	
	function makecb(rules, test){
		let cb = function(path){
			return test(rules, path);
		}
		cb.rules = rules;
		return cb;
	}
	
	function test(rules, path){
		let rs = false;
		for(let i = 0; i < rules.length; i++){
			let [mark, rule] = rules[i];
			if(rule.test ? rule.test(path) : rule === path){
				let index = indexOf(rules, !mark, i + 1);
				rs = mark;
				if(index === -1){
					return mark;
				}else{
					i = index - 1;
				}
			}
		}
		return rs;
	}
	
	function indexOf(rules, mark, start){
		for(var i = start || 0; i < rules.length; i++){
			var rule = rules[i];
			if(rule[0] === mark){
				return i;
			}
		}
		return -1;
	}
}