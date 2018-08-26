/* tslint:disable */
export function throttle(func: any, wait: any, options: any = {}): any {
  let timeout: any, context: any, args: any, result: any;
  let previous = 0;
  if (!options) {
    options = {};
  }

  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = Date.now();
    if (!previous && !options.leading) previous = now;
    console.log(`***DEBUG*** wait, now, previous :`, wait, now, previous);
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };


  (throttled as any).cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
/* tslint:enable */
