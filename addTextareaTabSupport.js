function addTextareaTabSupport(textarea){

	var tabStr = '\t';
	
	textarea.onkeydown = function(e){
		var keyCode = e.keyCode;
		var caretPosition, text;
	
		//support tab on textarea
		switch(keyCode){ //tab was pressed
			case 9:
				text = textarea.value;
				caretPosition = getCaretPosition(textarea);
				
				textarea.value = text.substring(0, caretPosition) + tabStr + text.substring(caretPosition, text.length);
				setCaretPosition(textarea, caretPosition + tabStr.length);
				return false;
			break; case 9:
		}
	}

	function getCaretPosition(textarea){
		return textarea.selectionStart;
	}

	function setCaretPosition(textarea, position){
		textarea.selectionStart = position;
		textarea.selectionEnd = position;
		textarea.focus();
	}

	function hasSelection(textarea){
		return textarea.selectionStart !== textarea.selectionEnd;
	}

	function getSelectedText(textarea){
		return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
	}

	function setSelection(textarea, start, end){
		textarea.selectionStart = start;
		textarea.selectionEnd = end;
		textarea.focus();
	}
}