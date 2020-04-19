export default ({ getState }) => {
  return (next) => (action) => {
    if (typeof action !== 'function') {
      console.groupCollapsed('Logger');
      console.log('%c Action:', 'color: skyblue', action);
      console.log('%c Previous State:', 'color: red', getState());
  
      const returnValue = next(action);
  
      console.log('%c Current State:', 'color: green', getState());
      console.groupEnd();
  
      return returnValue
    }

    return next(action);
  }
}
