/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumMinProduct = function(nums) {
  let stack = [];
  const left = Array(nums.length).fill(0);
  const right = Array(nums.length).fill(0);
  const prefixSum = Array(nums.length + 1).fill(0);
  
  nums.forEach((num, i) => {
    while (stack.length > 0 && num <= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    
    if (stack.length > 0) {
      left[i] = stack[stack.length - 1] + 1;
    } else {
      left[i] = 0;
    }
    
    stack.push(i);
    
    prefixSum[i + 1] = prefixSum[i] + num;
  });
  
  stack = [];
  
  for (let i = nums.length - 1; i >= 0; i--) {
    const num = nums[i];

    while (stack.length > 0 && num <= nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    
    if (stack.length > 0) {
      right[i] = stack[stack.length - 1] - 1;
    } else {
      right[i] = nums.length - 1;
    }
    
    stack.push(i);
  }
  
  let res = 0;
  nums.forEach((num, i) => {
    const sum = prefixSum[right[i] + 1] - prefixSum[left[i]]
    const curr = BigInt(num) * BigInt(sum);
    res = curr > res ? curr : res;
  });
  
  return BigInt(res) % BigInt(10 ** 9 + 7);
};