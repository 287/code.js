function spawnRun(argv, op){
	op = op || {};
	op.stdio = op.stdio || 'inherit';
	let child = require('child_process').spawn(argv[0], argv.slice(1), op);
	child.on('exit', (code, signal)=>{
		process.on('exit', ()=>{
			if(signal){
				process.kill(process.pid, signal);
			}else{
				process.exit(code);
			}
		});
	});
	return child;
};