/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
  if (num.length === k) return "0";

  const stack = [parseInt(num[0])];
  
  let kk = 0;
  for (let i = 1; i < num.length; i++) {
    const d = parseInt(num[i])
    while (kk < k && stack.length > 0 && d < stack[stack.length - 1]) {
      stack.pop();
      kk++;
    }
    
    if (d > 0 || stack.length > 0) {
      stack.push(d);
    }
  }
  
  while (kk < k && stack.length > 0) {
    stack.pop();
    kk++;
  }
  
  if (stack.length === 0) {
    stack.push(0);
  }
  
  return stack.join('');
};