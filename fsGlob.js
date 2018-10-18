/**
 * @include isArray, getDirnames, getGlobTester, fsGetList, isDirLike
 * @return {string}
 */
function fsGlob(glob, cb){
	if(!isArray(glob)){
		glob = [glob];
	}
	let list = [];
	let paths = [];
	let dirs = [];
	glob.forEach((glob)=>{
		let path = getScanPath(glob);
		if(path != null){
			if(isDirLike(path)){
				if(dirs.some((dir)=> {
					if(path.length >= dir.length && path.slice(0, dir.length) === dir){
						return true;
					}
				})){
					return;
				}
				dirs.push(path);
			}
			paths.push(path);
		}
	});
	let tester = getGlobTester(glob);
	
	eachAsync(
		paths,
		(next, path)=> {
			if(!isDirLike(path)){
				return next(null, [path]);
			}
			fsGetList(
				path,
				{
					filter: (path)=> tester(path),
					relative: false,
					recursive: (path)=> tester(path)
				},
				next
			)
		},
		{
			limit: 10
		},
		(err, rs)=> cb(err, [].concat(...rs))
	);
	
	
	function filterPush(path){
		path.forEach(path=> tester(path) && list.push(path));
	}
	
	function getScanPath(glob){
		let paths = getDirnames(glob);
		paths.unshift(glob);
		let scanPath = null;
		if(glob.charAt(0) !== '!'){
			paths.some((path, i)=>{
				if(!/[\*\{\?\[]/.test(path)){
					scanPath = path;
					if(i === 0 && isDirLike(path)){
						scanPath = null;
					}
					return true;
				}
			});
		}
		return scanPath;
	}
}