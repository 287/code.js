/**
 * @param {string} text
 * @param {string} key - 'b i red :blue'
 */
function addLogStyle(text, key){
	key = key == null ? '' : key;
	var ANSIStyles = {
		reset: 0,
		bold: 1,
		dim: 2,
		italic: 3,
		under: 4,
		reverse: 7,
		hidden: 8,
		through: 9,
		black: 30,
		red: 31,
		green: 32,
		yellow: 33,
		blue: 34,
		magenta: 35,
		cyan: 36,
		white: 37,
		grey: 90,
	};
	var keymap = {
		b: 'bold',
		i: 'italic',
		u: 'under',
		r: 'reverse',
		0: 'reset',
	};
	
	key.split(' ').forEach(function(key){
		if(['', ','].indexOf(key) === -1){
			key = keymap[key] || key;
			text = parseStyle(text, key);
		}
	});
	
	return text;

	function parseStyle(text, key){
		var code, bgMode;
		if(key.indexOf(':') > -1){
			key = key.split(':');
			if(key[0] !== 'fg') bgMode = 1;
			key = key[1];
		}
		if(key in ANSIStyles){
			code = ANSIStyles[key];
			if(bgMode) code += 10;
			text = '\u001b[' + code + 'm' + text + '\u001b[' + getCloseCode(code) + 'm';
		}
		return text;
	}

	function getCloseCode(code){
		return 0;
		if(code === 0){
			return 0;
		}else if(code < 3){
			return 22;
		}else if(code < 30){
			return code + 20;
		}else if(code < 38 || code === 90){
			return 39;
		}else if(code < 48){
			return 49;
		}
		return 0;
	}
}