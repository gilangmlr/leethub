/**
 * @param {string[]} words
 * @return {number}
 */
var longestPalindrome = function(words) {
  let len = 0;
  let map = {};
  words.forEach(word => {
    if (word in map) {
      map[word]++;
    } else {
      map[word] = 1;
    }
  });

  let centerFound = false;
  Object.entries(map).forEach(([word, freq]) => {
    if (word[0] === word[1]) {
      if (freq % 2 === 0) {
        len += freq * 2;
      } else {
        len += (freq - 1) * 2
        if (!centerFound) {
          len += 2;
        }
        centerFound = true;
      }
    } else {
      const reversed = word[1] + word[0];
      if (reversed in map) {
        len += Math.min(freq, map[reversed]) * 2;
      }
    }
  })

  return len;
};