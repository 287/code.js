/**
 * @param {string} string
 * @param {number} [len = 0]
 * @param {boolean} [justBody = false] - match \n or ^|\n
 */
function addTabs(string, len, justBody){
	if(len){
		var prefixTabs = '\t'.repeat(len);
		string = string.replace(/\n/g, function(m){
			return m + prefixTabs;
		});
		string = justBody ? string : prefixTabs + string;
	}
	return string;
}