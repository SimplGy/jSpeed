//Things in 'utils.js' should:
//	* not run unless they're called
//	* be minor in terms of performance impact and code length (otherwise they should be their own file)


//Set up a way to call objects while preserving context.
// 	(from Prototype.js) 
if (!Function.prototype.bind) { // check if native implementation available
	Function.prototype.bind = function(){ 
		var fn = this,
			args = Array.prototype.slice.call(arguments),
			object = args.shift();
		return function(){
			return fn.apply(
				object,
				args.concat(Array.prototype.slice.call(arguments))
				);//apply 
		};//return
	};//function
}//if
