/**
 * @include isFunction, promisify
 * @param {string} file
 * @param {object} [op]
 * @return {levelup}
 */
function getLevel(...args){
	const Level = require('level');
	const db = Level(...args);
	const proto = db.constructor.prototype;
	
	if(!proto.ugly){
		proto.ugly = true;
		proto._get = proto.get;
		proto.get = promisify(get);
		proto.set = proto.put;
		proto.remove = proto.del;
	}
	
	return db;
	
	function get(...args){
		const cb = args[args.length - 1];
		if(isFunction(cb)){
			args.pop();
		}
		
		this._get(...args, function(err, value){
			if (err && !/^NotFoundError/.test(err)) {
				return cb(err)
			}
			cb(null, value);
		});
	}
}