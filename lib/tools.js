module.exports = {
  // This accepts rest parameter for an arbitrary amount of arguments
  log: (...msg) => {
    let debug = true;
    const STACK_FUNC_NAME = new RegExp(/\w+\.\w+:(\d+)/);
    let err = new Error();
    
    Error.captureStackTrace(err);
  
    let stacks = err.stack.split('\n').slice(1);
    // console.log(err.stack);
  
    // In Error trace, caller information is in the second array.
    let callerInfo = STACK_FUNC_NAME.exec(stacks[1]);
    if(debug) {
      console.log(`${callerInfo[0]}`.padEnd(20) + `${msg}`);
    }
  },
};