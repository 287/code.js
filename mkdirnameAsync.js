/**
 * mkdirname deep sync
 * @include getDirname mkdirAsync
 * @param {string} path
 * @param {function} cb
 * @return {undefined}
 */
function mkdirnameAsync(path, cb){
	mkdirAsync(getDirname(path), cb);
}