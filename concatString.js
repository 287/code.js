function concatString(msgs, sep){
	return msgs.filter(msg=> msg != null).join(sep);
}