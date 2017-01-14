function globTest(globs, path){
	/**
		usage:
			*          => word without /
			**         => word with /
			!          => not match
			?          => one char or not
			[abc]      => match character list: a or b or c
			{hi,hello} => match word list: hi or hello
			
		eg:
			/page/view/1       just match /page/view/1
			!/page/view/1       not match /page/view/1
			/page/view/*            match /page/view/1 or /page/view/2
			/page/view/**           match /page/view/1 or /page/view/1/2
			/page/view/1?           match /page/view/12 or /page/view/13
			/page/view/[12]    just match /page/view/1 or /page/view/2
			/page/view/{12,34} just match /page/view/12 or /page/view/34
	 */
	var globs = Object.prototype.toString.call(globs) === '[object Array]' ? globs : [globs]
	, regxs = {
		exclude: []
		, match: []
	}
	, rs = false
	, glob
	, regx
	, type
	, i
	;
	
	//* parse match to regx
	for(i = 0; i < globs.length; i++){
		glob = globs[i];
		if(typeof glob === 'string'){
			type = glob.charAt(0) === '!' ? 'exclude' : 'match';
			
			if(type === 'exclude'){
				glob = glob.substr(1);
			}
			
			if(/\*|\?|\[|\{/.test(glob)){
				glob = glob.replace(/(\*\*|\*|\?|\{[^\}]*\}|\[[^\]]*\])/g, function(key){
					var m = 0
					;
					switch (key){
						case '?':
							m = '.';
						break; case '*':
							m = '{`0}';
						break; case '**':
							m = '{`1}';
						break; default:
							switch (key[0]){
								case '{':
									key = key.substr(1, key.length - 2);
									m = '(' + key.replace(/,/g, '|') + ')';
								break; case '[':
									m = key;
							}
					}
					return m;
				})
				.replace(/\{`(\d+)\}/g, function revertGlobKey(t, key){
					return ['[^\\/]*', '.*'][key];
				});
				
				glob = '^' + glob + '$';
				glob = new RegExp(glob);
			}

			regxs[type].push(glob);
		}
	}

	//* check path with regx
	globs = regxs.exclude;
	if(globs.length){
		rs = true;
		for(i = 0; i < globs.length; i++){
			if(ruleTest(globs[i], path)){
				rs = false;
				break;
			}
		}
	}

	if((globs.length && rs) || globs.length === 0){
		globs = regxs.match;
		if(globs.length){
			rs = false;
			for(i = 0; i < globs.length; i++){
				if(ruleTest(globs[i], path)){
					rs = true;
					break;
				}
			}
		}
	}
	
	return rs;
	
	
	function ruleTest(regx, str){
		return typeof regx === 'string' ? regx === str : regx.test(str);
	}
}