var fs = require('fs')
, fs = require('glob')
, methodPath = process.mainModule.filename.replace(/\.test(\.js)$/, '$1')
, methodStr
, globTest
;
eval(fs.readFileSync(methodPath).toString());

function logRun(){
	var args = [].slice.call(arguments, 0)
	, rs = glob.apply(null, args)
	;
	args.unshift(rs);
	
	console.log.apply(console, args);
}


logRun('/page/view/1', '/page/view/1');
logRun(['/page/view/*', '!/page/view/1'], '/page/view/1');
logRun('/page/view/**', '/page/view/1');
logRun('/page/*', '/page/view/1');
logRun('/page/**', '/page/view/1');
logRun('/page/*/*', '/page/view/1');
logRun('/page/*/{1,2}', '/page/view/1');
logRun('/page/*/{1,2}', '/page/view/3');



