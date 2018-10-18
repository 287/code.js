function parseLink(string, regexp, tpl){
	regexp = regexp || /https?:\/\/[a-zA-Z0-9_-]/g;
	tpl = tpl ||  '<a href="{url}">{url}</a>';
	return string.replace(regexp, tpl.replace(/\{url\}/g));
}