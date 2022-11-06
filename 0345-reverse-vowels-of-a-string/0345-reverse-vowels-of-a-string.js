/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
  const vowelsStack = [];
  const res = s.split('');
  
  res.forEach((c, i) => {
    if (VOWELS.has(c.toLowerCase())) {
      vowelsStack.push(c);
      res[i] = '';
    }
  })
  
  res.forEach((c, i) => {
    if (c === '') {
      res[i] = vowelsStack.pop();
    }
  })
  
  return res.join('');
};