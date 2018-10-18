//#!py
function tryCatch(fn, args, context)
	try
		fn.call(context, ...args)
	catch e
		-