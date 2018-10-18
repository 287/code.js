/**
 * diff from Promise.all ? promises can add more before fulfilled or rejected;
 * @param {array<promise>} promises
 * @return {<promise>}
 */
function allAsync(promises) {
	return new Promise(function(resolve, reject) {
		if (promises.length === 0) return resolve([]);
		var count = 0;
		var index = 0;
		var rs = [];
		
		for (var i = 0; i < promises.length; i++) {
			bind(i, promises[i]);
		}
		
		function bind(i, promise) {
			index = Math.max(i, index);
			try{
				promise.then(function(value){
					rs[i] = value;
					
					if (++count >= promises.length) {
						resolve(rs);
					}else if(index < promises.length - 1){
						bind(++index, promises[index]);
					}
				}, reject);
			}catch(err){
				reject(err);
			}
		}
	});
}