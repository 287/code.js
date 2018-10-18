/**
 * @include promisify
 * @param {string} file
 * @param {object} [op]
 * @return {sqlite}
 */
function getSqlite(...args){
	var sqlite3 = require('sqlite3');
	var db = new sqlite3.Database(...args);
	
	var proto = db.constructor.prototype;
	if(!proto.ugly){
		proto.ugly = true;
		proto.query = promisify(proto.all);
		proto.run = promisify(proto.run);
		proto.exec = promisify(proto.exec);
	}
	
	return db;
}